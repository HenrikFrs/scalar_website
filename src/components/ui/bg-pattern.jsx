import React from 'react';
import { cn } from '../../lib/utils';

const maskStyles = {
  'fade-edges': 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
  'fade-center': 'radial-gradient(ellipse at center, transparent 0%, black 70%)',
  'fade-top': 'linear-gradient(to bottom, transparent, black)',
  'fade-bottom': 'linear-gradient(to bottom, black, transparent)',
  'fade-left': 'linear-gradient(to right, transparent, black)',
  'fade-right': 'linear-gradient(to right, black, transparent)',
  'fade-x': 'linear-gradient(to right, transparent, black, transparent)',
  'fade-y': 'linear-gradient(to bottom, transparent, black, transparent)',
  none: null,
};

function getBgImage(variant, fill, size) {
  switch (variant) {
    case 'dots':
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case 'grid':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'diagonal-stripes':
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    case 'horizontal-lines':
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case 'vertical-lines':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
    case 'checkerboard':
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
    default:
      return undefined;
  }
}

export const BGPattern = ({
  variant = 'grid',
  mask = 'none',
  size = 24,
  fill = '#252525',
  className,
  style,
  ...props
}) => {
  const bgSize = `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);

  const maskStyle = maskStyles[mask];

  return (
    <div
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      style={{
        backgroundImage,
        backgroundSize: bgSize,
        WebkitMaskImage: maskStyle,
        maskImage: maskStyle,
        zIndex: 0,
        ...style,
      }}
      {...props}
    />
  );
};
