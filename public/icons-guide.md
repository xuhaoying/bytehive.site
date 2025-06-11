# ByteHive Icons Guide

## 所需图标文件

基于现代网站标准，ByteHive需要以下图标文件：

### 基础Favicon
- `favicon.ico` (16x16, 32x32, 48x48) - 传统ICO格式
- `favicon.svg` ✅ 已创建 - 现代SVG格式，支持自适应

### Apple设备图标
- `apple-touch-icon.png` (180x180) - iOS设备主屏幕图标

### Android/Web App图标
- `android-chrome-192x192.png` (192x192) - PWA图标
- `android-chrome-512x512.png` (512x512) - PWA启动图标

### 其他浏览器图标
- `favicon-16x16.png` (16x16) - 小尺寸图标
- `favicon-32x32.png` (32x32) - 标准尺寸图标
- `safari-pinned-tab.svg` - Safari固定标签图标

## 设计规范

### 颜色方案
- 主色：渐变从 #fbbf24 (金黄) 到 #f59e0b (琥珀) 到 #dc2626 (红橙)
- 背景：透明或深色 (#000000)
- 强调色：白色高光 (#ffffff)

### 设计元素
1. **主体**：六边形蜂巢形状
2. **中心**：发光的星形图案
3. **装饰**：蜂蜜细胞圆点
4. **效果**：渐变、阴影、发光效果

## 生成建议

可以使用以下工具生成图标：

1. **在线工具**
   - RealFaviconGenerator.net
   - Favicon.io
   - IconGen

2. **设计软件**
   - Figma/Sketch - 使用现有SVG作为基础
   - Adobe Illustrator - 矢量设计
   - Canva - 简单编辑

3. **命令行工具**
   ```bash
   # 使用ImageMagick从SVG生成PNG
   convert favicon.svg -resize 16x16 favicon-16x16.png
   convert favicon.svg -resize 32x32 favicon-32x32.png
   convert favicon.svg -resize 180x180 apple-touch-icon.png
   convert favicon.svg -resize 192x192 android-chrome-192x192.png
   convert favicon.svg -resize 512x512 android-chrome-512x512.png
   ```

## 实现说明

图标已在 `app/layout.tsx` 中正确配置：
- 使用了现代的Next.js元数据API
- 包含了所有必要的图标引用
- 设置了正确的主题色和Web App Manifest

当前的favicon.svg已经可以在现代浏览器中正确显示ByteHive品牌标识。 