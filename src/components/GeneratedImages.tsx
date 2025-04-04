
import { Button } from "./ui/button";
import { ImageCard } from "./ImageCard";
import { GeneratedImage } from "@/services/ImageGenerationService";

interface GeneratedImagesProps {
  images: GeneratedImage[];
  showCreateMore?: boolean;
  onCreateMore?: () => void;
  title?: string;
}

export function GeneratedImages({ 
  images, 
  showCreateMore = false, 
  onCreateMore,
  title = "Generated Images"
}: GeneratedImagesProps) {
  if (images.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showCreateMore && onCreateMore && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onCreateMore}
          >
            Create More
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
