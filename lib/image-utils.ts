// 生成模糊占位符的工具函数
export const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return '';
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // 创建渐变背景
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
};

// 获取图片主色调（用于占位符）
export const getDominantColor = async (imageSrc: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('#f3f4f6');
        return;
      }
      
      canvas.width = 1;
      canvas.height = 1;
      ctx.drawImage(img, 0, 0, 1, 1);
      
      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      resolve(rgb);
    };
    
    img.onerror = () => resolve('#f3f4f6');
    img.src = imageSrc;
  });
};

// 生成响应式图片 srcSet
export const generateSrcSet = (
  baseSrc: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1536]
): string => {
  // 如果是外部 URL，返回原始值
  if (baseSrc.startsWith('http')) {
    return baseSrc;
  }
  
  // 生成不同尺寸的 URL
  return sizes
    .map(size => {
      const url = baseSrc.replace(/(\.[^.]+)$/, `_${size}w$1`);
      return `${url} ${size}w`;
    })
    .join(', ');
};

// 获取优化后的图片格式
export const getOptimizedFormats = (originalSrc: string) => {
  const formats = [];
  
  // 添加 AVIF 格式（最优）
  formats.push({
    srcSet: originalSrc.replace(/\.[^.]+$/, '.avif'),
    type: 'image/avif'
  });
  
  // 添加 WebP 格式
  formats.push({
    srcSet: originalSrc.replace(/\.[^.]+$/, '.webp'),
    type: 'image/webp'
  });
  
  return formats;
};