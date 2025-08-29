import { useState } from "react";
import { HomeScreen } from "@/components/HomeScreen";
import { ResearchScreen } from "@/components/ResearchScreen";
import { Layout } from "@/components/Layout";
import { GlobalQueryProvider } from "@/components/GlobalQueryBar";

type AppState = "home" | "research";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("home");
  const [currentQuery, setCurrentQuery] = useState("");
  const [selectedLLMs, setSelectedLLMs] = useState<string[]>([]);

  const handleStartResearch = (query: string, llms: string[]) => {
    setCurrentQuery(query);
    setSelectedLLMs(llms);
    setCurrentState("research");
  };

  const handleNewChat = () => {
    setCurrentState("home");
    setCurrentQuery("");
    setSelectedLLMs([]);
  };

  const handleBack = () => {
    setCurrentState("home");
  };

  return (
    <GlobalQueryProvider
      onSubmitQuery={handleStartResearch}
    >
      <Layout
        onSubmitQuery={handleStartResearch}
        onNewChat={handleNewChat}
        showBottomQueryBar={currentState === "research"}
      >
        {currentState === "home" ? (
          <HomeScreen onSubmitQuery={handleStartResearch} />
        ) : (
          <ResearchScreen
            query={currentQuery}
            selectedLLMs={selectedLLMs}
            onBack={handleBack}
          />
        )}
      </Layout>
    </GlobalQueryProvider>
  );
};

export default Index;