const fs = require('fs');
const path = require('path');

// Import tools data
const toolsPath = path.join(__dirname, '../data/tools.ts');
const categoriesPath = path.join(__dirname, '../data/categories.ts');
const blogPostsPath = path.join(__dirname, '../data/blog-posts.ts');

// Read and parse TypeScript files (simplified - in production, use proper TS parsing)
const toolsContent = fs.readFileSync(toolsPath, 'utf8');
const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');
const blogContent = fs.readFileSync(blogPostsPath, 'utf8');

// Read infrastructure service providers
const serviceIds = [];
const providersDir = path.join(__dirname, '../data/providers');
if (fs.existsSync(providersDir)) {
  const providerFiles = fs.readdirSync(providersDir).filter(file => file.endsWith('.json'));
  for (const file of providerFiles) {
    const content = fs.readFileSync(path.join(providersDir, file), 'utf8');
    try {
      const data = JSON.parse(content);
      if (data.providers && Array.isArray(data.providers)) {
        data.providers.forEach(provider => {
          if (provider.id) {
            serviceIds.push(provider.id);
          }
        });
      }
    } catch (e) {
      console.warn(`Error parsing ${file}:`, e.message);
    }
  }
}

// Extract tool slugs from the tools array
const toolSlugs = [];
const toolMatches = toolsContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
for (const match of toolMatches) {
  toolSlugs.push(match[1]);
}

// Extract category slugs
const categorySlugs = [];
const categoryMatches = categoriesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
for (const match of categoryMatches) {
  categorySlugs.push(match[1]);
}

// Extract blog post slugs
const blogSlugs = [];
const blogMatches = blogContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
for (const match of blogMatches) {
  blogSlugs.push(match[1]);
}

// Define the base URL
const BASE_URL = 'https://bytehive.site';

// Generate sitemap content with enhanced metadata for multiple search engines
const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/search', priority: '0.9', changefreq: 'daily' },
    { url: '/submit', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/infrastructure-navigator', priority: '0.9', changefreq: 'weekly' },
    { url: '/privacy', priority: '0.6', changefreq: 'yearly' },
    { url: '/terms', priority: '0.6', changefreq: 'yearly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/disclaimer', priority: '0.6', changefreq: 'yearly' },
    { url: '/cookies', priority: '0.6', changefreq: 'yearly' },
    { url: '/dmca', priority: '0.5', changefreq: 'yearly' }
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${BASE_URL}${page.url}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${page.url}"/>
  </url>`;
  });

  // Add category pages
  categorySlugs.forEach(slug => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/category/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${BASE_URL}/category/${slug}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/category/${slug}"/>
  </url>`;
  });

  // Add tool pages with enhanced metadata
  toolSlugs.forEach(slug => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/tool/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${BASE_URL}/tool/${slug}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/tool/${slug}"/>
  </url>`;
  });

  // Add blog pages with news sitemap support
  blogSlugs.forEach(slug => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${BASE_URL}/blog/${slug}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog/${slug}"/>
  </url>`;
  });

  // Add infrastructure service pages
  serviceIds.forEach(id => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/service/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${BASE_URL}/service/${id}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/service/${id}"/>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Write sitemap to public directory
const sitemap = generateSitemap();
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log(`✅ Sitemap generated successfully!`);
console.log(`📍 Location: ${sitemapPath}`);
console.log(`🔢 Total URLs: ${toolSlugs.length + categorySlugs.length + blogSlugs.length + serviceIds.length + 12}`);
console.log(`   - Static pages: 12`);
console.log(`   - Categories: ${categorySlugs.length}`);
console.log(`   - Tools: ${toolSlugs.length}`);
console.log(`   - Blog posts: ${blogSlugs.length}`);
console.log(`   - Infrastructure services: ${serviceIds.length}`);