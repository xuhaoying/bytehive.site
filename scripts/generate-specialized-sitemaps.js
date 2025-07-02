const fs = require('fs');
const path = require('path');

// Import data
const toolsPath = path.join(__dirname, '../data/tools.ts');
const categoriesPath = path.join(__dirname, '../data/categories.ts');
const blogPostsPath = path.join(__dirname, '../data/blog-posts.ts');

// Read and parse TypeScript files
const toolsContent = fs.readFileSync(toolsPath, 'utf8');
const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');
const blogContent = fs.readFileSync(blogPostsPath, 'utf8');

// Extract data
const toolSlugs = [];
const toolMatches = toolsContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
for (const match of toolMatches) {
  toolSlugs.push(match[1]);
}

const categorySlugs = [];
const categoryMatches = categoriesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
for (const match of categoryMatches) {
  categorySlugs.push(match[1]);
}

const blogSlugs = [];
const blogMatches = blogContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
for (const match of blogMatches) {
  blogSlugs.push(match[1]);
}

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

const BASE_URL = 'https://bytehive.site';
const currentDate = new Date().toISOString().split('T')[0];

// Helper function to create sitemap header
const createSitemapHeader = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
};

// Generate tools sitemap
const generateToolsSitemap = () => {
  let sitemap = createSitemapHeader();
  
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
  
  sitemap += `
</urlset>`;
  
  return sitemap;
};

// Generate services sitemap
const generateServicesSitemap = () => {
  let sitemap = createSitemapHeader();
  
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

// Generate blog sitemap with news support
const generateBlogSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                            http://www.google.com/schemas/sitemap-news/0.9
                            http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd">`;
  
  // Add blog listing page
  sitemap += `
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${BASE_URL}/blog"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog"/>
  </url>`;
  
  // Add individual blog posts
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
  
  sitemap += `
</urlset>`;
  
  return sitemap;
};

// Generate categories sitemap
const generateCategoriesSitemap = () => {
  let sitemap = createSitemapHeader();
  
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
  
  sitemap += `
</urlset>`;
  
  return sitemap;
};

// Generate static pages sitemap
const generatePagesSitemap = () => {
  let sitemap = createSitemapHeader();
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/search', priority: '0.9', changefreq: 'daily' },
    { url: '/submit', priority: '0.7', changefreq: 'monthly' },
    { url: '/infrastructure-navigator', priority: '0.9', changefreq: 'weekly' },
    { url: '/privacy', priority: '0.6', changefreq: 'yearly' },
    { url: '/terms', priority: '0.6', changefreq: 'yearly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/disclaimer', priority: '0.6', changefreq: 'yearly' },
    { url: '/cookies', priority: '0.6', changefreq: 'yearly' },
    { url: '/dmca', priority: '0.5', changefreq: 'yearly' }
  ];
  
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
  
  sitemap += `
</urlset>`;
  
  return sitemap;
};

// Write all sitemaps
const publicDir = path.join(__dirname, '../public');

// Generate and write tools sitemap
if (toolSlugs.length > 0) {
  const toolsSitemap = generateToolsSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-tools.xml'), toolsSitemap);
  console.log(`✅ Tools sitemap generated: ${toolSlugs.length} URLs`);
}

// Generate and write services sitemap
if (serviceIds.length > 0) {
  const servicesSitemap = generateServicesSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-services.xml'), servicesSitemap);
  console.log(`✅ Services sitemap generated: ${serviceIds.length} URLs`);
}

// Generate and write blog sitemap
const blogSitemap = generateBlogSitemap();
fs.writeFileSync(path.join(publicDir, 'sitemap-blog.xml'), blogSitemap);
console.log(`✅ Blog sitemap generated: ${blogSlugs.length + 1} URLs`);

// Generate and write categories sitemap
if (categorySlugs.length > 0) {
  const categoriesSitemap = generateCategoriesSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap-categories.xml'), categoriesSitemap);
  console.log(`✅ Categories sitemap generated: ${categorySlugs.length} URLs`);
}

// Generate and write pages sitemap
const pagesSitemap = generatePagesSitemap();
fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesSitemap);
console.log(`✅ Pages sitemap generated: 11 URLs`);

console.log('\n📝 All specialized sitemaps generated successfully!');
console.log('💡 Remember to run generate-sitemap-index.js to create the index file.');