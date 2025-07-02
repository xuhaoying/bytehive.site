const https = require('https');
const http = require('http');

const SITE_URL = 'https://bytehive.site';

// Define search engines to ping
const searchEngines = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${SITE_URL}/sitemap.xml`
  },
  {
    name: 'Google (Index)',
    url: `https://www.google.com/ping?sitemap=${SITE_URL}/sitemap-index.xml`
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${SITE_URL}/sitemap.xml`
  },
  {
    name: 'Bing (Index)',
    url: `https://www.bing.com/ping?sitemap=${SITE_URL}/sitemap-index.xml`
  },
  {
    name: 'Yandex',
    url: `https://blogs.yandex.ru/pings/?status=success&url=${SITE_URL}/sitemap.xml`
  },
  {
    name: 'Seznam',
    url: `https://search.seznam.cz/ping?sitemap=${SITE_URL}/sitemap.xml`
  },
  {
    name: 'Naver',
    url: `https://apis.naver.com/crawl/nsyndi/v2?ping_url=${SITE_URL}/sitemap.xml`
  }
];

// Function to ping a URL
function pingUrl(engine) {
  return new Promise((resolve, reject) => {
    const url = new URL(engine.url);
    const protocol = url.protocol === 'https:' ? https : http;
    
    const options = {
      method: 'GET',
      timeout: 10000
    };
    
    const req = protocol.get(engine.url, options, (res) => {
      if (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 202) {
        console.log(`✅ ${engine.name}: Success (${res.statusCode})`);
        resolve({ engine: engine.name, success: true, status: res.statusCode });
      } else {
        console.log(`⚠️  ${engine.name}: Received status ${res.statusCode}`);
        resolve({ engine: engine.name, success: false, status: res.statusCode });
      }
    });
    
    req.on('error', (err) => {
      console.error(`❌ ${engine.name}: Error - ${err.message}`);
      resolve({ engine: engine.name, success: false, error: err.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      console.error(`❌ ${engine.name}: Timeout`);
      resolve({ engine: engine.name, success: false, error: 'Timeout' });
    });
  });
}

// Main function
async function pingAllSearchEngines() {
  console.log('🔔 Pinging search engines with sitemap updates...\n');
  
  const results = await Promise.all(
    searchEngines.map(engine => pingUrl(engine))
  );
  
  // Summary
  console.log('\n📊 Summary:');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\n💡 Note: Some pings may fail due to:');
    console.log('   - Rate limiting');
    console.log('   - Geographic restrictions');
    console.log('   - Service availability');
    console.log('   This is normal and doesn\'t affect indexing.');
  }
  
  console.log('\n🎯 Next steps:');
  console.log('   1. Check search console tools for confirmation');
  console.log('   2. Monitor indexing status over the next few days');
  console.log('   3. Submit sitemaps manually if needed');
}

// Execute
pingAllSearchEngines().catch(console.error);