import React from "react";

interface UserMessageProps {
  text: string;
}

export const UserMessage = ({ text }: UserMessageProps) => {
  return (
    <span>
      {text}
    </span>
  );
};