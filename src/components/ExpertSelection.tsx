import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Calendar, Check, Bot } from "lucide-react";
import { TypingText } from "./TypingText";

const experts = [
  { id: 1, title: "Senior Procurement Director", company: "Continental AG", location: "Munich", code: "DE001", expertise: "15+ yrs OEM contracts" },
  { id: 2, title: "OEM Supply Chain Manager", company: "Daimler AG", location: "Stuttgart", code: "DE002", expertise: "10 yrs supplier relations" },
  { id: 3, title: "Tyre Industry Analyst", company: "Pirelli & C. S.p.A.", location: "Milan", code: "IT003", expertise: "Aftermarket research focus" },
  { id: 4, title: "Automotive Procurement Lead", company: "Michelin", location: "Paris", code: "FR004", expertise: "OEM partnerships" },
  { id: 5, title: "Supply Strategy Consultant", company: "McKinsey & Company", location: "Amsterdam", code: "NL005", expertise: "Supplier strategy" },
  { id: 6, title: "Tyre Manufacturing Director", company: "Bridgestone EMEA", location: "Turin", code: "IT006", expertise: "Production oversight" },
  { id: 7, title: "OEM Partnership Manager", company: "SEAT S.A.", location: "Barcelona", code: "ES007", expertise: "Contract negotiations" },
  { id: 8, title: "Industry Relations Head", company: "German Automotive Industry Association", location: "Frankfurt", code: "DE008", expertise: "Regulatory compliance" },
  { id: 9, title: "Commercial Strategy Director", company: "Valeo", location: "Lyon", code: "FR009", expertise: "Market expansion" },
  { id: 10, title: "Aftermarket Operations Lead", company: "Goodyear", location: "Detroit", code: "US001", expertise: "US & EU EV aftermarket" }
];

const screeningQuestions = [
  "Can you briefly describe your direct involvement in negotiations between tyre suppliers and automakers during your previous roles?",
  "When was the last time you were directly involved in or closely overseeing supplier-OEM negotiations, and in which markets (Europe/global)?",
  "From your experience, what factors most strongly influence the balance of negotiating power between tyre makers and automakers?"
];

export const ExpertSelection = () => {
  const [selectedExperts, setSelectedExperts] = useState<number[]>([]);
  const location = useLocation();
  const [question, setQuestion] = useState<string>('');
  const [customQuestion, setCustomQuestion] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    // Extract the question from the URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const questionParam = searchParams.get('question');
    if (questionParam) {
      setQuestion(questionParam);
    }
  }, [location]);

  const toggleExpert = (expertId: number) => {
    setSelectedExperts(prev => 
      prev.includes(expertId)
        ? prev.filter(id => id !== expertId)
        : [...prev, expertId]
    );
  };

  const handleSendQuestion = () => {
    console.log("Sending question to experts:", selectedExperts);
  };

  const handleBookCall = () => {
    setShowCalendar(true);
  };

  const handleAIInterviewer = () => {
    console.log("Starting AI Interviewer with experts:", selectedExperts);
    // TODO: Implement AI Interviewer functionality
  };

  return (
    <div className="section-spacing container-padding space-y-8 fade-in">
      {question && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h3 className="font-medium text-blue-800">Question for experts:</h3>
          <p className="text-blue-700">{question}</p>
        </div>
      )}
      
      <h2 className="text-2xl font-semibold tracking-tight">
        <TypingText text="Select experts you wish to send question to, and/or book a call with." delay={0} speed={50} />
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        {experts.map((expert, index) => (
          <div
            key={expert.id}
            className={`expert-card min-h-[240px] ${
              selectedExperts.includes(expert.id) 
                ? 'selected' 
                : ''
            }`}
            onClick={() => toggleExpert(expert.id)}
          >
            <div className="flex flex-col h-full items-center text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-7 w-7 text-blue-600" />
              </div>
              <div className="space-y-2 mt-4 flex-1">
                <div className="font-semibold text-sm leading-tight">
                  <TypingText text={expert.title} delay={index * 100} speed={50} />
                </div>
                {expert.company && (
                  <div className="text-xs text-gray-500 leading-tight">
                    <TypingText text={expert.company} delay={index * 100 + 100} speed={50} />
                  </div>
                )}
                <div className="text-xs text-muted-foreground pt-1">
                  <TypingText text={`${expert.location} • Expert ${expert.code}`} delay={index * 100 + 200} speed={50} />
                </div>
                {"expertise" in expert && (
                  <div className="text-xs text-muted-foreground leading-relaxed pt-1">
                    <TypingText text={expert.expertise} delay={index * 100 + 400} speed={50} />
                  </div>
                )}
              </div>
              <div className="mt-auto w-full pt-4">
                <Button
                  size="sm"
                  variant="default"
                  aria-pressed={selectedExperts.includes(expert.id)}
                  aria-label={`${selectedExperts.includes(expert.id) ? 'Selected expert' : 'Select expert'}: ${expert.title} (${expert.location})`}
                  className={`w-full ${selectedExperts.includes(expert.id) ? 'btn-primary' : 'btn-secondary'} text-xs font-semibold`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpert(expert.id);
                  }}
                >
                  {selectedExperts.includes(expert.id) ? (
                    <span className="inline-flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <TypingText text="Selected" delay={0} speed={50} />
                    </span>
                  ) : (
                    <TypingText text="Select Expert" delay={0} speed={50} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-6">
          <TypingText text="Add screening questions to ask experts first" delay={0} speed={50} />
        </h3>
        
        <div className="space-y-4 mb-6">
          {screeningQuestions.map((question, index) => (
            <div key={index} className="flex items-start gap-3">
              <Checkbox id={`screening-${index}`} defaultChecked className="mt-1" />
              <label htmlFor={`screening-${index}`} className="text-sm text-foreground cursor-pointer leading-relaxed">
                <TypingText text={question} delay={index * 200} speed={30} />
              </label>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">
            <TypingText text="Add Other Screening Questions" delay={0} speed={50} />
          </label>
          <Input
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Enter additional screening questions..."
            className="input-field"
          />
        </div>
      </div>

      <div className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm border-t shadow-lg">
        <div className="container-padding py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-muted-foreground font-medium">
              <TypingText text={`Selected: ${selectedExperts.length}/10`} delay={0} speed={50} />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 w-full sm:w-auto">
              <Button 
                onClick={handleSendQuestion}
                disabled={selectedExperts.length === 0}
                className="btn-primary w-full sm:w-auto"
              >
                <TypingText text={`Send Question to Selected Experts (${selectedExperts.length})`} delay={0} speed={50} />
              </Button>
              <Button 
                variant="outline"
                onClick={handleBookCall}
                className="btn-secondary w-full sm:w-auto"
                disabled={selectedExperts.length === 0}
              >
                <Calendar className="h-4 w-4 mr-2" />
                <TypingText text="Book a Call" delay={0} speed={50} />
              </Button>
              <Button 
                onClick={handleAIInterviewer}
                disabled={selectedExperts.length === 0}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white w-full sm:w-auto transition-all duration-200"
              >
                <Bot className="h-4 w-4 mr-2" />
                <TypingText text="AI Interviewer" delay={0} speed={50} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showCalendar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="card max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              <TypingText text="Book Expert Call" delay={0} speed={50} />
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              <TypingText text="Select a time slot to schedule a call with the selected experts." delay={0} speed={50} />
            </p>
            <div className="space-y-3 mb-6">
              <Button variant="outline" className="btn-ghost w-full justify-start">
                <TypingText text="Tomorrow, 2:00 PM - 3:00 PM CET" delay={0} speed={50} />
              </Button>
              <Button variant="outline" className="btn-ghost w-full justify-start">
                <TypingText text="Friday, 10:00 AM - 11:00 AM CET" delay={0} speed={50} />
              </Button>
              <Button variant="outline" className="btn-ghost w-full justify-start">
                <TypingText text="Monday, 3:00 PM - 4:00 PM CET" delay={0} speed={50} />
              </Button>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowCalendar(false)} className="btn-secondary flex-1">
                <TypingText text="Cancel" delay={0} speed={50} />
              </Button>
              <Button onClick={() => setShowCalendar(false)} className="btn-primary flex-1">
                <TypingText text="Confirm Booking" delay={0} speed={50} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};