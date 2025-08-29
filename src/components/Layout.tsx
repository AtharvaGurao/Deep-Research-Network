import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { BottomQueryBar } from "@/components/BottomQueryBar";

interface LayoutProps {
  children: ReactNode;
  onSubmitQuery: (query: string, selectedLLMs: string[]) => void;
  onNewChat?: () => void;
  showBottomQueryBar?: boolean;
  isHomePage?: boolean;
}

export const Layout = ({
  children,
  onSubmitQuery,
  onNewChat = () => {},
  showBottomQueryBar = true,
  isHomePage = false,
}: LayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar onNewChat={onNewChat} />
      
      <div className="flex-1 flex flex-col relative ml-64">
        {!isHomePage && <Header />}
        <main className={`flex-1 overflow-y-auto ${!isHomePage ? 'pb-40' : ''}`}>
          {children}
        </main>
      </div>
      {showBottomQueryBar && !isHomePage && (
        <BottomQueryBar 
          onSubmitQuery={onSubmitQuery}
        />
      )}
    </div>
  );
};