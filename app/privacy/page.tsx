import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '隐私政策 - ByteHive技术平台 | 个人信息保护与数据安全承诺',
  description: 'ByteHive隐私政策详细说明我们如何收集、使用和保护您的个人信息。我们承诺严格遵守数据保护法规，采用行业最佳安全实践，确保您的隐私得到全面保护。透明的数据使用政策，让您安心使用ByteHive平台。',
  keywords: '隐私政策,数据保护,用户信息,ByteHive',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">隐私政策</h1>
          <p className="text-muted-foreground text-center mb-8">
            最后更新：{new Date().toLocaleDateString('zh-CN')}
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. 信息收集</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们可能收集以下类型的信息：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>使用数据：</strong>包括您访问的页面、使用时长、点击的链接等</li>
                  <li><strong>设备信息：</strong>浏览器类型、操作系统、IP地址等技术信息</li>
                  <li><strong>Cookie数据：</strong>用于改善用户体验和网站功能的Cookie信息</li>
                  <li><strong>联系信息：</strong>当您主动联系我们时提供的邮箱等信息</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. 信息使用</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们使用收集的信息用于：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>提供和改善我们的服务</li>
                  <li>分析网站使用情况和优化用户体验</li>
                  <li>发送您可能感兴趣的内容和更新（仅在您同意的情况下）</li>
                  <li>响应您的询问和提供客户支持</li>
                  <li>确保网站安全和防止滥用</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. 第三方服务</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们的网站可能使用以下第三方服务：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Google Analytics：</strong>用于网站流量分析</li>
                  <li><strong>Google AdSense：</strong>用于展示相关广告</li>
                  <li><strong>云服务提供商：</strong>用于网站托管和数据存储</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  这些第三方服务有自己的隐私政策，我们建议您查阅相关政策。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Cookie使用</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们使用Cookie来：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>记住您的偏好设置</li>
                  <li>分析网站使用情况</li>
                  <li>提供个性化的用户体验</li>
                  <li>展示相关的广告内容</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  您可以通过浏览器设置管理Cookie，但这可能影响网站的某些功能。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. 数据安全</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们采取合理的安全措施来保护您的信息：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>使用HTTPS加密传输</li>
                  <li>定期更新安全措施</li>
                  <li>限制对个人信息的访问</li>
                  <li>遵循行业最佳实践</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. 用户权利</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>您拥有以下权利：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>访问我们收集的关于您的信息</li>
                  <li>要求更正不准确的信息</li>
                  <li>要求删除您的个人信息</li>
                  <li>反对处理您的个人信息</li>
                  <li>随时取消订阅我们的邮件</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. 未成年人隐私</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  我们的服务不针对13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。
                  如果我们发现收集了此类信息，将立即删除。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. 政策更新</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  我们可能会定期更新此隐私政策。重大变更将在网站上显著位置通知。
                  持续使用我们的服务即表示您接受更新后的政策。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. 联系我们</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  如果您对此隐私政策有任何疑问，请通过以下方式联系我们：
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>邮箱：privacy@bytehive.site</li>
                  <li>地址：中国</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}