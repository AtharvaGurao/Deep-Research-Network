import { Button } from "@/components/ui/button";
import { TypingText } from "./TypingText";

interface ExpertQuestionsProps {
  onNext: () => void;
}

const expertQuestions = [
  "How would you describe the balance of power today between tyre suppliers and major European automakers?",
  "Has this balance shifted in the past 10 years, and if so, why?",
  "Do automakers typically treat tyre suppliers as strategic partners or as interchangeable commodity providers?",
  "How does negotiating power differ between premium carmakers (e.g. Mercedes, BMW, Porsche) and mass-market producers (e.g. VW, Stellantis, Renault)?",
  "What role does brand prestige (Michelin, Pirelli, etc.) play in negotiations with automakers?",
  "How are OE supply contracts typically structured (volume commitments, exclusivity, pricing)?",
  "How long do these contracts usually last, and who sets the renewal terms?",
  "Are price escalation clauses linked to raw material costs) standard, or do suppliers bear the risk?",
  "How much flexibility do suppliers have to renegotiate if input costs rise significantly?",
  "Do suppliers gain any leverage from offering multi-model or multi-plant supply contracts?",
  "How important is technical co-development in shifting bargaining power?",
  "To what extent do sustainability credentials (traceability, recycled content) improve a supplier's leverage?",
  "Do suppliers with nearby plants gain negotiating advantage due to logistics efficiency?"
];

export const ExpertQuestions = ({ onNext }: ExpertQuestionsProps) => {
  return (
    <div className="section-spacing container-padding space-y-6 fade-in">
      <h2 className="text-2xl font-semibold tracking-tight">
        <TypingText text="Questions for Experts on Negotiating Power Tyre Suppliers Actually Have Against Large Automakers" delay={0} speed={50} />
      </h2>
      
      <div className="space-y-4">
        {expertQuestions.map((question, index) => (
          <div key={index} className="card-compact flex items-center gap-4">
            <div className="flex-1 text-sm text-foreground leading-relaxed">
              <TypingText text={question} delay={index * 200} speed={30} />
            </div>
            <Button 
              size="sm"
              className="btn-primary text-xs font-semibold tracking-wide"
              onClick={onNext}
            >
              <TypingText text="ASK THE EXPERT" delay={index * 200 + 1000} speed={50} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};