# ByteHive 搜索引擎提交指南

本指南帮助您将 ByteHive 网站提交到各大搜索引擎，确保网站内容被正确索引。

## Sitemap 结构

我们提供了多个专门的 sitemap 文件，以优化不同搜索引擎的抓取效率：

1. **主 Sitemap**: `https://bytehive.site/sitemap.xml` - 包含所有 URL
2. **Sitemap Index**: `https://bytehive.site/sitemap-index.xml` - 索引文件
3. **工具 Sitemap**: `https://bytehive.site/sitemap-tools.xml` - 所有工具页面
4. **服务 Sitemap**: `https://bytehive.site/sitemap-services.xml` - 基础设施服务
5. **博客 Sitemap**: `https://bytehive.site/sitemap-blog.xml` - 博客文章（支持 Google News）
6. **分类 Sitemap**: `https://bytehive.site/sitemap-categories.xml` - 分类页面
7. **静态页面 Sitemap**: `https://bytehive.site/sitemap-pages.xml` - 静态页面

## 搜索引擎提交

### 1. Google Search Console

**提交步骤：**
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加并验证网站所有权
3. 在"Sitemaps"部分提交以下 URL：
   - `https://bytehive.site/sitemap-index.xml` （推荐）
   - 或单独提交各个 sitemap 文件

**特殊功能：**
- 支持 hreflang 标签（多语言）
- 支持 Google News sitemap 协议（博客）
- 支持图片和视频 sitemap 扩展

### 2. Bing Webmaster Tools

**提交步骤：**
1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 添加网站并验证所有权
3. 在"Sitemaps"部分提交：
   - `https://bytehive.site/sitemap.xml`
   - `https://bytehive.site/sitemap-index.xml`

**Bing 特定优化：**
- 我们的 sitemap 包含 Bing 推荐的所有必需字段
- 支持 IndexNow 协议（可选配置）

### 3. 百度站长平台

**提交步骤：**
1. 访问 [百度站长平台](https://ziyuan.baidu.com)
2. 添加网站并完成验证
3. 在"链接提交">"sitemap"提交：
   - `https://bytehive.site/sitemap.xml`
   - 建议同时使用主动推送 API

**百度优化：**
- robots.txt 已设置合适的爬虫延迟
- 支持中文内容优化

### 4. Yandex Webmaster

**提交步骤：**
1. 访问 [Yandex Webmaster](https://webmaster.yandex.com)
2. 添加网站
3. 在"Indexing">"Sitemap files"提交：
   - `https://bytehive.site/sitemap-index.xml`

### 5. DuckDuckGo

DuckDuckGo 主要使用 Bing 的索引，确保在 Bing 提交即可。

### 6. 其他搜索引擎

**Sogou（搜狗）：**
- 访问 [搜狗站长平台](http://zhanzhang.sogou.com)
- 提交主 sitemap

**360 搜索：**
- 访问 [360 站长平台](http://zhanzhang.so.com)
- 提交网站和 sitemap

## 验证方法

### 1. 检查 Sitemap 有效性

使用以下工具验证 sitemap：
- [Google's Sitemap Testing Tool](https://www.google.com/webmasters/tools/sitemap-list)
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

### 2. 检查索引状态

在各搜索引擎中使用以下命令：
- Google: `site:bytehive.site`
- Bing: `site:bytehive.site`
- 百度: `site:bytehive.site`

### 3. 监控爬虫活动

查看服务器日志中的爬虫访问记录：
```bash
# Google
grep "Googlebot" access.log

# Bing
grep "bingbot" access.log

# 百度
grep "Baiduspider" access.log
```

## 最佳实践

### 1. 定期更新

- 每周运行 sitemap 生成脚本
- 新增内容后及时更新 sitemap
- 使用 ping 服务通知搜索引擎

### 2. Ping 服务

当 sitemap 更新时，通知搜索引擎：

```bash
# Google
curl "https://www.google.com/ping?sitemap=https://bytehive.site/sitemap.xml"

# Bing
curl "https://www.bing.com/ping?sitemap=https://bytehive.site/sitemap.xml"
```

### 3. 性能优化

- 保持 sitemap 文件小于 50MB
- 单个 sitemap 不超过 50,000 个 URL
- 使用 gzip 压缩（可选）

### 4. 监控建议

- 定期检查各搜索引擎的站长工具
- 监控索引覆盖率
- 关注爬虫错误和警告
- 跟踪自然搜索流量

## 故障排除

### 常见问题

1. **Sitemap 未被发现**
   - 确认 robots.txt 中列出了所有 sitemap
   - 检查 sitemap URL 是否可访问
   - 验证 XML 格式是否正确

2. **索引速度慢**
   - 提高内容质量和更新频率
   - 建立高质量外链
   - 使用主动推送 API

3. **部分页面未被索引**
   - 检查页面是否被 robots.txt 阻止
   - 确认页面有足够的内容
   - 检查是否有重复内容问题

## 自动化脚本

运行以下脚本生成所有 sitemap：

```bash
# 生成主 sitemap
node scripts/generate-sitemap.js

# 生成专门的 sitemaps
node scripts/generate-specialized-sitemaps.js

# 生成 sitemap index
node scripts/generate-sitemap-index.js
```

建议将这些脚本加入到 CI/CD 流程中自动执行。

## 更新日志

- 2024-01-XX: 初始实现，支持基础 sitemap
- 2024-01-XX: 添加多语言支持（hreflang）
- 2024-01-XX: 创建专门的 sitemap 文件
- 2024-01-XX: 添加 sitemap index 支持