import React from 'react';

export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img 
      src="/share-icon.svg" 
      alt="Share" 
      className={`w-5 h-5 inline-block align-middle ${className || ''}`} 
    />
  );
};