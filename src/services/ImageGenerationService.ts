import { toast } from "sonner";

interface GenerateImageParams {
  apiKey: string;
  prompt: string;
  negativePrompt?: string;
  model: string;
  size: string;
  numImages: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  createdAt: Date;
}

interface ApiResponse {
  imageUrl?: string;
  error?: string;
  quota?: string;
}

class ImageGenerationService {
  private apiKey: string | null = null;
  private toastId: string | number | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem("aiImageGeneratorApiKey", key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem("aiImageGeneratorApiKey");
    }
    return this.apiKey;
  }

  validateApiKey(): boolean {
    return !!this.getApiKey();
  }

  private async generateImage(params: GenerateImageParams): Promise<string> {
    const { apiKey, prompt, negativePrompt, model, size } = params;
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/generate-image`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify({ apiKey, prompt, negativePrompt, model, size })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data: ApiResponse = await response.json();

      if (data.error) {
        const errorMessage = data.quota || data.error;
        this.showToast('error', "Generation Error", errorMessage);
        throw new Error(errorMessage);
      }

      if (!data.imageUrl) {
        this.showToast('error', "Generation Error", "No image URL returned from the API");
        return "";
      }

      return data.imageUrl;

    } catch (error) {
      console.error('Network/Request Error:', error);
      this.showToast('error', "Network Error", "Failed to connect to the image generation service");
      throw error;
    }
  }


  async generateImages({ prompt, negativePrompt, model, size, numImages }: GenerateImageParams): Promise<GeneratedImage[]> {
    if (!this.validateApiKey()) {
      this.showToast('error', "API key not set", "Please enter your API key in settings.");
      throw new Error("API key not set");
    }

    try {
      this.showToast('info', "Generating images...", `Creating ${numImages} images with model: ${model}`);

      const generatedImages: GeneratedImage[] = [];
      let quotaExceeded = false;

      for (let i = 0; i < numImages; i++) {
        try {
          const imageUrl = await this.generateImage({
            apiKey: this.getApiKey()!,
            prompt,
            negativePrompt,
            model,
            size,
            numImages: 1
          });

          if (!imageUrl) continue;

          generatedImages.push({
            id: crypto.randomUUID(),
            url: imageUrl,
            prompt,
            model,
            createdAt: new Date(),
          });
        } catch (error) {
          if (error instanceof Error && error.message.includes("Quota")) {
            quotaExceeded = true;
            break; // Exit the loop immediately on quota exceeded
          }
          console.error("Error generating single image:", error);
          // Don't show toast here - we'll handle it after the loop
        }
      }

      if (quotaExceeded) {
        this.showToast('error', "Quota Exceeded", "Your API quota has been exceeded. Please try again later.");
        return []; // Return empty array since we couldn't generate any images
      }

      if (generatedImages.length === 0) {
        this.showToast('error', "Generation Failed", "No images were generated. Please check your API key and quota.");
        throw new Error("No images were generated");
      }

      if (generatedImages.length > 0) {
        this.showToast('success', "Images generated",
          `Generated ${generatedImages.length} out of requested ${numImages} images.`);
      }

      this.saveToHistory(generatedImages);
      return generatedImages;
    } catch (error) {
      console.error("Error generating images:", error);
      // Only show toast if it's not a quota error (already handled) or API key error (handled at start)
      if (!(error instanceof Error) ||
        (!error.message.includes("Quota") && !error.message.includes("API key not set"))) {
        this.showToast('error', "Generation Error", "Please try again later.");
      }
      throw error;
    }
  }


  // Helper method to manage toast display
  private showToast(type: 'info' | 'error' | 'success', title: string, description: string) {
    // Always dismiss previous toast
    if (this.toastId) {
      toast.dismiss(this.toastId);
      this.toastId = null;
    }

    // Show new toast and store its ID
    switch (type) {
      case 'info':
        this.toastId = toast.info(title, { description });
        break;
      case 'error':
        this.toastId = toast.error(title, { description });
        break;
      case 'success':
        this.toastId = toast.success(title, { description });
        break;
    }
  }


  getHistory(): GeneratedImage[] {
    const historyJson = localStorage.getItem("aiImageGeneratorHistory");
    if (!historyJson) return [];

    try {
      const history = JSON.parse(historyJson);
      return history.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }));
    } catch (error) {
      console.error("Error parsing history:", error);
      return [];
    }
  }

  private saveToHistory(images: GeneratedImage[]) {
    try {
      const history = this.getHistory();
      const updatedHistory = [...images, ...history].slice(0, 100);

      const historyForStorage = updatedHistory.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
      }));

      localStorage.setItem("aiImageGeneratorHistory", JSON.stringify(historyForStorage));
    } catch (error) {
      console.error("Error saving to history:", error);
    }
  }

  clearHistory() {
    localStorage.removeItem("aiImageGeneratorHistory");
  }
}

export const imageGenerationService = new ImageGenerationService();