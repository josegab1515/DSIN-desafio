import React from 'react';
import { soundService } from '../../services/soundService';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  playSound?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  variant = 'primary',
  playSound = true,
  onClick,
  className = '',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playSound) {
      if (variant === 'danger') {
        soundService.playAlert();
      } else if (variant === 'success') {
        soundService.playSuccess();
      } else {
        soundService.playClick();
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  const variantClass = {
    primary: '',
    secondary: 'pixel-btn-secondary',
    danger: 'pixel-btn-danger',
    success: 'pixel-btn-success',
    warning: 'pixel-btn-warning'
  }[variant];

  return (
    <button
      className={`pixel-btn ${variantClass} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
