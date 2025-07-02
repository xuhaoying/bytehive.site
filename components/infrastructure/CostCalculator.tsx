"use client";

import { useState, useEffect } from 'react';
import { Selection, ProjectTemplate } from '@/types/infrastructure';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Check, AlertCircle, X, Settings, TrendingUp, Download, Share2 } from 'lucide-react';
import { costCalculator } from '@/lib/cost-calculator';
import { getProviderById } from '@/lib/data/providers';
import { loadAllTemplates } from '@/lib/data/templates';

interface CostCalculatorProps {
  selections: Selection[];
  onUpdateSelections: (selections: Selection[]) => void;
  className?: string;
}

export function CostCalculator({ selections, onUpdateSelections, className }: CostCalculatorProps) {
  const [budget, setBudget] = useState<number>(200);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  
  // 加载项目模板
  useEffect(() => {
    const loadedTemplates = loadAllTemplates();
    setTemplates(loadedTemplates);
  }, []);
  
  // 计算成本
  const costBreakdown = costCalculator.calculateMonthlyCost(selections);
  const budgetValidation = costCalculator.validateBudget(selections, budget);
  
  // 处理模板选择
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      // TODO: 根据模板自动添加推荐的服务
      console.log('Selected template:', template);
    }
  };
  
  // 移除服务
  const removeSelection = (index: number) => {
    const newSelections = selections.filter((_, i) => i !== index);
    onUpdateSelections(newSelections);
  };
  
  // 更新服务配置
  const updateSelectionVariable = (index: number, variable: string, value: number) => {
    const newSelections = [...selections];
    newSelections[index] = {
      ...newSelections[index],
      variables: {
        ...newSelections[index].variables,
        [variable]: value
      }
    };
    
    // 重新计算成本
    const provider = getProviderById(newSelections[index].providerId);
    const plan = provider?.plans.find(p => p.id === newSelections[index].planId);
    if (provider && plan) {
      const singleSelection = [newSelections[index]];
      const cost = costCalculator.calculateMonthlyCost(singleSelection);
      newSelections[index].calculatedCost = cost.monthly;
    }
    
    onUpdateSelections(newSelections);
  };
  
  return (
    <Card className={cn("h-fit", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          成本估算器
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 预算设置 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <Label>预算上限</Label>
            <span className={cn(
              "font-medium",
              !budgetValidation.isWithinBudget && "text-destructive"
            )}>
              ${budget}/月
            </span>
          </div>
          <Input
            type="number"
            placeholder="设置月度预算上限"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value) || 0)}
          />
        </div>

        {/* 项目模板 */}
        <div className="space-y-2">
          <Label>项目模板</Label>
          <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
            <SelectTrigger>
              <SelectValue placeholder="选择项目类型..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">不使用模板</SelectItem>
              {templates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.icon} {template.name} (~${template.costEstimate.monthly.typical}/月)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 已选服务 */}
        <div>
          <h4 className="font-medium mb-2">已选服务 ({selections.length})</h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {selections.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                暂未选择任何服务
              </p>
            ) : (
              selections.map((selection, index) => {
                const provider = getProviderById(selection.providerId);
                const plan = provider?.plans.find(p => p.id === selection.planId);
                if (!provider || !plan) return null;
                
                return (
                  <Card key={index} className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {provider.displayName} - {plan.displayName || plan.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {plan.includedResources.map(r => `${r.amount} ${r.unit} ${r.description}`).join(', ')}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ${selection.calculatedCost?.toFixed(2) || plan.billing.basePrice.toFixed(2)}
                      </div>
                    </div>
                    
                    {/* 变量配置 */}
                    {plan.calculatorConfig.variables.length > 0 && (
                      <div className="space-y-2 mt-3 pt-3 border-t">
                        {plan.calculatorConfig.variables.map(variable => (
                          <div key={variable.name} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <Label className="text-xs">{variable.label}</Label>
                              <span className="text-muted-foreground">
                                {selection.variables[variable.name] || variable.default} {variable.unit}
                              </span>
                            </div>
                            {variable.type === 'slider' && (
                              <Slider
                                min={variable.min}
                                max={variable.max}
                                step={1}
                                value={[selection.variables[variable.name] || variable.default as number]}
                                onValueChange={([value]) => updateSelectionVariable(index, variable.name, value)}
                                className="w-full"
                              />
                            )}
                            {variable.type === 'number' && (
                              <Input
                                type="number"
                                min={variable.min}
                                max={variable.max}
                                value={selection.variables[variable.name] || variable.default}
                                onChange={(e) => updateSelectionVariable(index, variable.name, Number(e.target.value))}
                                className="h-7 text-xs"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Settings className="h-3 w-3 mr-1" />
                        高级配置
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-destructive"
                        onClick={() => removeSelection(index)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        移除
                      </Button>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* 成本汇总 */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>月度总计</span>
            <span className="font-semibold">${costBreakdown.monthly.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>年度总计</span>
            <span className="font-semibold text-green-600">
              ${(costBreakdown.annual - costBreakdown.potentialSavings).toFixed(2)}
            </span>
          </div>
          
          {/* 预算进度 */}
          <div className="space-y-2 pt-2">
            <Progress 
              value={budgetValidation.percentage} 
              className={cn(
                "h-2",
                budgetValidation.percentage > 100 && "[&>div]:bg-destructive"
              )}
            />
            <div className="text-xs">
              {budgetValidation.isWithinBudget ? (
                <span className="text-green-600 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  在预算范围内 (使用 {budgetValidation.percentage.toFixed(0)}%)
                </span>
              ) : (
                <span className="text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  超出预算 ${Math.abs(budgetValidation.remaining).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* 优化建议 */}
          {costBreakdown.warnings && costBreakdown.warnings.length > 0 && (
            <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-md space-y-1">
              <p className="text-xs font-medium text-orange-700 dark:text-orange-300">
                ⚠️ 注意事项
              </p>
              {costBreakdown.warnings.map((warning, index) => (
                <p key={index} className="text-xs text-orange-600 dark:text-orange-400">
                  • {warning}
                </p>
              ))}
            </div>
          )}

          {costBreakdown.potentialSavings > 0 && (
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-md">
              <p className="text-xs text-green-700 dark:text-green-300">
                💡 年付可节省 ${costBreakdown.potentialSavings.toFixed(2)} (10%)
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button className="flex-1" size="sm">
              <Download className="h-3 w-3 mr-1" />
              导出报告
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-3 w-3 mr-1" />
              分享
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}