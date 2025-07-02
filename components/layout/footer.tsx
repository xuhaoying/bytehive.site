import { Mail, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-border mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">ByteHive</h3>
            <p className="text-muted-foreground mb-4">
              基础设施导航与成本计算器，帮助您找到最适合的云服务解决方案。
            </p>
            <div className="flex space-x-3">
              <Link href="mailto:hello@bytehive.site" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/bytehive" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-primary transition-colors">
                  推荐服务
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  博客
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">法律信息</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie政策
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                  免责声明
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">订阅更新</h3>
            <p className="text-muted-foreground mb-4">
              获取最新的云服务和功能更新。
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="您的邮箱"
                className="flex-1 py-2 px-3 rounded-l-md bg-secondary/50 border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                className="bg-primary text-primary-foreground py-2 px-4 rounded-r-md hover:bg-primary/90 transition-colors"
              >
                订阅
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ByteHive. 保留所有权利。</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-primary transition-colors">隐私政策</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">服务条款</Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">Cookie政策</Link>
              <Link href="/disclaimer" className="hover:text-primary transition-colors">免责声明</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}