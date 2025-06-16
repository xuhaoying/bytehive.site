import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'best-ai-writing-tools-2024',
    title: '2024年最佳AI写作工具对比：ChatGPT vs Claude vs Gemini',
    description: '深度对比三大主流AI写作工具的功能、价格和使用场景，帮助您选择最适合的AI助手。',
    content: `
# 2024年最佳AI写作工具对比

在AI技术飞速发展的今天，选择合适的AI写作工具变得越来越重要。本文将深度对比市场上三大主流AI写作工具：ChatGPT、Claude和Gemini。

## 功能对比

### ChatGPT
- **优势**：响应速度快，支持多种编程语言，插件生态丰富
- **劣势**：知识更新有延迟，免费版功能受限
- **最佳用途**：创意写作、代码生成、日常对话

### Claude
- **优势**：上下文理解能力强，输出质量高，安全性好
- **劣势**：使用限制较多，不支持图片生成
- **最佳用途**：长文档处理、学术写作、复杂分析

### Gemini
- **优势**：多模态能力强，与Google生态集成好
- **劣势**：某些地区不可用，中文支持一般
- **最佳用途**：图文混合创作、搜索增强、数据分析

## 价格对比

| 工具 | 免费版 | 付费版 | 特点 |
|------|--------|--------|------|
| ChatGPT | GPT-3.5 | $20/月 | Plus版本使用GPT-4 |
| Claude | 有限使用 | $20/月 | Pro版本无限制使用 |
| Gemini | 基础功能 | $19.99/月 | Advanced版本 |

## 使用建议

1. **预算有限**：优先使用各工具的免费版本
2. **专业写作**：推荐Claude Pro
3. **编程开发**：推荐ChatGPT Plus
4. **多媒体创作**：推荐Gemini Advanced

## 总结

选择AI写作工具需要根据您的具体需求。建议先试用免费版本，了解各自特点后再决定是否付费升级。
    `,
    author: 'ByteHive Team',
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-15',
    category: 'ai-tools-review',
    tags: ['AI写作', 'ChatGPT', 'Claude', 'Gemini', '工具对比'],
    coverImage: '/images/blog/ai-writing-tools.jpg',
    readingTime: 5,
    featured: true,
    relatedTools: ['chatgpt', 'claude', 'gemini']
  },
  {
    id: '2',
    slug: 'how-to-use-midjourney-beginner-guide',
    title: 'Midjourney新手完全指南：从入门到精通',
    description: '详细介绍Midjourney的注册、使用方法、提示词技巧和高级功能，助您快速掌握AI绘画。',
    content: `
# Midjourney新手完全指南

Midjourney是目前最受欢迎的AI图像生成工具之一。本指南将帮助您从零开始掌握Midjourney。

## 快速开始

### 1. 注册账号
- 访问Discord并创建账号
- 加入Midjourney官方服务器
- 选择合适的订阅计划

### 2. 基础命令
- **/imagine**: 生成图像的核心命令
- **/settings**: 调整生成参数
- **/info**: 查看账户信息

## 提示词技巧

### 基础结构
\`\`\`
[主题] + [风格] + [细节] + [参数]
\`\`\`

### 实例
- 简单提示词：\`a cute cat, cartoon style\`
- 复杂提示词：\`a majestic dragon flying over mountains, fantasy art, detailed scales, dramatic lighting, 8k resolution --ar 16:9 --v 6\`

## 高级技巧

### 1. 参数使用
- **--ar**: 设置宽高比（如 --ar 16:9）
- **--v**: 选择模型版本
- **--q**: 设置质量等级
- **--s**: 风格化程度

### 2. 图像优化
- 使用种子值保持一致性
- 混合多个图像风格
- 调整权重获得理想效果

## 常见问题

**Q: 生成的图像不理想怎么办？**
A: 尝试调整提示词，添加更多细节描述，或使用不同的风格关键词。

**Q: 如何生成特定风格的图像？**
A: 在提示词中加入艺术家名字、艺术流派或特定风格描述。

## 实用资源

- 提示词库：[链接]
- 风格参考：[链接]
- 社区作品：[链接]

掌握Midjourney需要不断练习和尝试。建议从简单的提示词开始，逐步增加复杂度。
    `,
    author: 'ByteHive Team',
    publishedAt: '2024-01-10',
    updatedAt: '2024-01-10',
    category: 'tutorials',
    tags: ['Midjourney', 'AI绘画', '教程', '提示词'],
    coverImage: '/images/blog/midjourney-guide.jpg',
    readingTime: 8,
    featured: true,
    relatedTools: ['midjourney', 'dall-e', 'stable-diffusion']
  },
  {
    id: '3',
    slug: 'ai-tools-for-developers-2024',
    title: '开发者必备的10款AI编程工具推荐',
    description: '精选10款能显著提升开发效率的AI编程工具，包括代码补全、调试助手、文档生成等。',
    content: `
# 开发者必备的10款AI编程工具

AI正在改变软件开发的方式。以下是2024年最值得尝试的AI编程工具。

## 1. GitHub Copilot
最流行的AI代码补全工具，支持多种编程语言和IDE。

## 2. Cursor
新一代AI代码编辑器，深度集成AI功能。

## 3. Tabnine
本地化AI代码补全，注重隐私保护。

## 4. Amazon CodeWhisperer
AWS推出的免费AI编程助手。

## 5. Codeium
免费的AI代码补全工具，支持40+编程语言。

## 6. Replit AI
在线IDE集成的AI助手，适合快速原型开发。

## 7. Sourcegraph Cody
代码搜索和AI助手结合的工具。

## 8. JetBrains AI Assistant
JetBrains IDE内置的AI功能。

## 9. Pieces for Developers
AI驱动的代码片段管理工具。

## 10. Mintlify
自动生成代码文档的AI工具。

选择合适的AI工具可以大幅提升开发效率，建议根据自己的技术栈和需求进行选择。
    `,
    author: 'ByteHive Team',
    publishedAt: '2024-01-05',
    updatedAt: '2024-01-05',
    category: 'ai-tools-review',
    tags: ['AI编程', '开发工具', '效率提升'],
    coverImage: '/images/blog/ai-dev-tools.jpg',
    readingTime: 6,
    featured: false,
    relatedTools: ['github-copilot', 'cursor', 'tabnine']
  }
];

export const blogCategories = [
  {
    id: 'ai-tools-review',
    name: 'AI工具评测',
    slug: 'ai-tools-review',
    description: '深度评测各类AI工具的功能、性能和使用体验'
  },
  {
    id: 'tutorials',
    name: '使用教程',
    slug: 'tutorials',
    description: '详细的AI工具使用指南和技巧分享'
  },
  {
    id: 'industry-news',
    name: '行业资讯',
    slug: 'industry-news',
    description: 'AI行业最新动态和趋势分析'
  },
  {
    id: 'case-studies',
    name: '案例分享',
    slug: 'case-studies',
    description: '真实的AI工具应用案例和经验分享'
  }
];