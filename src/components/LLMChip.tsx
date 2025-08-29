import { LLMLogo, llmLabels } from "./LLMLogo";

interface LLMChipProps {
  name: string;
  label: string;
  selected: boolean;
  onToggle: () => void;
  animate?: boolean;
  animationDelay?: number;
}

// logos centralized in LLMLogo

export const LLMChip = ({ name, label, selected, onToggle, animate = false, animationDelay = 0 }: LLMChipProps) => {
  return (
    <button 
      onClick={onToggle}
      className={`llm-chip ${selected ? 'selected' : ''} transition-all duration-200 ease-in-out ${
        animate ? 'animate-bounce scale-110 ring-2 ring-primary ring-opacity-50' : ''
      }`}
      style={{
        animationDelay: `${animationDelay}ms`,
        animationDuration: '0.6s'
      }}
    >
      <LLMLogo llm={name as keyof typeof llmLabels} className="w-4 h-4" alt={`${label} logo`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};