export const ADSENSE_CONFIG = {
  // 替换为您的 AdSense 发布商 ID
  client: 'ca-pub-XXXXXXXXXX',
  
  // 广告位 ID 配置
  slots: {
    // 首页广告位
    homeTopBanner: '1234567890',
    homeSidebar: '2345678901',
    homeInFeed: '3456789012',
    
    // 工具详情页广告位
    toolDetailTop: '4567890123',
    toolDetailMiddle: '5678901234',
    toolDetailSidebar: '6789012345',
    toolDetailRelated: '7890123456',
    
    // 博客/教程页广告位
    articleTop: '8901234567',
    articleInContent: '9012345678',
    articleBottom: '0123456789',
    
    // 搜索结果页广告位
    searchResults: '1234567891',
    
    // 分类页广告位
    categoryTop: '2345678902',
    categoryInFeed: '3456789013'
  },
  
  // In-feed 广告布局密钥
  layoutKeys: {
    homeInFeed: '-ef+qi+q-69-dk+6g',
    categoryInFeed: '-fb+5w+4e-db+86a'
  }
};

// 广告展示规则
export const AD_RULES = {
  // 每隔多少个工具展示一个广告
  toolsPerAd: 8,
  
  // 文章中每隔多少字符展示一个广告
  charsPerAd: 1500,
  
  // 最少展示广告的页面停留时间（秒）
  minTimeOnPage: 3,
  
  // 移动端是否显示侧边栏广告
  showSidebarOnMobile: false
};