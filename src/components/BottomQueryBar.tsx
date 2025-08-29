// src/components/ui/BottomQueryBar.tsx
import { GlobalQueryBar } from "@/components/GlobalQueryBar";

interface BottomQueryBarProps {
  onSubmitQuery: (query: string, selectedLLMs: string[]) => void;
}

export const BottomQueryBar = ({ onSubmitQuery }: BottomQueryBarProps) => {
  return (
    <div className="fixed bottom-0 left-64 right-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg p-4">
          <GlobalQueryBar onSubmitQuery={onSubmitQuery} />
        </div>
      </div>
    </div>
  );
};

// Floating bottom query bar positioned to the right of the fixed sidebar