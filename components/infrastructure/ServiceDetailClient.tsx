"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Provider, Plan, Selection } from '@/types/infrastructure';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Check, ExternalLink, Calculator, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { costCalculator } from '@/lib/cost-calculator';

interface ServiceDetailClientProps {
  provider: Provider;
  alternatives: Provider[];
}

export function ServiceDetailClient({ provider, alternatives }: ServiceDetailClientProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [calculatorVariables, setCalculatorVariables] = useState<Record<string, number>>({});
  const [estimatedCost, setEstimatedCost] = useState<number>(0);

  // 初始化默认计划
  useEffect(() => {
    if (provider.plans.length > 0 && !selectedPlan) {
      const firstPlan = provider.plans[0];
      setSelectedPlan(firstPlan);
      // 初始化变量默认值
      const defaultVars: Record<string, number> = {};
      firstPlan.calculatorConfig.variables.forEach(v => {
        defaultVars[v.name] = v.default as number;
      });
      setCalculatorVariables(defaultVars);
    }
  }, [provider, selectedPlan]);

  // 计算成本
  useEffect(() => {
    if (provider && selectedPlan) {
      const selection: Selection = {
        providerId: provider.id,
        planId: selectedPlan.id,
        variables: calculatorVariables
      };
      const cost = costCalculator.calculateMonthlyCost([selection]);
      setEstimatedCost(cost.monthly);
    }
  }, [provider, selectedPlan, calculatorVariables]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 返回按钮 */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          {/* 服务概览 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-2xl">
                  {provider.displayName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{provider.displayName}</h1>
                  <p className="text-lg text-muted-foreground mb-3">{provider.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* 质量指标 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">设置复杂度</div>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < provider.metrics.setupComplexity
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">文档质量</div>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < (provider.metrics.documentationQuality || 0)
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">社区评分</div>
                  <div className="text-lg font-semibold">
                    {provider.metrics.communityRating || 'N/A'}/5
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">可靠性</div>
                  <div className="text-lg font-semibold text-green-600">
                    {provider.metrics.reliabilityScore}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 定价计划 */}
          <Card>
            <CardHeader>
              <CardTitle>定价计划</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {provider.plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "relative border rounded-lg p-6 cursor-pointer transition-all",
                      selectedPlan?.id === plan.id
                        ? "border-primary shadow-lg"
                        : "hover:border-muted-foreground/50"
                    )}
                    onClick={() => {
                      setSelectedPlan(plan);
                      // 重置变量为默认值
                      const defaultVars: Record<string, number> = {};
                      plan.calculatorConfig.variables.forEach(v => {
                        defaultVars[v.name] = v.default as number;
                      });
                      setCalculatorVariables(defaultVars);
                    }}
                  >
                    {selectedPlan?.id === plan.id && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">
                          当前选择
                        </Badge>
                      </div>
                    )}
                    
                    <h3 className="text-lg font-semibold mb-2">{plan.displayName || plan.name}</h3>
                    <div className="text-2xl font-bold mb-1">
                      {plan.billing.basePrice === 0 ? '免费' : `$${plan.billing.basePrice}`}
                      {plan.billing.basePrice > 0 && (
                        <span className="text-sm font-normal text-muted-foreground">/月</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">包含资源:</div>
                      {plan.includedResources.slice(0, 3).map((resource, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-green-600" />
                          <span>{resource.amount} {resource.unit} {resource.description}</span>
                        </div>
                      ))}
                      {plan.features && plan.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 成本计算器 */}
          {selectedPlan && (
            <Card>
              <CardHeader>
                <CardTitle>成本计算器</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      配置您的使用量来获取准确的成本估算
                    </p>
                  </div>

                  {selectedPlan.calculatorConfig.variables.map((variable) => (
                    <div key={variable.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>{variable.label}</Label>
                        <span className="text-sm text-muted-foreground">
                          {calculatorVariables[variable.name] || variable.default} {variable.unit}
                        </span>
                      </div>
                      
                      {variable.type === 'slider' && (
                        <Slider
                          min={variable.min}
                          max={variable.max}
                          step={1}
                          value={[calculatorVariables[variable.name] || variable.default as number]}
                          onValueChange={([value]) => 
                            setCalculatorVariables(prev => ({ ...prev, [variable.name]: value }))
                          }
                        />
                      )}
                      
                      {variable.type === 'number' && (
                        <Input
                          type="number"
                          min={variable.min}
                          max={variable.max}
                          value={calculatorVariables[variable.name] || variable.default}
                          onChange={(e) => 
                            setCalculatorVariables(prev => ({ 
                              ...prev, 
                              [variable.name]: Number(e.target.value) 
                            }))
                          }
                        />
                      )}
                      
                      {variable.type === 'select' && (
                        <Select
                          value={String(calculatorVariables[variable.name] || variable.default)}
                          onValueChange={(value) => 
                            setCalculatorVariables(prev => ({ ...prev, [variable.name]: Number(value) }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {variable.options?.map((option) => (
                              <SelectItem key={option.value} value={String(option.value)}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      {variable.helpText && (
                        <p className="text-xs text-muted-foreground">{variable.helpText}</p>
                      )}
                    </div>
                  ))}

                  {/* 成本预估 */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-6">
                    <h4 className="font-semibold mb-4">预估成本</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>基础费用 ({selectedPlan.displayName || selectedPlan.name})</span>
                        <span>${selectedPlan.billing.basePrice.toFixed(2)}</span>
                      </div>
                      {estimatedCost > selectedPlan.billing.basePrice && (
                        <div className="flex justify-between text-sm">
                          <span>超额使用费用</span>
                          <span>${(estimatedCost - selectedPlan.billing.basePrice).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>月度总计</span>
                          <span className="text-lg">${estimatedCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>年度总计</span>
                          <span>${(estimatedCost * 12).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧栏 */}
        <div className="space-y-6">
          {/* 快速操作 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                加入估算器
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href={provider.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  访问官网
                </a>
              </Button>
              {provider.affiliate.enabled && provider.affiliate.link && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={provider.affiliate.link} target="_blank" rel="noopener noreferrer">
                    官方注册链接
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* 替代方案 */}
          {alternatives.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">替代方案</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alternatives.map((alt) => {
                  const lowestPrice = Math.min(...alt.plans.map(p => p.billing.basePrice));
                  return (
                    <Link
                      key={alt.id}
                      href={`/service/${alt.id}`}
                      className="block hover:bg-muted p-3 rounded-lg transition-colors"
                    >
                      <div className="font-medium">{alt.displayName}</div>
                      <div className="text-sm text-muted-foreground">
                        {lowestPrice === 0 ? '免费起' : `$${lowestPrice}/月起`}
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* 数据质量 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">数据质量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">数据来源</span>
                  <span className="font-medium">{provider.dataQuality.source || '官方'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">最后验证</span>
                  <span className="font-medium">
                    {new Date(provider.dataQuality.lastVerified).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">置信度</span>
                  <Badge variant={
                    provider.dataQuality.confidenceLevel === 'high' ? 'default' :
                    provider.dataQuality.confidenceLevel === 'medium' ? 'secondary' : 'outline'
                  }>
                    {provider.dataQuality.confidenceLevel === 'high' ? '高' :
                     provider.dataQuality.confidenceLevel === 'medium' ? '中' : '低'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}