'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Plus, X, Star } from 'lucide-react';
import { categories } from '@/data/categories';
// Removed tabs import as not needed for free submission

const paymentModels = [
  { value: 'Free', label: '完全免费' },
  { value: 'Freemium', label: '免费试用' },
  { value: 'Paid', label: '付费' },
  { value: 'Open Source', label: '开源' },
];

const platforms = ['Web', 'Windows', 'macOS', 'Linux', 'iOS', 'Android', 'CLI', 'API'];

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: '',
    longDescription: '',
    category: '',
    subcategory: '',
    pricing: '',
    platforms: [] as string[],
    tags: '',
    features: '',
    submitterName: '',
    submitterEmail: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入工具名称';
    }

    if (!formData.website.trim()) {
      newErrors.website = '请输入官网地址';
    } else if (!formData.website.match(/^https?:\/\/.+/)) {
      newErrors.website = '请输入有效的网址（包含 http:// 或 https://）';
    }

    if (!formData.description.trim()) {
      newErrors.description = '请输入工具描述';
    }

    if (!formData.category) {
      newErrors.category = '请选择工具分类';
    }

    if (!formData.pricing) {
      newErrors.pricing = '请选择定价模式';
    }

    if (!formData.submitterEmail.trim()) {
      newErrors.submitterEmail = '请输入您的邮箱地址';
    } else if (!formData.submitterEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.submitterEmail = '请输入有效的邮箱地址';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      website: '',
      description: '',
      longDescription: '',
      category: '',
      subcategory: '',
      pricing: '',
      platforms: [],
      tags: '',
      features: '',
      submitterName: '',
      submitterEmail: '',
      additionalNotes: '',
    });
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">提交成功！</h2>
              <p className="text-muted-foreground mb-6">
                感谢您的推荐！您的工具已成功添加到 ByteHive，
                现在就可以在网站上查看了。我们将通过邮件确认您的提交。
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={resetForm} variant="outline">
                  继续推荐
                </Button>
                <Button asChild>
                  <a href="/">返回首页</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const selectedCategory = categories.find(cat => cat.slug === formData.category);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">推荐AI工具</h1>
            <p className="text-xl text-muted-foreground">
              发现了优秀的AI工具？免费提交，即时上线，与社区分享您的发现！
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Free Submission Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-green-500" />
                免费提交，即时上线
              </CardTitle>
              <CardDescription>
                ByteHive 支持所有AI工具免费提交，无需审核，即时上线展示
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>完全免费，无隐藏费用</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>提交后即时上线展示</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>支持完整工具信息</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>自动生成工具详情页</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>支持搜索和分类浏览</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>无需人工审核等待</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">完全免费</div>
                <div className="text-sm text-green-700">立即提交，马上上线</div>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                提交指南
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 请确保推荐的AI工具对用户有实际价值</li>
                <li>• 工具应该是稳定可用的，避免推荐测试版本</li>
                <li>• 提供准确的信息，包括定价和功能描述</li>
                <li>• 所有提交即时上线，无需等待审核</li>
                <li>• 如有问题可以通过邮件联系我们修改</li>
              </ul>
            </CardContent>
          </Card>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>工具信息</CardTitle>
              <CardDescription>
                请填写您要推荐的工具的详细信息
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">工具名称 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="例如：Visual Studio Code"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="website">官网地址 *</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://code.visualstudio.com"
                      className={errors.website ? 'border-red-500' : ''}
                    />
                    {errors.website && (
                      <p className="text-sm text-red-500 mt-1">{errors.website}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">简短描述 *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="用一句话描述这个工具的主要功能"
                      rows={2}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="longDescription">详细介绍</Label>
                    <Textarea
                      id="longDescription"
                      value={formData.longDescription}
                      onChange={(e) => handleInputChange('longDescription', e.target.value)}
                      placeholder="详细描述工具的功能特点、使用场景等（可选）"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-4">
                  <div>
                    <Label>工具分类 *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="选择最适合的分类" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            <div className="flex items-center gap-2">
                              <span>{category.icon}</span>
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                    )}
                  </div>

                  {selectedCategory && selectedCategory.subcategories && (
                    <div>
                      <Label>子分类</Label>
                      <Select value={formData.subcategory} onValueChange={(value) => handleInputChange('subcategory', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择子分类（可选）" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategory.subcategories.map((subcategory) => (
                            <SelectItem key={subcategory.slug} value={subcategory.slug}>
                              {subcategory.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div>
                  <Label>定价模式 *</Label>
                  <Select value={formData.pricing} onValueChange={(value) => handleInputChange('pricing', value)}>
                    <SelectTrigger className={errors.pricing ? 'border-red-500' : ''}>
                      <SelectValue placeholder="选择定价模式" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentModels.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.pricing && (
                    <p className="text-sm text-red-500 mt-1">{errors.pricing}</p>
                  )}
                </div>

                {/* Platforms */}
                <div>
                  <Label>支持平台</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {platforms.map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox
                          id={platform}
                          checked={formData.platforms.includes(platform)}
                          onCheckedChange={() => handlePlatformToggle(platform)}
                        />
                        <Label htmlFor={platform} className="text-sm font-normal">
                          {platform}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Label htmlFor="tags">标签</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="用逗号分隔，例如：代码编辑器,免费,微软"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    用逗号分隔多个标签，帮助用户更好地找到这个工具
                  </p>
                </div>

                {/* Features */}
                <div>
                  <Label htmlFor="features">主要功能</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) => handleInputChange('features', e.target.value)}
                    placeholder="每行一个功能特点，例如：&#10;智能代码补全&#10;内置Git支持&#10;丰富的插件生态"
                    rows={4}
                  />
                </div>


                {/* Submitter Info */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">联系信息</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="submitterName">您的姓名</Label>
                      <Input
                        id="submitterName"
                        value={formData.submitterName}
                        onChange={(e) => handleInputChange('submitterName', e.target.value)}
                        placeholder="可选，用于工具详情页面的致谢"
                      />
                    </div>

                    <div>
                      <Label htmlFor="submitterEmail">邮箱地址 *</Label>
                      <Input
                        id="submitterEmail"
                        type="email"
                        value={formData.submitterEmail}
                        onChange={(e) => handleInputChange('submitterEmail', e.target.value)}
                        placeholder="用于接收提交确认邮件"
                        className={errors.submitterEmail ? 'border-red-500' : ''}
                      />
                      {errors.submitterEmail && (
                        <p className="text-sm text-red-500 mt-1">{errors.submitterEmail}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="additionalNotes">备注</Label>
                      <Textarea
                        id="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                        placeholder="任何想要补充的信息（可选）"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>


                {/* Submit */}
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? '提交中...' : '免费提交'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    重置
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}