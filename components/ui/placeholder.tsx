import { cn } from '@/lib/utils';

interface PlaceholderProps {
  type: 'ad' | 'sponsor' | 'affiliate' | 'content' | 'image';
  className?: string;
  height?: string;
  title?: string;
  description?: string;
}

export function Placeholder({ 
  type, 
  className, 
  height = 'h-48', 
  title,
  description 
}: PlaceholderProps) {
  const getPlaceholderContent = () => {
    switch (type) {
      case 'ad':
        return {
          icon: '📢',
          bgColor: 'from-blue-500 to-purple-600',
          defaultTitle: '广告位',
          defaultDescription: '开发环境占位符'
        };
      case 'sponsor':
        return {
          icon: '🤝',
          bgColor: 'from-green-500 to-blue-600',
          defaultTitle: '赞助商',
          defaultDescription: '推广位占位符'
        };
      case 'affiliate':
        return {
          icon: '💰',
          bgColor: 'from-purple-500 to-pink-600',
          defaultTitle: '联盟推广',
          defaultDescription: '佣金计划占位符'
        };
      case 'content':
        return {
          icon: '📝',
          bgColor: 'from-orange-500 to-red-600',
          defaultTitle: '内容区域',
          defaultDescription: '内容占位符'
        };
      case 'image':
        return {
          icon: '🖼️',
          bgColor: 'from-gray-500 to-gray-600',
          defaultTitle: '图片',
          defaultDescription: '图片占位符'
        };
      default:
        return {
          icon: '📦',
          bgColor: 'from-gray-500 to-gray-600',
          defaultTitle: '占位符',
          defaultDescription: '开发环境占位符'
        };
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const { icon, bgColor, defaultTitle, defaultDescription } = getPlaceholderContent();

  return (
    <div 
      className={cn(
        'flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-lg',
        height,
        className
      )}
    >
      <div className="text-center">
        <div className={cn(
          'w-16 h-16 mx-auto mb-3 bg-gradient-to-br rounded-xl flex items-center justify-center',
          bgColor
        )}>
          <span className="text-white text-2xl">{icon}</span>
        </div>
        <div className="text-sm text-gray-600 font-medium">
          {title || defaultTitle}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {description || defaultDescription}
        </div>
      </div>
    </div>
  );
}

export default Placeholder;