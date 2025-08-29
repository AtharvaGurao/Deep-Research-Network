import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  delay?: number;
  speed?: number;
}

export const TypingText = ({ text, delay = 0, speed = 30 }: TypingTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const typeTimer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeTimer);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(typeTimer);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, delay, speed]);

  return (
    <span className={isTyping ? "typing-animation" : ""}>
      {displayText}
      {isTyping && <span className="animate-pulse text-primary">|</span>}
    </span>
  );
};