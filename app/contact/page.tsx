import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '联系我们 - ByteHive技术支持与合作 | 云服务与AI工具咨询',
  description: '联系ByteHive团队，获取技术支持、商务合作或提供建议反馈。我们提供24小时响应的专业服务，无论是技术咨询、产品建议还是合作机会，都将得到及时的专业回复。欢迎与我们一起构建更好的技术生态。',
  keywords: '联系我们,技术支持,商务合作,ByteHive',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">联系我们</h1>
            <p className="text-xl text-muted-foreground">
              我们很乐意听到您的声音！有任何问题、建议或合作意向，请随时联系我们。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 联系表单 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  发送消息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">姓名 *</Label>
                      <Input id="name" placeholder="您的姓名" required />
                    </div>
                    <div>
                      <Label htmlFor="email">邮箱 *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">主题 *</Label>
                    <Input id="subject" placeholder="消息主题" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">消息内容 *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="请详细描述您的问题、建议或需求..." 
                      rows={6}
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    发送消息
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    * 必填字段。我们通常在24小时内回复消息。
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* 联系信息 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    邮箱联系
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">一般咨询</h4>
                    <a href="mailto:hello@bytehive.site" className="text-primary hover:underline">
                      hello@bytehive.site
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">技术支持</h4>
                    <a href="mailto:support@bytehive.site" className="text-primary hover:underline">
                      support@bytehive.site
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">商务合作</h4>
                    <a href="mailto:business@bytehive.site" className="text-primary hover:underline">
                      business@bytehive.site
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">媒体合作</h4>
                    <a href="mailto:media@bytehive.site" className="text-primary hover:underline">
                      media@bytehive.site
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    回复时间
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">一般咨询</span>
                      <span className="font-medium">24小时内</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">技术支持</span>
                      <span className="font-medium">12小时内</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">商务合作</span>
                      <span className="font-medium">48小时内</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">工作时间</span>
                      <span className="font-medium">周一至周五 9:00-18:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    我们的位置
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">ByteHive 团队</p>
                    <p className="text-muted-foreground">中国</p>
                    <p className="text-muted-foreground">时区：UTC+8 (北京时间)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 常见问题 */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">如何提交新的云服务？</h3>
                  <p className="text-sm text-muted-foreground">
                    您可以通过我们的<a href="/submit" className="text-primary hover:underline">提交页面</a>推荐新的云服务，
                    我们会评估后添加到平台中。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">成本计算器准确吗？</h3>
                  <p className="text-sm text-muted-foreground">
                    我们的计算器基于官方定价信息，但实际费用可能因促销、使用模式等因素有所差异，
                    建议以服务商官方报价为准。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">可以商务合作吗？</h3>
                  <p className="text-sm text-muted-foreground">
                    当然可以！我们欢迎各种形式的合作，包括内容合作、技术合作等。
                    请发送邮件至 business@bytehive.site 详谈。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">如何获取API访问？</h3>
                  <p className="text-sm text-muted-foreground">
                    目前我们的API正在开发中，如果您有API需求，请联系我们，
                    我们会优先考虑您的使用场景。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}