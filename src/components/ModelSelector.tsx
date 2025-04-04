import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export interface Model {
  id: string;
  name: string;
  description: string;
}

interface ModelSelectorProps {
  models: Model[];
  selectedModelId: string;
  onSelect: (modelId: string) => void;
}

export function ModelSelector({ models, selectedModelId, onSelect }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedModel = models.find((model) => model.id === selectedModelId);

  if (!selectedModel) return null;

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-muted-foreground">Model</label>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            {selectedModel.name}
            <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[17rem] max-h-[20rem] overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarGutter: 'stable',
          }}
        >
          {models.map((model) => (
            <DropdownMenuItem
              key={model.id}
              className="flex items-center justify-between"
              onSelect={() => {
                onSelect(model.id);
                setOpen(false);
              }}
            >
              <div>
                <p>{model.name}</p>
                <p className="text-xs text-muted-foreground">{model.description}</p>
              </div>
              {model.id === selectedModelId && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}