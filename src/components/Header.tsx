import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 container-padding border-b bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-foreground tracking-tight">Deep Research Network</h1>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="btn-ghost flex items-center gap-2">
          <img 
            src="/icons/share-upload.svg" 
            alt="Share" 
            className="w-4 h-4" 
            aria-hidden="true"
          />
          <span>Share</span>
        </Button>
        <Button variant="ghost" size="icon" className="btn-ghost" aria-label="More options">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};