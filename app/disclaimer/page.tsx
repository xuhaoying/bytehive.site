import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '免责声明 - ByteHive云服务与AI工具导航平台 | 使用条款与责任说明',
  description: 'ByteHive免责声明，包含广告披露、联盟链接和服务推荐的相关说明。我们致力于提供准确、公正的信息，但不对第三方服务承担责任。所有推荐基于我们的专业评估，仅供参考。请在使用前仔细阅读本声明。',
  keywords: '免责声明,广告披露,联盟链接,服务推荐,ByteHive',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">免责声明</h1>
          <p className="text-muted-foreground text-center mb-8">
            最后更新：{new Date().toLocaleDateString('zh-CN')}
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. 信息性质</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ByteHive提供的所有信息仅供参考和教育目的。我们努力确保信息的准确性和及时性，
                  但不对信息的完整性、准确性或适用性做任何明示或暗示的保证。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. 价格和成本计算</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>关于我们的成本计算器和价格信息：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>所有价格信息基于服务提供商的公开定价</li>
                  <li>计算结果仅供估算参考，实际费用可能有所不同</li>
                  <li>价格可能因促销、地区、使用模式等因素变化</li>
                  <li>建议在做出决策前向服务提供商确认准确价格</li>
                  <li>我们不对因价格变化导致的任何损失承担责任</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. 广告披露</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>为了维持网站运营，我们使用以下广告和货币化方式：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Google AdSense：</strong>我们在网站上展示来自Google AdSense的广告</li>
                  <li><strong>联盟营销：</strong>某些服务链接可能包含联盟标识，我们可能获得推荐佣金</li>
                  <li><strong>赞助内容：</strong>部分内容可能由合作伙伴赞助，我们会明确标识</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  这些广告和联盟关系不会影响我们对服务的客观评价和推荐。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. 联盟链接披露</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  根据相关法规要求，我们披露以下信息：
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>网站上的某些链接是联盟链接</li>
                  <li>当您通过这些链接注册服务时，我们可能获得佣金</li>
                  <li>这不会增加您的费用</li>
                  <li>佣金收入用于维持网站运营和内容更新</li>
                  <li>我们只推荐我们认为有价值的服务</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. 第三方服务</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>关于我们推荐的第三方服务：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>我们不是这些服务的官方代表</li>
                  <li>不对第三方服务的质量、可用性或支持负责</li>
                  <li>不对因使用第三方服务产生的任何问题承担责任</li>
                  <li>建议用户在选择服务前进行自己的研究</li>
                  <li>用户与第三方服务商的关系完全独立于我们</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. 投资和商业决策</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  我们的内容不构成投资、法律或商业建议。所有关于技术选择、服务采购的决定都应该
                  基于您自己的研究和专业咨询。我们强烈建议在做出重大技术或商业决策前咨询相关专家。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. 技术信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>关于我们提供的技术信息：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>技术信息可能随时间变化</li>
                  <li>不同用例下的表现可能有所不同</li>
                  <li>我们建议进行实际测试验证</li>
                  <li>不对因技术实施产生的问题负责</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. 用户责任</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  用户有责任：验证信息的准确性；进行适当的尽职调查；为自己的决定承担责任；
                  遵守所有适用的法律法规；保护自己的账户和数据安全。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. 更新声明</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  我们可能会定期更新此免责声明。重大变更将在网站显著位置通知。
                  继续使用网站即表示接受更新后的声明。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. 联系我们</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  如果您对此免责声明有任何疑问，请联系我们：
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>邮箱：legal@bytehive.site</li>
                  <li>联系页面：<a href="/contact" className="text-primary hover:underline">联系我们</a></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}