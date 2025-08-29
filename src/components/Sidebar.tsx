import { useState } from "react";
import { MessageSquare, Search, Library, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onNewChat: () => void;
}

const chatHistory = [
  "Supplier dynamics Europe",
  "Solar panels materials in So...",
  "Financial derivatives infrastr...",
  "OEM supplier dynamics in G...",
  "Machine learning algorithms",
  "Climate change impact study",
  "Blockchain technology trends",
  "Renewable energy solutions",
  "AI ethics and governance",
  
];

export const Sidebar = ({ onNewChat }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState<string>("home");

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-sidebar border-r border-border flex flex-col overflow-hidden">
      <div className="p-6 flex-shrink-0">
        <Button
          onClick={onNewChat}
          variant="outline"
          className="w-full justify-start gap-3 text-sm font-medium h-11 px-4"
        >
          <Plus className="h-4 w-4" />
          New chat
        </Button>
      </div>
      
      <div className="px-6 pb-4 flex-shrink-0">
        <Button 
          variant="ghost" 
          className={`w-full justify-start gap-3 text-sm text-sidebar-foreground h-11 px-4 transition-colors ${
            activeItem === "search" ? "bg-sidebar-accent text-foreground" : "hover:bg-sidebar-accent/50"
          }`}
          onClick={() => setActiveItem("search")}
        >
          <Search className="h-4 w-4" />
          Search chats
        </Button>
      </div>
      
      <div className="px-6 pb-6 flex-shrink-0">
        <Button 
          variant="ghost" 
          className={`w-full justify-start gap-3 text-sm text-sidebar-foreground h-11 px-4 transition-colors ${
            activeItem === "library" ? "bg-sidebar-accent text-foreground" : "hover:bg-sidebar-accent/50"
          }`}
          onClick={() => setActiveItem("library")}
        >
          <Library className="h-4 w-4" />
          Library
        </Button>
      </div>
      
      <div className="px-6 flex-1 overflow-y-auto pr-1">
        <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Chats</div>
        <div className="space-y-2">
          {chatHistory.map((chat, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start text-left text-sm text-sidebar-foreground h-11 px-4 transition-colors ${
                activeItem === `chat-${index}` ? "bg-sidebar-accent text-foreground" : "hover:bg-sidebar-accent/50"
              }`}
              onClick={() => setActiveItem(`chat-${index}`)}
            >
              <div className="truncate font-medium">{chat}</div>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="sticky bottom-0 bg-sidebar border-t border-border p-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            TR
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm text-sidebar-foreground truncate">Thomas Richards</div>
          </div>
        </div>
      </div>
    </div>
  );
};