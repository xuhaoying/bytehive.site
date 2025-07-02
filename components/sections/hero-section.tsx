'use client';

import { AnimatedGroup } from '@/components/motion/animated-group';
import { TextEffect } from '@/components/motion/text-effect';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/container';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden relative">
        {/* Background gradients */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(260,60%,85%,.08)_0,hsla(260,60%,55%,.02)_50%,hsla(260,60%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(260,60%,85%,.06)_0,hsla(260,60%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(260,60%,85%,.04)_0,hsla(260,60%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section>
          <Container>
            <div className="relative pt-12 pb-20">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                {/* Introduction badge */}
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="/about"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <AnimatedShinyText className="text-foreground text-sm">
                      🚀 发现最优秀的技术工具和基础设施服务
                    </AnimatedShinyText>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                {/* Main title */}
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-8 text-balance text-5xl lg:mt-16 xl:text-[5rem] font-bold leading-tight"
                >
                  ByteHive 数字工具蜂巢
                </TextEffect>

                {/* Subtitle */}
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground leading-relaxed"
                >
                  精选全球最优质的AI工具、开发工具、设计工具和云基础设施服务，为开发者、创业者和企业提供一站式技术解决方案
                </TextEffect>

                {/* Action buttons */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-6 text-base h-12"
                    >
                      <Link href="/search" className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        <span className="text-nowrap">开始探索</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-xl px-6"
                  >
                    <Link href="/infrastructure-navigator" className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-nowrap">基础设施导航</span>
                    </Link>
                  </Button>
                </AnimatedGroup>

                {/* Stats */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 1.0,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">140+</div>
                    <div className="text-sm text-muted-foreground">优质工具</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">48+</div>
                    <div className="text-sm text-muted-foreground">基础设施服务</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">8+</div>
                    <div className="text-sm text-muted-foreground">服务分类</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">持续更新</div>
                  </div>
                </AnimatedGroup>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}