import { 
  Provider, 
  Plan, 
  Selection, 
  CostBreakdown, 
  CostBreakdownItem,
  OverageRule,
  TieredPricing
} from '@/types/infrastructure';
import { getProviderById } from '@/lib/data/providers';

export class CostCalculationEngine {
  // 计算月度成本
  calculateMonthlyCost(selections: Selection[]): CostBreakdown {
    const breakdown: CostBreakdownItem[] = [];
    let totalMonthly = 0;
    let setupCosts = 0;

    selections.forEach(selection => {
      const provider = getProviderById(selection.providerId);
      if (!provider) return;

      const plan = provider.plans.find(p => p.id === selection.planId);
      if (!plan) return;

      // 基础费用
      let itemCost = plan.billing.basePrice;

      // 计算超额费用
      plan.overageRules.forEach(rule => {
        const usage = selection.variables[rule.metric] || 0;
        const included = plan.includedResources.find(r => r.metric === rule.metric)?.amount || 0;

        if (usage > included) {
          const overage = usage - included;
          itemCost += this.calculateOverageCost(overage, rule);
        }
      });

      breakdown.push({
        providerId: selection.providerId,
        planId: selection.planId,
        baseCost: plan.billing.basePrice,
        usageCost: itemCost - plan.billing.basePrice,
        totalCost: itemCost,
        percentage: 0, // 后续计算
        details: {
          provider: provider.displayName,
          plan: plan.displayName || plan.name,
          variables: selection.variables
        }
      });

      totalMonthly += itemCost;
    });

    // 计算百分比
    breakdown.forEach(item => {
      item.percentage = totalMonthly > 0 ? (item.totalCost / totalMonthly) * 100 : 0;
    });

    return {
      monthly: totalMonthly,
      annual: totalMonthly * 12,
      setupCosts,
      potentialSavings: this.calculateAnnualSavings(totalMonthly),
      breakdown,
      warnings: this.generateWarnings(selections, breakdown)
    };
  }

  // 计算超额费用
  private calculateOverageCost(usage: number, rule: OverageRule): number {
    if (rule.tieredPricing && rule.tieredPricing.length > 0) {
      // 阶梯定价
      let cost = 0;
      let remaining = usage;

      rule.tieredPricing.forEach(tier => {
        const tierUsage = Math.min(remaining, (tier.to || Infinity) - tier.from);
        if (tierUsage > 0) {
          cost += tierUsage * tier.pricePerUnit;
          remaining -= tierUsage;
        }
      });

      return cost;
    } else {
      // 固定单价
      return usage * rule.pricePerUnit;
    }
  }

  // 计算年付潜在节省
  private calculateAnnualSavings(monthlyTotal: number): number {
    // 假设年付有10%的折扣
    const annualTotal = monthlyTotal * 12;
    return annualTotal * 0.1;
  }

  // 生成警告信息
  private generateWarnings(selections: Selection[], breakdown: CostBreakdownItem[]): string[] {
    const warnings: string[] = [];

    // 检查每个选择的使用量
    selections.forEach(selection => {
      const provider = getProviderById(selection.providerId);
      if (!provider) return;

      const plan = provider.plans.find(p => p.id === selection.planId);
      if (!plan) return;

      // 检查是否接近限制
      plan.includedResources.forEach(resource => {
        const usage = selection.variables[resource.metric] || 0;
        const usagePercentage = (usage / resource.amount) * 100;

        if (usagePercentage >= 80 && usagePercentage < 100) {
          warnings.push(
            `${provider.displayName} ${resource.metric} 使用率接近限制 (${usagePercentage.toFixed(0)}%)`
          );
        } else if (usagePercentage >= 100) {
          warnings.push(
            `${provider.displayName} ${resource.metric} 已超出限制，将产生额外费用`
          );
        }
      });
    });

    return warnings;
  }

  // 预测扩展成本
  predictScalingCost(
    currentSelections: Selection[], 
    growthRate: number, 
    months: number = 6
  ): Array<{ month: number; cost: number }> {
    const predictions: Array<{ month: number; cost: number }> = [];
    
    for (let month = 0; month <= months; month++) {
      const scaledSelections = currentSelections.map(selection => {
        const scaleFactor = Math.pow(1 + growthRate, month);
        const scaledVariables: Record<string, number> = {};
        
        Object.entries(selection.variables).forEach(([key, value]) => {
          scaledVariables[key] = Math.round(value * scaleFactor);
        });
        
        return {
          ...selection,
          variables: scaledVariables
        };
      });
      
      const cost = this.calculateMonthlyCost(scaledSelections);
      predictions.push({
        month,
        cost: cost.monthly
      });
    }
    
    return predictions;
  }

  // 验证预算
  validateBudget(selections: Selection[], budget: number): {
    isWithinBudget: boolean;
    percentage: number;
    remaining: number;
    recommendations?: string[];
  } {
    const cost = this.calculateMonthlyCost(selections);
    const percentage = budget > 0 ? (cost.monthly / budget) * 100 : 0;
    const remaining = budget - cost.monthly;
    
    const result: {
      isWithinBudget: boolean;
      percentage: number;
      remaining: number;
      recommendations?: string[];
    } = {
      isWithinBudget: cost.monthly <= budget,
      percentage,
      remaining,
      recommendations: undefined
    };
    
    if (!result.isWithinBudget) {
      // 添加推荐建议
      result.recommendations = [
        '考虑选择更低的计划等级',
        '优化资源使用量',
        '寻找有免费层的替代服务'
      ];
    }
    
    return result;
  }
}

// 导出单例
export const costCalculator = new CostCalculationEngine();