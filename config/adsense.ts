export const ADSENSE_CONFIG = {
  // 替换为您的 AdSense 发布商 ID
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
  
  // 广告位 ID 配置
  slots: {
    // 首页广告位
    homeTopBanner: process.env.NEXT_PUBLIC_ADSENSE_HOME_TOP || '',
    homeSidebar: process.env.NEXT_PUBLIC_ADSENSE_HOME_SIDEBAR || '',
    homeInFeed: process.env.NEXT_PUBLIC_ADSENSE_HOME_INFEED || '',
    
    // 工具详情页广告位
    toolDetailTop: process.env.NEXT_PUBLIC_ADSENSE_TOOL_TOP || '',
    toolDetailMiddle: process.env.NEXT_PUBLIC_ADSENSE_TOOL_MIDDLE || '',
    toolDetailSidebar: process.env.NEXT_PUBLIC_ADSENSE_TOOL_SIDEBAR || '',
    toolDetailRelated: process.env.NEXT_PUBLIC_ADSENSE_TOOL_RELATED || '',
    
    // 博客/教程页广告位
    articleTop: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP || '',
    articleInContent: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_CONTENT || '',
    articleBottom: process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM || '',
    
    // 搜索结果页广告位
    searchResults: process.env.NEXT_PUBLIC_ADSENSE_SEARCH || '',
    
    // 分类页广告位
    categoryTop: process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_TOP || '',
    categoryInFeed: process.env.NEXT_PUBLIC_ADSENSE_CATEGORY_INFEED || ''
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