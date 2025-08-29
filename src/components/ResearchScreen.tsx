import { useState, useEffect } from "react";
import { TypingText } from "./TypingText";
import { UserMessage } from "./UserMessage";
import { ProgressBar } from "./ProgressBar";
import { LLMResult } from "./LLMResult";
import { CombinedResults } from "./CombinedResults";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { ExpertQuestions } from "./ExpertQuestions";
import { ExpertSelection } from "./ExpertSelection";
import { LLMLogo } from "./LLMLogo";

interface ResearchScreenProps {
  query: string;
  selectedLLMs: string[];
  onBack: () => void;
  isDemoMode?: boolean;
}

type ResearchStep = 
  | "clarification"
  | "loading" 
  | "individual-results"
  | "combined-results"
  | "suggested-questions"
  | "expert-questions"
  | "expert-selection";

const llmLabels = {
  openai: 'OpenAI',
  perplexity: 'Perplexity.ai',
  groq: 'Groq.com',
  gemini: 'Gemini.com',
  claude: 'Claude.ai',
};

export const ResearchScreen = ({ query, selectedLLMs, onBack, isDemoMode = false }: ResearchScreenProps) => {
  // Start directly at individual-results when in demo mode
  const [step, setStep] = useState<ResearchStep>(isDemoMode ? "individual-results" : "clarification");
  const [showClarificationResponse, setShowClarificationResponse] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState<Record<string, number>>({});
  const [completedLLMs, setCompletedLLMs] = useState<string[]>([]);

  useEffect(() => {
    // Skip the entire flow when in demo mode
    if (isDemoMode) {
      return;
    }

    // Simulate clarification flow
    const timer1 = setTimeout(() => {
      setShowClarificationResponse(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      setStep("loading");
      // Start loading simulation for ALL LLMs simultaneously
      selectedLLMs.forEach((llm) => {
        const interval = setInterval(() => {
          setLoadingProgress(prev => {
            const current = prev[llm] || 0;
            if (current >= 100) {
              clearInterval(interval);
              setCompletedLLMs(prevCompleted => {
                const newCompleted = [...prevCompleted, llm];
                if (newCompleted.length === selectedLLMs.length) {
                  setTimeout(() => setStep("individual-results"), 500);
                }
                return newCompleted;
              });
              return prev;
            }
            return { ...prev, [llm]: current + 5 };
          });
        }, 100);
      });
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [selectedLLMs, isDemoMode]);

  const handleContinueToResults = () => {
    setStep("combined-results");
  };

  const handleShowSuggestedQuestions = () => {
    setStep("suggested-questions");
  };

  const handleShowExpertQuestions = () => {
    setStep("expert-questions");
  };

  const handleSelectExpert = () => {
    setStep("expert-selection");
  };

  const handleSkipToExpertSelection = () => {
    setStep("expert-selection");
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto p-6 space-y-6">
      {/* User Query */}
      <div className="flex justify-end">
        <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-3 max-w-lg">
          <UserMessage text={query} />
        </div>
      </div>

      {/* Clarification - Skip in demo mode */}
      {!isDemoMode && step === "clarification" && (
        <div className="space-y-4">
          <div className="bg-card border rounded-2xl p-4 space-y-4">
            <TypingText
              text="Could you clarify what specific aspects of supplier dynamics in the European car tyre sector you're interested in? For example:"
              delay={0}
            />
            <div className="space-y-2 text-sm">
              <TypingText text="1. Major suppliers and their market shares?" delay={1000} />
              <TypingText text="2. Supply chain structure (raw materials, logistics, OEM vs aftermarket)?" delay={1500} />
              <TypingText text="3. Competitive pressures and pricing dynamics?" delay={2000} />
              <TypingText text="4. Impact of regulations or sustainability trends?" delay={2500} />
              <TypingText text="5. Recent M&A or partnership developments?" delay={3000} />
            </div>
            <TypingText
              text="Let me know which of these (or others) you'd like me to focus on."
              delay={3500}
            />
          </div>

          {showClarificationResponse && (
            <div className="bg-card border rounded-2xl p-4 space-y-4">
                <TypingText
                  text="Great. I'll investigate the major suppliers in the European car tyre sector and examine their market shares. I'll also explore the supply chain structure, including key raw materials, logistics, and the differences between supplying OEMs (automakers) versus the aftermarket."
                  delay={0}
                />
                <TypingText
                  text="I'll get back to you shortly with a detailed overview."
                  delay={2000}
                />
                
                <div className="mt-4">
                  <TypingText text="Starting research" delay={3000} />
                </div>
              </div>
          )}
        </div>
      )}

      {/* Loading - Skip in demo mode */}
      {!isDemoMode && step === "loading" && (
        <div className="space-y-4">
          {/* Keep the clarification context visible */}
          <div className="bg-card border rounded-2xl p-4 space-y-4">
            <TypingText
              text="Could you clarify what specific aspects of supplier dynamics in the European car tyre sector you're interested in? For example:"
              delay={0}
            />
            <div className="space-y-2 text-sm">
              <TypingText text="1. Major suppliers and their market shares?" delay={0} />
              <TypingText text="2. Supply chain structure (raw materials, logistics, OEM vs aftermarket)?" delay={0} />
              <TypingText text="3. Competitive pressures and pricing dynamics?" delay={0} />
              <TypingText text="4. Impact of regulations or sustainability trends?" delay={0} />
              <TypingText text="5. Recent M&A or partnership developments?" delay={0} />
            </div>
            <TypingText
              text="Let me know which of these (or others) you'd like me to focus on."
              delay={0}
            />
          </div>

          <div className="bg-card border rounded-2xl p-4 space-y-4">
            <TypingText
              text="Great. I'll investigate the major suppliers in the European car tyre sector and examine their market shares. I'll also explore the supply chain structure, including key raw materials, logistics, and the differences between supplying OEMs (automakers) versus the aftermarket."
              delay={0}
            />
            <TypingText
              text="I'll get back to you shortly with a detailed overview."
              delay={0}
            />
          </div>

          {/* Loading progress bars */}
          <div className="grid grid-cols-2 gap-4">
            {selectedLLMs.map((llm) => (
              <ProgressBar
                key={llm}
                label={`Reading ${
                  llm === 'openai' ? 'OpenAI.com' :
                  llm === 'perplexity' ? 'Perplexity.ai' :
                  llm === 'groq' ? 'Groq.com' :
                  llm === 'gemini' ? 'Gemini.com' :
                  llm === 'claude' ? 'Claude.ai' :
                  llm
                }`}
                progress={loadingProgress[llm] || 0}
                completed={completedLLMs.includes(llm)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Individual Results */}
      {step === "individual-results" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {selectedLLMs.map((llm) => (
              <div key={llm} className="relative min-w-0">
                <div 
                  role="button"
                  tabIndex={0}
                  onClick={() => {}}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      // Handle card click if needed
                    }
                  }}
                  className="h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col
                    transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-primary/40
                    focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2
                    cursor-pointer transform-gpu will-change-transform"
                  style={{ transformOrigin: 'center' }}
                >
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <LLMLogo llm={llm as keyof typeof llmLabels} className="w-4 h-4" />
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {llmLabels[llm as keyof typeof llmLabels]}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    <LLMResult llm={llm} delay={0} isDemoMode={isDemoMode} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              onClick={handleContinueToResults}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              <TypingText text="Continue to combined results →" delay={0} speed={50} />
            </button>
          </div>
        </div>
      )}

      {/* Combined Results */}
      {step === "combined-results" && (
        <CombinedResults onNext={handleShowSuggestedQuestions} isDemoMode={isDemoMode} />
      )}

      {/* Suggested Questions */}
      {step === "suggested-questions" && (
        <SuggestedQuestions onNext={handleSkipToExpertSelection} />
      )}

      {/* Expert Questions */}
      {step === "expert-questions" && (
        <ExpertQuestions onNext={handleSelectExpert} />
      )}

      {/* Expert Selection */}
      {step === "expert-selection" && (
        <ExpertSelection />
      )}
    </div>
  );
};