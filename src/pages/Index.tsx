
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiKeyDialog } from "@/components/ApiKeyDialog";
import { imageGenerationService, GeneratedImage } from "@/services/ImageGenerationService";
import { Image, History } from "lucide-react";
import { Header } from "@/components/Header";
import { GenerateForm } from "@/components/GenerateForm";
import { GeneratedImages } from "@/components/GeneratedImages";
import { HistorySection } from "@/components/HistorySection";
import { Footer } from "@/components/Footer";
import { MODELS, SIZES } from "@/config/constants";
import { toast } from "sonner";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(MODELS[0].id);
  const [selectedSizeId, setSelectedSizeId] = useState(SIZES[0].id);
  const [quantity, setQuantity] = useState(1);
  const [generatingImages, setGeneratingImages] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [historyImages, setHistoryImages] = useState<GeneratedImage[]>([]);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");

  // Load history on initial render
  useEffect(() => {
    setHistoryImages(imageGenerationService.getHistory());
  }, []);

  // Check if the API key is set
  useEffect(() => {
    if (!imageGenerationService.validateApiKey()) {
      setApiKeyDialogOpen(true);
    }
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setGeneratingImages(true);
    try {
      const selectedModel = MODELS.find(model => model.id === selectedModelId)!;
      const selectedSize = SIZES.find(size => size.id === selectedSizeId)!;
      
      const images = await imageGenerationService.generateImages({
        apiKey: imageGenerationService.getApiKey()!,
        prompt: prompt.trim(),
        negativePrompt: negativePrompt.trim(),
        model: selectedModel.name,
        size: selectedSize.dimensions,
        numImages: quantity,
      });
      
      setGeneratedImages(images);
      setHistoryImages(imageGenerationService.getHistory());
      setActiveTab("results");
    } catch (error) {
      // console.error("Error generating images:", error);
    } finally {
      setGeneratingImages(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenSettings={() => setApiKeyDialogOpen(true)} />

      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="animate-fade-in"
          >
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="generate" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Create Images
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent 
              value="generate" 
              className="mt-0 space-y-8 animate-fade-in"
            >
              <GenerateForm
                prompt={prompt}
                setPrompt={setPrompt}
                negativePrompt={negativePrompt}
                setNegativePrompt={setNegativePrompt}
                models={MODELS}
                selectedModelId={selectedModelId}
                setSelectedModelId={setSelectedModelId}
                sizes={SIZES}
                selectedSizeId={selectedSizeId}
                setSelectedSizeId={setSelectedSizeId}
                quantity={quantity}
                setQuantity={setQuantity}
                generatingImages={generatingImages}
                onGenerate={handleGenerate}
              />
              
              {generatedImages.length > 0 && (
                <GeneratedImages images={generatedImages} />
              )}
            </TabsContent>
            
            <TabsContent 
              value="results" 
              className="mt-0 space-y-8 animate-fade-in"
            >
              <GeneratedImages 
                images={generatedImages} 
                showCreateMore={true}
                onCreateMore={() => setActiveTab("generate")}
              />
            </TabsContent>
            
            <TabsContent 
              value="history" 
              className="mt-0 space-y-4 animate-fade-in"
            >
              <HistorySection
                historyImages={historyImages}
                onHistoryUpdate={setHistoryImages}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      <ApiKeyDialog 
        open={apiKeyDialogOpen} 
        onOpenChange={setApiKeyDialogOpen} 
      />
    </div>
  );
};

export default Index;
