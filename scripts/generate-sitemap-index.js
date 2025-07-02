const fs = require('fs');
const path = require('path');

// Define the base URL
const BASE_URL = 'https://bytehive.site';

// Define sitemap files
const sitemapFiles = [
  {
    name: 'sitemap.xml',
    description: 'Main sitemap with all URLs'
  },
  {
    name: 'sitemap-tools.xml',
    description: 'Tools and software applications'
  },
  {
    name: 'sitemap-services.xml', 
    description: 'Infrastructure services'
  },
  {
    name: 'sitemap-blog.xml',
    description: 'Blog articles and news'
  },
  {
    name: 'sitemap-categories.xml',
    description: 'Category pages'
  },
  {
    name: 'sitemap-pages.xml',
    description: 'Static pages'
  }
];

// Generate sitemap index
const generateSitemapIndex = () => {
  const currentDate = new Date().toISOString();
  
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                                  http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">`;

  // Add each sitemap file
  sitemapFiles.forEach(sitemap => {
    // Check if the sitemap file exists
    const sitemapPath = path.join(__dirname, '../public', sitemap.name);
    if (fs.existsSync(sitemapPath) || sitemap.name === 'sitemap.xml') {
      sitemapIndex += `
  <sitemap>
    <loc>${BASE_URL}/${sitemap.name}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`;
    }
  });

  sitemapIndex += `
</sitemapindex>`;

  return sitemapIndex;
};

// Write sitemap index to public directory
const sitemapIndex = generateSitemapIndex();
const sitemapIndexPath = path.join(__dirname, '../public/sitemap-index.xml');
fs.writeFileSync(sitemapIndexPath, sitemapIndex);

console.log(`✅ Sitemap index generated successfully!`);
console.log(`📍 Location: ${sitemapIndexPath}`);