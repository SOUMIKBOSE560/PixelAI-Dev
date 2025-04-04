
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ChevronDown, ChevronUp } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface AdvancedOptionsProps {
  negativePrompt: string;
  onNegativePromptChange: (value: string) => void;
}

export function AdvancedOptions({ 
  negativePrompt, 
  onNegativePromptChange 
}: AdvancedOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex w-full items-center justify-between p-4 py-2 h-auto"
        >
          <span className="text-sm font-medium">Advanced Options</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4 space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Negative Prompt
          </label>
          <Textarea
            placeholder="Specify what you don't want to see in the image..."
            value={negativePrompt}
            onChange={(e) => onNegativePromptChange(e.target.value)}
            className="min-h-[80px] text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Describe elements you want to exclude from the generated image.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
