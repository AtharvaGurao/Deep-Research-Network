import React, { useState, useEffect } from 'react';
import { parseMarkdownToComponents, renderFormattedContent, FormattedContent } from '@/lib/markdown-formatter';

interface FormattedTypingTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export const FormattedTypingText = ({ 
  text, 
  delay = 0, 
  speed = 30,
  className = ''
}: FormattedTypingTextProps) => {
  const [displayedComponents, setDisplayedComponents] = useState<FormattedContent[]>([]);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const components = parseMarkdownToComponents(text);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => setIsStarted(true), delay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsStarted(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isStarted || currentComponentIndex >= components.length) return;

    const currentComponent = components[currentComponentIndex];
    
    // For non-text components (tables, lists), display them instantly
    if (currentComponent.type === 'table' || currentComponent.type === 'list') {
      setDisplayedComponents(prev => [...prev, currentComponent]);
      setCurrentComponentIndex(prev => prev + 1);
      setCurrentCharIndex(0);
      return;
    }

    const targetText = currentComponent.content as string;
    
    if (currentCharIndex < targetText.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Component is complete, add it to displayed components
      setDisplayedComponents(prev => [...prev, currentComponent]);
      setCurrentComponentIndex(prev => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [isStarted, currentComponentIndex, currentCharIndex, components, speed]);

  // Create the current partially typed component
  const currentComponent = components[currentComponentIndex];
  const partialComponents = [...displayedComponents];
  
  if (currentComponent && (currentComponent.type === 'heading' || currentComponent.type === 'paragraph') && currentCharIndex > 0) {
    const partialText = (currentComponent.content as string).slice(0, currentCharIndex);
    partialComponents.push({
      ...currentComponent,
      content: partialText
    });
  }

  return (
    <div className={className}>
      {renderFormattedContent(partialComponents)}
    </div>
  );
};