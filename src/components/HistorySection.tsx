// components/HistorySection.tsx
import { useState } from "react";
import { Button } from "./ui/button";
import { ImageCard } from "./ImageCard";
import { GeneratedImage, imageGenerationService } from "@/services/ImageGenerationService";
import { History } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ConfirmationDialog } from "./ui/ConfirmationDialog";


interface HistorySectionProps {
  historyImages: GeneratedImage[];
  onHistoryUpdate: (images: GeneratedImage[]) => void;
}

export function HistorySection({ historyImages, onHistoryUpdate }: HistorySectionProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClearHistory = async () => {
    imageGenerationService.clearHistory();
    onHistoryUpdate([]);
    toast.success("History cleared");
    imageGenerationService.clearHistoryFromDatabase();
  };

  return (
    <div className="space-y-4">
      <ConfirmationDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Clear History"
        description="Are you sure you want to clear your image history? This action cannot be undone."
        confirmText="Clear History"
        variant="destructive"
        onConfirm={handleClearHistory}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Image History</h2>
        {historyImages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsConfirmOpen(true)}
          >
            Clear History
          </Button>
        )}
      </div>

      {historyImages.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <History className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No image history</h3>
          <p className="text-muted-foreground">
            Generate some images to see them here
          </p>
        </div>
      ) : (
        <div className={cn(
          "grid gap-6",
          historyImages.length > 6
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        )}>
          {historyImages.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}