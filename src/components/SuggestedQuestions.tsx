import { Button } from "@/components/ui/button";
import { TypingText } from "./TypingText";

interface SuggestedQuestionsProps {
  onNext: () => void;
}

const questions = [
  "Beyond price, what do carmakers really value most when awarding OEM tyre contracts (e.g. co-development, testing, logistics)?",
  "How much negotiating power do tyre suppliers actually have against large automakers?",
  "What is the true cost advantage of producing in Eastern Europe/Turkey versus Western Europe?",
  "How exposed are European suppliers to sudden natural rubber supply shocks, and do they maintain stockpiles?",
  "Which EU sustainability rules (rubber traceability, tyre wear particles) are proving most disruptive at the operational level?",
  "How loyal are car owners to their OE tyre brand when it comes time for replacement?",
  "How do wholesalers and dealer networks see the rise of online tyre sales — threat or complementary channel?",
  "Which European markets are most price-sensitive vs most brand-loyal in replacement tyre purchases?",
  "How quickly are smart tyres and sensor-enabled products being adopted by fleets?",
  "What are the hidden costs and risks of developing EV-specific tyres at scale?"
];

export const SuggestedQuestions = ({ onNext }: SuggestedQuestionsProps) => {
  return (
    <div className="section-spacing container-padding space-y-6 fade-in">
      <h2 className="text-2xl font-semibold tracking-tight">
        <TypingText text="10 Questions to Potentially Discuss with Experts – Not Covered in as Much Detail by LLM Results" delay={0} speed={50} />
      </h2>
      
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="card-compact flex items-center gap-4">
            <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
              <TypingText text={question} delay={index * 200} speed={30} />
            </div>
            <Button 
              variant="default" 
              size="sm"
              className="btn-secondary text-xs font-semibold"
              onClick={onNext}
            >
              <TypingText text="Ask experts the question" delay={index * 200 + 1000} speed={50} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};