import { TypingText } from "./TypingText";

interface ProgressBarProps {
  label: string;
  progress: number;
  completed?: boolean;
}

export const ProgressBar = ({ label, progress, completed }: ProgressBarProps) => {
  return (
    <div className="bg-card border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          <TypingText text={label} delay={0} speed={50} />
        </div>
        <div className="text-xs text-blue-600">
          <TypingText text="14 sources" delay={500} speed={50} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden flex-1">
          <div 
            className={`h-full transition-all duration-300 ${
              completed ? 'bg-gray-900' : 'bg-gray-700'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="w-2 h-2 bg-gray-900 rounded-sm flex-shrink-0"></div>
      </div>
    </div>
  );
};