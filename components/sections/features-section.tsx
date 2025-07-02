'use client';

import { HeaderSection } from '@/components/layout/header-section';
import { BorderBeam } from '@/components/magicui/border-beam';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Search,
  Database,
  Zap,
  Shield,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import Container from '@/components/layout/container';

export default function FeaturesSection() {
  type FeatureKey = 'search' | 'infrastructure' | 'curation' | 'comparison';
  const [activeFeature, setActiveFeature] = useState<FeatureKey>('search');

  const features = {
    search: {
      title: '智能搜索发现',
      description: '通过AI驱动的搜索引擎，快速发现最适合您需求的工具和服务。支持多维度筛选和智能推荐。',
      icon: Search,
      image: '/images/features/search-feature.jpg',
    },
    infrastructure: {
      title: '基础设施导航',
      description: '全面的云服务和基础设施对比平台，帮助您选择最合适的技术栈和服务提供商。',
      icon: Database,
      image: '/images/features/infrastructure-feature.jpg',
    },
    curation: {
      title: '精选工具库',
      description: '经过专业团队严格筛选的优质工具集合，每个工具都经过深度评测和实际使用验证。',
      icon: Sparkles,
      image: '/images/features/curation-feature.jpg',
    },
    comparison: {
      title: '深度对比分析',
      description: '详细的功能对比、价格分析和性能评测，帮助您做出最明智的技术选择。',
      icon: BarChart3,
      image: '/images/features/comparison-feature.jpg',
    },
  };

  return (
    <section id="features" className="px-4 py-16">
      <div className="bg-linear-to-b absolute inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]" />
      <Container>
        <div className="mx-auto max-w-6xl space-y-8 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
          <HeaderSection
            title="核心功能"
            subtitle="为您提供全方位的技术工具发现体验"
            subtitleAs="h2"
            description="ByteHive致力于成为您最可靠的技术工具和基础设施服务伙伴"
            descriptionAs="p"
          />

          <div className="grid gap-12 sm:px-12 lg:grid-cols-12 lg:gap-24 lg:px-0">
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="lg:pr-0 text-left">
                <h3 className="text-3xl font-semibold lg:text-4xl text-gradient_indigo-purple leading-normal py-1">
                  强大的功能特性
                </h3>
                <p className="mt-4 text-muted-foreground">
                  发现、比较、选择 - 在ByteHive找到最适合您的技术解决方案
                </p>
              </div>
              
              <Accordion
                type="single"
                value={activeFeature}
                onValueChange={(value) => setActiveFeature(value as FeatureKey)}
                className="w-full"
              >
                <AccordionItem value="search">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-base">
                      <Search className="size-4" />
                      智能搜索发现
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {features.search.description}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="infrastructure">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-base">
                      <Database className="size-4" />
                      基础设施导航
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {features.infrastructure.description}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="curation">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-base">
                      <Sparkles className="size-4" />
                      精选工具库
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {features.curation.description}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="comparison">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2 text-base">
                      <BarChart3 className="size-4" />
                      深度对比分析
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {features.comparison.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="bg-background w-full relative flex overflow-hidden rounded-2xl border p-2 lg:h-auto lg:col-span-7">
              <div className="aspect-76/59 bg-background relative w-full rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeFeature}-feature`}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="size-full overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 shadow-md flex items-center justify-center"
                  >
                    <div className="text-center p-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        {(() => {
                          const IconComponent = features[activeFeature].icon;
                          return <IconComponent className="w-8 h-8 text-primary" />;
                        })()}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {features[activeFeature].description}
                      </p>
                      
                      {/* Placeholder for feature visualization */}
                      <div className="mt-6 p-4 bg-card rounded-lg border">
                        <div className="space-y-2">
                          <div className="h-2 bg-primary/20 rounded-full w-full"></div>
                          <div className="h-2 bg-primary/15 rounded-full w-3/4"></div>
                          <div className="h-2 bg-primary/10 rounded-full w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <BorderBeam
                duration={6}
                size={200}
                colorFrom="hsl(260 60% 55%)"
                colorTo="hsl(280 60% 65%)"
                className="from-transparent via-primary/50 to-transparent dark:via-primary/80"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}