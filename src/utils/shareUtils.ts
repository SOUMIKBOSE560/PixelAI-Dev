
import { toast } from "sonner";
import { GeneratedImage } from "@/services/ImageGenerationService";

export async function shareImage(image: GeneratedImage) {
  try {
    // Check if Web Share API is available
    if (navigator.share) {
      // Try to fetch the image as a blob
      const response = await fetch(image.url);
      const blob = await response.blob();
      const file = new File([blob], `ai-image-${image.id.slice(0, 8)}.jpg`, { type: "image/jpeg" });
      
      await navigator.share({
        title: "AI Generated Image",
        text: `Check out this AI image created with prompt: "${image.prompt}"`,
        files: [file],
      });
      
      toast.success("Image shared successfully");
      return true;
    } else if (navigator.clipboard) {
      // Fallback to copying the image URL
      await navigator.clipboard.writeText(image.url);
      toast.success("Image URL copied to clipboard");
      return true;
    } else {
      throw new Error("Sharing not supported on this device");
    }
  } catch (error) {
    // console.error("Error sharing image:", error);
    toast.error("Failed to share image");
    return false;
  }
}

export function shareToTwitter(image: GeneratedImage) {
  const text = `Check out this AI image created with prompt: "${image.prompt}"`;
  const url = encodeURIComponent(image.url);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
  window.open(tweetUrl, "_blank");
  toast.success("Opening Twitter to share");
}

export function shareToFacebook(image: GeneratedImage) {
  const url = encodeURIComponent(image.url);
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(fbUrl, "_blank");
  toast.success("Opening Facebook to share");
}

export function shareToLinkedin(image: GeneratedImage) {
  const url = encodeURIComponent(image.url);
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  window.open(linkedinUrl, "_blank");
  toast.success("Opening LinkedIn to share");
}

export function copyImageLink(image: GeneratedImage) {
  navigator.clipboard.writeText(image.url);
  toast.success("Image URL copied to clipboard");
}
