import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Target, Users, Zap, Mail, Github } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '关于我们 - ByteHive专业AI工具与基础设施导航平台 | 技术选型指南',
  description: 'ByteHive致力于为开发者、创业者和企业提供精选的优质AI工具和云基础设施资源。平台涵盖500+个精心挑选的AI工具、云服务、开发工具和设计资源，通过专业评测和成本分析，帮助您快速找到最适合的技术解决方案。',
  keywords: '关于ByteHive,AI工具,工具导航,人工智能资源',
};

export default function AboutPage() {
  const stats = [
    { label: '精选工具', value: '400+', icon: Zap },
    { label: '工具分类', value: '8', icon: Target },
    { label: '每月访问', value: '10K+', icon: Users },
    { label: '社区贡献', value: '开源', icon: Heart },
  ];

  const features = [
    {
      title: '精心筛选',
      description: '每个工具都经过我们团队的仔细评估和测试，确保质量和实用性。',
      icon: '🔍',
    },
    {
      title: '分类清晰',
      description: '8大主要分类，40+子分类，帮助您快速找到所需的工具。',
      icon: '📁',
    },
    {
      title: '定期更新',
      description: '持续关注行业动态，及时添加新工具，移除过时资源。',
      icon: '🔄',
    },
    {
      title: '完全免费',
      description: 'ByteHive 完全免费使用，无广告干扰，专注于用户体验。',
      icon: '💝',
    },
  ];

  const team = [
    {
      name: 'ByteHive Team',
      role: '产品团队',
      description: '由资深AI研究者和产品经理组成，致力于打造最佳的AI工具导航体验。',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              关于 ByteHive
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              ByteHive 是一个专为AI爱好者打造的工具导航平台，我们致力于发现、整理和分享最优质的AI工具和资源，
              帮助用户探索AI技术，提高工作效率。
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/">浏览工具</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/submit">推荐工具</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4">我们的使命</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  在这个技术快速发展的时代，新的开发工具如雨后春笋般涌现。开发者们常常面临选择困难：
                  哪个工具最适合我的项目？哪个服务最值得信赖？哪个平台最符合我的需求？
                </p>
                <p className="mb-4">
                  ByteHive 的诞生就是为了解决这个问题。我们不是简单的工具列表，而是一个精心策划的
                  AI资源库。每个推荐的工具都经过我们团队的深度评估，包括功能性、稳定性、
                  用户体验和社区支持等多个维度。
                </p>
                <p>
                  我们相信，通过提供高质量的工具推荐和详细的使用指导，可以帮助开发者节省宝贵的时间，
                  让他们专注于真正重要的事情——创造出色的产品。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择 ByteHive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">工具分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: '环境部署', icon: '🚀', count: '60+' },
              { name: '开发工具', icon: '💻', count: '80+' },
              { name: 'AI工具', icon: '🤖', count: '40+' },
              { name: '设计工具', icon: '🎨', count: '50+' },
              { name: '营销推广', icon: '📈', count: '60+' },
              { name: '数据库', icon: '🗄️', count: '30+' },
              { name: '监控运维', icon: '📊', count: '35+' },
              { name: '学习资源', icon: '📚', count: '45+' },
            ].map((category, index) => (
              <Card key={index} className="text-center hover:bg-muted/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-medium">{category.name}</div>
                  <Badge variant="secondary" className="mt-2">{category.count}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">团队介绍</h2>
          <div className="max-w-2xl mx-auto">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-4">{member.role}</Badge>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">联系我们</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                有好的工具推荐？发现了问题？或者想要与我们合作？
                我们很乐意听到您的声音！
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <a href="mailto:hello@bytehive.site" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    发送邮件
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://github.com/bytehive" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}