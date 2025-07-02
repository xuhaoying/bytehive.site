# ByteHive Google Analytics 集成指南

## 概述

ByteHive 已经集成了全面的 Google Analytics 跟踪功能，包括：
- 自动页面浏览跟踪
- 用户交互事件跟踪
- Web Vitals 性能监控
- 滚动深度和页面停留时间跟踪
- 错误跟踪

## 配置

### 1. 设置 Google Analytics ID

在 `.env.local` 或 `.env.production` 文件中添加：

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. 自动跟踪功能

以下功能会自动启用，无需额外配置：

- **页面浏览**: 每次路由变化时自动跟踪
- **Web Vitals**: FCP、LCP、CLS、FID、TTFB 等性能指标
- **滚动深度**: 跟踪用户滚动到 25%、50%、75% 和 100%
- **页面停留时间**: 在 10秒、30秒、60秒、180秒、300秒时记录
- **外部链接点击**: 自动跟踪所有外部链接
- **错误跟踪**: JavaScript 错误和未处理的 Promise 拒绝

## 使用指南

### 1. 在页面中使用跟踪器

#### 工具详情页
```tsx
import { ToolPageTracker } from '@/components/analytics/page-trackers';

export default function ToolPage({ tool }) {
  return (
    <div>
      <ToolPageTracker toolName={tool.name} category={tool.category} />
      {/* 页面内容 */}
    </div>
  );
}
```

#### 服务详情页
```tsx
import { ServicePageTracker } from '@/components/analytics/page-trackers';

export default function ServicePage({ service }) {
  return (
    <div>
      <ServicePageTracker serviceName={service.name} category={service.category} />
      {/* 页面内容 */}
    </div>
  );
}
```

#### 分类页面
```tsx
import { CategoryPageTracker } from '@/components/analytics/page-trackers';

export default function CategoryPage({ category }) {
  return (
    <div>
      <CategoryPageTracker categoryName={category.name} categoryType="tools" />
      {/* 页面内容 */}
    </div>
  );
}
```

#### 博客文章页
```tsx
import { BlogPageTracker } from '@/components/analytics/page-trackers';

export default function BlogPost({ article }) {
  return (
    <div>
      <BlogPageTracker 
        articleTitle={article.title}
        category={article.category}
        author={article.author}
      />
      {/* 文章内容 */}
    </div>
  );
}
```

### 2. 跟踪用户交互

#### 使用 ClickTracker 组件
```tsx
import { ClickTracker } from '@/components/analytics/page-trackers';

<ClickTracker
  eventName="download"
  eventCategory="resource"
  eventLabel="bytehive-guide.pdf"
>
  <Button>下载指南</Button>
</ClickTracker>
```

#### 使用 TrackedLink 组件
```tsx
import { TrackedLink } from '@/components/analytics/page-trackers';

<TrackedLink 
  href="https://github.com/bytehive"
  trackingLabel="GitHub Repository"
  isExternal={true}
  className="text-blue-600 hover:underline"
>
  访问我们的 GitHub
</TrackedLink>
```

### 3. 跟踪表单提交

```tsx
import { useFormSubmissionTracking } from '@/components/analytics/page-trackers';

function ContactForm() {
  const { handleSubmit } = useFormSubmissionTracking({
    formName: 'Contact Form',
    formType: 'contact',
  });

  const onSubmit = (data) => {
    // 处理表单数据
    handleSubmit(); // 跟踪提交事件
  };

  return (
    <form onSubmit={onSubmit}>
      {/* 表单字段 */}
    </form>
  );
}
```

### 4. 跟踪搜索

```tsx
import { useSearchTracking } from '@/components/analytics/analytics-hooks';

function SearchComponent() {
  const { trackSearchEvent } = useSearchTracking();

  const handleSearch = (query, results) => {
    trackSearchEvent(query, results.length, 'tools');
  };

  return (
    // 搜索组件
  );
}
```

### 5. 跟踪成本计算器

```tsx
import { useCostCalculatorTracking } from '@/components/analytics/page-trackers';

function CostCalculator() {
  const { 
    trackCalculation, 
    trackPlanChange, 
    trackFeatureToggle 
  } = useCostCalculatorTracking();

  const handleCalculate = (service, plan, cost) => {
    trackCalculation({
      serviceName: service.name,
      planName: plan.name,
      estimatedCost: cost
    });
  };

  const handlePlanChange = (service, oldPlan, newPlan) => {
    trackPlanChange(service.name, oldPlan, newPlan);
  };

  const handleFeatureToggle = (service, feature, enabled) => {
    trackFeatureToggle(service.name, feature, enabled);
  };

  return (
    // 计算器组件
  );
}
```

### 6. 直接使用 Hook

```tsx
import { useGoogleAnalytics } from '@/components/analytics/google-analytics-provider';

function MyComponent() {
  const { trackEvent } = useGoogleAnalytics();

  const handleCustomAction = () => {
    trackEvent('custom_action', 'user_interaction', 'button_click', 1);
  };

  return (
    <button onClick={handleCustomAction}>
      自定义动作
    </button>
  );
}
```

## 事件命名规范

### 事件类别 (Event Categories)
- `tool`: 工具相关事件
- `service`: 服务相关事件
- `blog`: 博客相关事件
- `navigation`: 导航相关事件
- `engagement`: 用户参与事件
- `calculator`: 计算器相关事件
- `error`: 错误事件
- `performance`: 性能相关事件

### 常用事件名称 (Event Names)
- `view_item`: 查看详情
- `search`: 搜索
- `submit_form`: 提交表单
- `click`: 点击
- `download`: 下载
- `share`: 分享
- `calculate_cost`: 计算成本
- `change_plan`: 更改计划
- `toggle_feature`: 切换功能

## 调试

在开发环境中，可以通过以下方式调试 Google Analytics：

1. 安装 [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome 扩展

2. 在浏览器控制台查看事件：
```javascript
// 查看所有发送的事件
window.dataLayer
```

3. 使用 Google Analytics 实时报告查看即时数据

## 最佳实践

1. **避免过度跟踪**: 只跟踪对业务有价值的交互
2. **使用描述性标签**: 使事件易于理解和分析
3. **保持一致性**: 在整个应用中使用相同的命名约定
4. **测试跟踪**: 在发布前测试所有跟踪功能
5. **隐私合规**: 确保遵守 GDPR 和其他隐私法规

## 常见问题

### Q: 为什么我看不到数据？
A: 
- 检查环境变量 `NEXT_PUBLIC_GA_ID` 是否正确设置
- Google Analytics 数据可能有 24-48 小时延迟
- 使用实时报告查看即时数据

### Q: 如何跟踪自定义维度？
A: 使用 `trackEvent` 并在配置对象中添加自定义参数：
```javascript
trackEvent('custom_event', 'category', 'label', {
  custom_dimension_1: 'value1',
  custom_dimension_2: 'value2'
});
```

### Q: 如何排除内部流量？
A: 在 Google Analytics 中设置 IP 过滤器，或使用浏览器扩展阻止跟踪脚本。

## 更新日志

- 2024-01-XX: 初始实现，包含基础页面跟踪
- 2024-01-XX: 添加增强跟踪功能（滚动深度、停留时间等）
- 2024-01-XX: 添加服务和成本计算器跟踪