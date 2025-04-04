
import { useState, KeyboardEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModelSelector, Model } from "./ModelSelector";
import { SizeSelector, Size } from "./SizeSelector";
import { QuantitySelector } from "./QuantitySelector";
import { AdvancedOptions } from "./AdvancedOptions";
import { Sparkles, Loader2 } from "lucide-react";

interface GenerateFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  negativePrompt: string;
  setNegativePrompt: (negativePrompt: string) => void;
  models: Model[];
  selectedModelId: string;
  setSelectedModelId: (modelId: string) => void;
  sizes: Size[];
  selectedSizeId: string;
  setSelectedSizeId: (sizeId: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  generatingImages: boolean;
  onGenerate: () => Promise<void>;
}

export function GenerateForm({
  prompt,
  setPrompt,
  negativePrompt,
  setNegativePrompt,
  models,
  selectedModelId,
  setSelectedModelId,
  sizes,
  selectedSizeId,
  setSelectedSizeId,
  quantity,
  setQuantity,
  generatingImages,
  onGenerate
}: GenerateFormProps) {
  
  // Handle keyboard events for prompt input
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !generatingImages && prompt.trim()) {
      onGenerate();
    }
  };

  return (
    <div className="card-gradient p-6 rounded-xl shadow-lg">
      <div className="mb-6">
        <label 
          className="text-sm font-medium text-muted-foreground block mb-1"
        >
          Prompt
        </label>
        <div className="relative">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the image you want to generate..."
            className="pr-20 min-h-16 text-lg"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setPrompt("")}
              className="text-muted-foreground h-8"
              disabled={!prompt}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <ModelSelector
          models={models}
          selectedModelId={selectedModelId}
          onSelect={setSelectedModelId}
        />
        <SizeSelector
          sizes={sizes}
          selectedSizeId={selectedSizeId}
          onSelect={setSelectedSizeId}
        />
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          max={4}
        />
      </div>
      
      <div className="mb-6">
        <AdvancedOptions 
          negativePrompt={negativePrompt}
          onNegativePromptChange={setNegativePrompt}
        />
      </div>

      <Button 
        onClick={onGenerate}
        disabled={generatingImages || !prompt.trim()} 
        className="w-full"
      >
        {generatingImages ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Images
          </>
        )}
      </Button>
    </div>
  );
}
