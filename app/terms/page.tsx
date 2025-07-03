import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '服务条款 - ByteHive云服务导航平台 | 用户协议与使用规则',
  description: 'ByteHive服务条款详细说明使用我们网站和服务的规则和条件。包括用户权利与义务、知识产权保护、免责声明、服务变更政策等重要条款。我们致力于提供公平、透明、可靠的服务，保障用户合法权益。',
  keywords: '服务条款,使用条款,网站规则,ByteHive',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">服务条款</h1>
          <p className="text-muted-foreground text-center mb-8">
            最后更新：{new Date().toLocaleDateString('zh-CN')}
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. 服务概述</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>ByteHive（"我们"、"我们的"）是一个基础设施导航和成本计算平台，为用户提供：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>云服务提供商信息和比较</li>
                  <li>成本计算工具和价格分析</li>
                  <li>技术资源和教程内容</li>
                  <li>相关的新闻和更新</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. 接受条款</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  通过访问和使用ByteHive网站，您表示同意遵守这些服务条款。
                  如果您不同意这些条款，请不要使用我们的服务。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. 使用许可</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们授予您有限的、非排他性的、不可转让的许可来使用我们的服务，条件是您：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>仅将服务用于合法目的</li>
                  <li>不违反任何适用的法律法规</li>
                  <li>不干扰服务的正常运行</li>
                  <li>不试图获取未授权的访问权限</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. 禁止行为</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>使用我们的服务时，您不得：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>发布虚假、误导性或恶意内容</li>
                  <li>侵犯他人的知识产权</li>
                  <li>进行任何形式的网络攻击</li>
                  <li>使用自动化工具过度访问服务</li>
                  <li>逆向工程或复制我们的代码</li>
                  <li>传播恶意软件或病毒</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. 内容和知识产权</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>网站上的所有内容，包括但不限于：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>文字、图片、图标、代码</li>
                  <li>网站设计和布局</li>
                  <li>商标和服务标记</li>
                  <li>数据库和算法</li>
                </ul>
                <p className="text-muted-foreground">
                  均受版权法和其他知识产权法保护。未经明确许可，不得复制、分发或修改。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. 第三方链接和服务</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们的网站可能包含指向第三方网站或服务的链接。我们：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>不对第三方网站的内容或政策负责</li>
                  <li>不保证第三方服务的可用性或准确性</li>
                  <li>不对因使用第三方服务造成的损失承担责任</li>
                </ul>
                <p className="text-muted-foreground">
                  建议您查阅第三方服务的条款和隐私政策。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. 免责声明</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们的服务按"现状"提供，我们不保证：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>服务的不间断或无错误运行</li>
                  <li>信息的准确性、完整性或及时性</li>
                  <li>满足您的特定需求</li>
                  <li>成本计算的绝对准确性（仅供参考）</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  所有价格信息和计算结果仅供参考，实际费用请以服务提供商为准。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. 责任限制</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  在适用法律允许的最大范围内，我们对因使用或无法使用我们的服务而产生的任何直接、间接、
                  偶然、特殊或后果性损害不承担责任，包括但不限于利润损失、数据丢失或业务中断。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. 广告和赞助内容</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们的网站可能包含：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>第三方广告内容</li>
                  <li>赞助商推广信息</li>
                  <li>联盟营销链接</li>
                </ul>
                <p className="text-muted-foreground">
                  这些内容将明确标识，我们对广告内容的准确性不承担责任。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. 服务修改和终止</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  我们保留随时修改、暂停或终止服务的权利，恕不另行通知。
                  我们也可能更新这些条款，重大变更将提前通知用户。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. 适用法律</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  这些条款受中华人民共和国法律管辖。任何争议将通过友好协商解决，
                  协商不成的，提交有管辖权的人民法院解决。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. 联系信息</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  如果您对这些服务条款有任何疑问，请联系我们：
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>邮箱：legal@bytehive.site</li>
                  <li>网站：https://bytehive.site</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}