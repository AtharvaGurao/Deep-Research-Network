import { useState, useEffect, createContext, useContext } from "react";
import { Plus, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LLMChip } from "./LLMChip";

interface GlobalQueryContextType {
  query: string;
  setQuery: (query: string) => void;
  selectedLLMs: string[];
  setSelectedLLMs: (llms: string[]) => void;
  handleSubmitQuery: (query: string, selectedLLMs: string[]) => void;
}

export const GlobalQueryContext =
  createContext<GlobalQueryContextType | undefined>(undefined);

export const useGlobalQuery = () => {
  const context = useContext(GlobalQueryContext);
  if (!context) {
    throw new Error("useGlobalQuery must be used within a GlobalQueryProvider");
  }
  return context;
};

interface GlobalQueryBarProps {
  onSubmitQuery: (query: string, selectedLLMs: string[]) => void;
  placeholder?: string;
}

export const GlobalQueryBar = ({
  onSubmitQuery,
  placeholder = "Ask anything",
}: GlobalQueryBarProps) => {
  const { query, setQuery, selectedLLMs, setSelectedLLMs, handleSubmitQuery } = useGlobalQuery();
  const [showLogoAnimation, setShowLogoAnimation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset animation effect
  useEffect(() => {
    if (showLogoAnimation) {
      const timer = setTimeout(() => {
        setShowLogoAnimation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLogoAnimation]);

  const handleSubmit = async () => {
    if (query.trim() && selectedLLMs.length > 0 && !isSubmitting) {
      setIsSubmitting(true);
      
      // Submit the query through context
      handleSubmitQuery(query, selectedLLMs);
      
      // Clear the query and reset LLM selections
      setQuery("");
      setSelectedLLMs([]);
      
      // Focus the input element after submission
      setTimeout(() => {
        const inputElement = document.querySelector(
          ".query-input"
        ) as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        }
        setIsSubmitting(false);
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSubmitting) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleLLM = (llm: string) => {
    setSelectedLLMs(
      selectedLLMs.includes(llm) 
        ? selectedLLMs.filter((l) => l !== llm) 
        : [...selectedLLMs, llm]
    );
  };

  return (
    <div className="w-full space-y-3">
      <div className="relative">
        <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-3 gap-3 shadow-sm">
          <Plus className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent p-0 text-sm focus-visible:ring-0 query-input placeholder:text-gray-400"
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="p-2 hover:bg-gray-100">
              <Mic className="h-4 w-4 text-gray-400" />
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!query.trim() || selectedLLMs.length === 0 || isSubmitting}
              className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        <LLMChip
          name="openai"
          label="OpenAI"
          selected={selectedLLMs.includes("openai")}
          onToggle={() => toggleLLM("openai")}
          animate={showLogoAnimation}
          animationDelay={0}
        />
        <LLMChip
          name="perplexity"
          label="Perplexity"
          selected={selectedLLMs.includes("perplexity")}
          onToggle={() => toggleLLM("perplexity")}
          animate={showLogoAnimation}
          animationDelay={500}
        />
        <LLMChip
          name="groq"
          label="Groq"
          selected={selectedLLMs.includes("groq")}
          onToggle={() => toggleLLM("groq")}
          animate={showLogoAnimation}
          animationDelay={1000}
        />
        <LLMChip
          name="gemini"
          label="Gemini"
          selected={selectedLLMs.includes("gemini")}
          onToggle={() => toggleLLM("gemini")}
          animate={showLogoAnimation}
          animationDelay={1500}
        />
        <LLMChip
          name="claude"
          label="Claude"
          selected={selectedLLMs.includes("claude")}
          onToggle={() => toggleLLM("claude")}
          animate={showLogoAnimation}
          animationDelay={2000}
        />
      </div>
    </div>
  );
};

interface GlobalQueryProviderProps {
  children: React.ReactNode;
  onSubmitQuery: (query: string, selectedLLMs: string[]) => void;
}

export const GlobalQueryProvider = ({
  children,
  onSubmitQuery,
}: GlobalQueryProviderProps) => {
  const [query, setQuery] = useState("");
  const [selectedLLMs, setSelectedLLMs] = useState<string[]>([]);

  const handleSubmitQuery = (q: string, llms: string[]) => {
    onSubmitQuery(q, llms);
  };

  return (
    <GlobalQueryContext.Provider
      value={{
        query,
        setQuery,
        selectedLLMs,
        setSelectedLLMs,
        handleSubmitQuery,
      }}
    >
      {children}
    </GlobalQueryContext.Provider>
  );
};