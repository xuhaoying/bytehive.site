import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Cookie政策 - ByteHive | 基础设施导航与成本计算器',
  description: 'ByteHive Cookie政策详细说明我们如何使用Cookie和类似技术来改善用户体验。',
  keywords: 'Cookie政策,数据跟踪,用户体验,ByteHive',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Cookie政策</h1>
          <p className="text-muted-foreground text-center mb-8">
            最后更新：{new Date().toLocaleDateString('zh-CN')}
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>什么是Cookie？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cookie是在您访问网站时存储在您设备上的小型文本文件。它们被广泛用于使网站正常工作，
                  或更高效地工作，以及向网站所有者提供信息。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>我们如何使用Cookie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们使用Cookie来：</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>确保网站正常运行</li>
                  <li>记住您的偏好设置</li>
                  <li>分析网站使用情况</li>
                  <li>改善用户体验</li>
                  <li>展示相关的广告内容</li>
                  <li>提供社交媒体功能</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookie类型</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold">必要Cookie</h3>
                    <Badge variant="destructive">必需</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    这些Cookie对网站的基本功能是必需的，无法禁用。
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>会话管理</li>
                    <li>安全性验证</li>
                    <li>基本网站功能</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold">分析Cookie</h3>
                    <Badge variant="secondary">可选</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    帮助我们了解访问者如何与网站交互，以改善用户体验。
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Google Analytics</li>
                    <li>页面访问统计</li>
                    <li>用户行为分析</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold">功能Cookie</h3>
                    <Badge variant="secondary">可选</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    记住您的选择和偏好，提供个性化体验。
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>主题偏好</li>
                    <li>语言设置</li>
                    <li>用户偏好</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold">广告Cookie</h3>
                    <Badge variant="secondary">可选</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    用于向您展示相关的广告内容。
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Google AdSense</li>
                    <li>广告个性化</li>
                    <li>广告效果追踪</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第三方Cookie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>我们的网站可能包含第三方服务的Cookie：</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Google Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      用于网站流量分析和用户行为统计。
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                        查看Google隐私政策
                      </a>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Google AdSense</h4>
                    <p className="text-sm text-muted-foreground">
                      用于展示个性化广告内容。
                      <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                        查看Google广告政策
                      </a>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">社交媒体插件</h4>
                    <p className="text-sm text-muted-foreground">
                      如果您与我们网站上的社交媒体内容互动，相关平台可能设置Cookie。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>管理Cookie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>您可以通过以下方式管理Cookie：</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">浏览器设置</h4>
                    <p className="text-sm text-muted-foreground">
                      大多数浏览器允许您控制Cookie。您可以设置阻止Cookie或在设置Cookie时收到通知。
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">退出广告Cookie</h4>
                    <p className="text-sm text-muted-foreground">
                      您可以访问以下网站管理广告Cookie偏好：
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                      <li>
                        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Google广告设置
                        </a>
                      </li>
                      <li>
                        <a href="http://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Network Advertising Initiative
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Do Not Track</h4>
                    <p className="text-sm text-muted-foreground">
                      我们尊重浏览器的"Do Not Track"信号，当检测到此设置时，我们将减少数据收集。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookie保留期</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">会话Cookie</span>
                    <span className="text-muted-foreground">浏览器关闭时删除</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">持久Cookie</span>
                    <span className="text-muted-foreground">最长2年</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">分析Cookie</span>
                    <span className="text-muted-foreground">最长26个月</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">广告Cookie</span>
                    <span className="text-muted-foreground">最长13个月</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookie同意</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  继续使用我们的网站即表示您同意我们按照本政策使用Cookie。
                  您可以随时通过浏览器设置更改Cookie偏好。
                </p>
                <p className="text-sm text-muted-foreground">
                  请注意，禁用某些Cookie可能影响网站的功能和您的用户体验。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>联系我们</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  如果您对我们的Cookie使用有任何疑问，请联系我们：
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>邮箱：privacy@bytehive.site</li>
                  <li>更多信息请查看我们的<a href="/privacy" className="text-primary hover:underline">隐私政策</a></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}