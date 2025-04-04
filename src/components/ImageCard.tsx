
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { GeneratedImage } from "@/services/ImageGenerationService";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShareMenu } from "@/components/ShareMenu";

interface ImageCardProps {
  image: GeneratedImage;
  className?: string;
}

export function ImageCard({ image, className }: ImageCardProps) {
  const [loading, setLoading] = useState(true);

  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-image-${image.id.slice(0, 8)}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      window.open(image.url, '_blank');
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 animate-pulse">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-64 object-cover transition-all duration-500"
          onLoad={() => setLoading(false)}
          style={{ opacity: loading ? 0.5 : 1 }}
        />
      </CardContent>
      <CardFooter className="p-3 flex items-center justify-between gap-2 text-xs">
        <div className="overflow-hidden">
          <p className="font-medium truncate">{image.prompt}</p>
          <p className="text-muted-foreground">
            {new Date(image.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <ShareMenu image={image} />
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={handleDownload}
            title="Download image"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
