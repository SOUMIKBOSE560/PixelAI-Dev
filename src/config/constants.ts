import { Model } from "@/components/ModelSelector";
import { Size } from "@/components/SizeSelector";

// AI Model options
export const MODELS: Model[] = [
  {
    id: "imagen-3",
    name: "Imagen 3",
    description:
      "Imagen 3 is a text-to-image AI model developed by Google. It is designed to generate high-quality images from textual descriptions while incorporating safety filters to limit the creation of harmful content.",
  },
  {
    id: "dalle3",
    name: "DALL-E 3",
    description:
      "DALL-E 3 is OpenAI's latest text-to-image model. It is engineered to produce detailed and accurate images based on textual prompts, with improvements in composition and realism compared to earlier versions.",
  },
  {
    id: "dalle2",
    name: "DALL-E 2",
    description:
      "DALL-E 2 is an earlier text-to-image model from OpenAI that generates creative images from user input. It is known for balancing creative interpretation with fidelity to the prompt.",
  },
  {
    id: "flux",
    name: "Flux Schnell",
    description:
      "Flux Schnell is optimized for speedy image generation. Its design prioritizes efficiency, making it suitable for scenarios where real-time processing is essential.",
  },
  {
    id: "flux-pro",
    name: "Flux Pro",
    description:
      "Flux Pro builds on the efficiency of Flux Schnell by integrating additional features for enhanced image generation and processing, targeting professional use cases.",
  },
  {
    id: "flux-pro-ultra",
    name: "Flux Pro Ultra",
    description:
      "Flux Pro Ultra extends the capabilities of the Flux line with advanced features for image generation and processing, designed to meet the demands of professional applications.",
  },
  {
    id: "stablediffusion",
    name: "Stable Diffusion-XL",
    description:
      "Stable Diffusion-XL is an enhanced version of the Stable Diffusion model, optimized for high-resolution image synthesis. It emphasizes improved detail and consistency for professional creative workflows.",
  }
];

// Size options
export const SIZES: Size[] = [
  { id: "size1", name: "Square", dimensions: "1024×1024" },
  { id: "size2", name: "Portrait", dimensions: "896×1152" },
  { id: "size3", name: "Landscape", dimensions: "1152×896" },
  { id: "size4", name: "Widescreen", dimensions: "1344×768" },
];
