
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Settings, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenSettings: () => void;
}

export function Header({ onOpenSettings }: HeaderProps) {
  return (
    <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-lg">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-gradient">PixelDream AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onOpenSettings}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
