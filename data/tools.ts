import { AITool, ToolCategory, PaymentModel } from '@/types';

export const tools: AITool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Conversational AI assistant that can understand and generate human-like text based on the prompts.',
    shortEvaluation: ['Multi-purpose AI assistant', 'Supports plugins'],
    url: 'https://chat.openai.com',
    categories: ['Text', 'Code', 'Productivity'],
    paymentModel: 'Freemium',
    popularity: 5,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    tags: ['chatbot', 'assistant', 'openai']
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI art generator that creates images from textual descriptions using advanced machine learning models.',
    shortEvaluation: ['High-quality image generation', 'Discord-based interface'],
    url: 'https://www.midjourney.com',
    categories: ['Image'],
    paymentModel: 'Paid',
    popularity: 5,
    logoUrl: 'https://seeklogo.com/images/M/midjourney-logo-A23AAAD1CD-seeklogo.com.png',
    tags: ['ai art', 'image generation']
  },
  {
    id: 'dall-e',
    name: 'DALL-E',
    description: 'Creates images from textual descriptions, capable of combining concepts, attributes, and styles.',
    shortEvaluation: ['OpenAI image generator', 'Integrated with ChatGPT'],
    url: 'https://openai.com/dall-e-3',
    categories: ['Image'],
    paymentModel: 'Freemium',
    popularity: 4,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/DALL-E_logo.svg',
    tags: ['ai art', 'openai', 'image generation']
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code by suggesting whole lines or blocks of code as you type.',
    shortEvaluation: ['Integrated with code editors', 'Understands context'],
    url: 'https://github.com/features/copilot',
    categories: ['Code'],
    paymentModel: 'Paid',
    popularity: 5,
    logoUrl: 'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
    tags: ['programming', 'code assistant', 'developer tool']
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Platform providing access to thousands of pre-trained models for NLP, computer vision, and more.',
    shortEvaluation: ['Open source AI community', 'Thousands of models'],
    url: 'https://huggingface.co',
    categories: ['Text', 'Image', 'Audio', 'Code'],
    paymentModel: 'Open Source',
    popularity: 4,
    logoUrl: 'https://huggingface.co/front/assets/huggingface_logo.svg',
    tags: ['machine learning', 'models', 'datasets']
  },
  {
    id: 'runway',
    name: 'Runway',
    description: 'Creative toolkit powered by AI that enables video editing, generation, and visual effects.',
    shortEvaluation: ['Video generation & editing', 'Professional quality'],
    url: 'https://runwayml.com',
    categories: ['Video', 'Image'],
    paymentModel: 'Freemium',
    popularity: 4,
    logoUrl: 'https://runwayml.com/images/runway-logo.png',
    tags: ['video editing', 'motion graphics']
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: 'AI content platform designed to help create marketing copy, blog posts, and other content.',
    shortEvaluation: ['Marketing-focused content creation', 'Templates for various formats'],
    url: 'https://www.jasper.ai',
    categories: ['Text', 'Business'],
    paymentModel: 'Paid',
    popularity: 3,
    logoUrl: 'https://assets-global.website-files.com/60e5f2de011b86acebc30db7/6408f6cd2f8de38717afb45a_Jasper_New_Logo.webp',
    tags: ['content creation', 'marketing', 'copywriting']
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'Open-source AI art generator capable of creating detailed images from text descriptions.',
    shortEvaluation: ['Can run locally', 'Active community'],
    url: 'https://stability.ai',
    categories: ['Image'],
    paymentModel: 'Open Source',
    popularity: 5,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Stable_Diffusion_logo.svg',
    tags: ['ai art', 'open source', 'image generation']
  },
  {
    id: 'eleven-labs',
    name: 'ElevenLabs',
    description: 'AI voice technology for generating realistic speech in various languages and voices.',
    shortEvaluation: ['Natural-sounding voices', 'Multi-language support'],
    url: 'https://elevenlabs.io',
    categories: ['Audio'],
    paymentModel: 'Freemium',
    popularity: 4,
    logoUrl: 'https://assets-global.website-files.com/646033bf1fc7fc841ddc4a79/64e71c02cf6b01d41758ed03_elevenlabs.svg',
    tags: ['text-to-speech', 'voice synthesis']
  },
  {
    id: 'anthropic-claude',
    name: 'Claude',
    description: 'Conversational AI assistant designed to be helpful, harmless, and honest.',
    shortEvaluation: ['Long context window', 'Privacy-focused'],
    url: 'https://www.anthropic.com/claude',
    categories: ['Text', 'Productivity'],
    paymentModel: 'Freemium',
    popularity: 4,
    logoUrl: 'https://assets-global.website-files.com/647b52a39b728d1ea57e28d6/647b52a39b728d1ea57e296a_1673467401.jpg',
    tags: ['chatbot', 'assistant', 'anthropic']
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI writing assistant integrated with Notion that helps with drafting, editing, and summarizing content.',
    shortEvaluation: ['Integrated with Notion', 'Summarization features'],
    url: 'https://www.notion.so/product/ai',
    categories: ['Text', 'Productivity'],
    paymentModel: 'Paid',
    popularity: 3,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    tags: ['writing assistant', 'productivity', 'note-taking']
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'AI-powered search engine that provides direct answers with sources to your questions.',
    shortEvaluation: ['Cited sources', 'Conversational interface'],
    url: 'https://www.perplexity.ai',
    categories: ['Text', 'Data'],
    paymentModel: 'Freemium',
    popularity: 3,
    logoUrl: 'https://assets-global.website-files.com/64f6f2c0e3f4c5a91d4ab467/654658cfd3ccc3a705169bbe_perplexity-ai.svg',
    tags: ['search engine', 'research', 'information retrieval']
  }
];

export const getAllCategories = (): ToolCategory[] => {
  const categoriesSet = new Set<ToolCategory>();
  
  tools.forEach(tool => {
    tool.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet).sort();
};

export const getAllPaymentModels = (): PaymentModel[] => {
  const paymentModelsSet = new Set<PaymentModel>();
  
  tools.forEach(tool => {
    paymentModelsSet.add(tool.paymentModel);
  });
  
  return Array.from(paymentModelsSet).sort();
};

export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  
  tools.forEach(tool => {
    tool.tags?.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  
  return Array.from(tagsSet).sort();
};