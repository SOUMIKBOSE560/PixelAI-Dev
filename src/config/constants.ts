
import { Model } from "@/components/ModelSelector";
import { Size } from "@/components/SizeSelector";

// AI Model options
export const MODELS: Model[] = [
  {
    id: "imagen-3",
    name: "Imagen 3",
    description:
      "Imagen 3 is a powerful AI model from Google that excels in generating high-quality images from textual prompts. It's known for its ability to produce detailed and realistic images, making it a popular choice for a variety of creative applications but it employs safety filters to prevent the generation of harmful content.",
  },
  {
    id: "dalle3",
    name: "DALL-E 3",
    description:
      "DALL-E 3 is OpenAI's latest iteration in the DALL-E series, renowned for generating exceptionally detailed and nuanced images from textual prompts. It significantly improves on composition, realism, and the ability to interpret complex requests."
  },
  {
    id: "dalle2",
    name: "DALL-E 2",
    description:
      "DALL-E 2 is a well-established model from OpenAI that generates creative images from text. It strikes a balance between artistic expression and fidelity, offering versatility for a wide range of creative applications."
  },
  {
    id: "flux",
    name: "Flux Schnell",
    description:
      "Flux Schnell is engineered for rapid image generation without compromising too much on quality. Its focus is on speed and efficiency, making it ideal for applications that require real-time image processing."
  },
  {
    id: "stablediffusion",
    name: "Stable Diffusion-XL",
    description:
      "Stable Diffusion-XL is an enhanced version of the popular Stable Diffusion model, optimized for high-resolution image synthesis. It delivers improved detail, consistency, and overall image quality, catering to professional-grade creative workflows."
  }
];


// Size options
export const SIZES: Size[] = [
  { id: "size1", name: "Square", dimensions: "1024×1024" },
  { id: "size2", name: "Portrait", dimensions: "896×1152" },
  { id: "size3", name: "Landscape", dimensions: "1152×896" },
  { id: "size4", name: "Widescreen", dimensions: "1344×768" },
];
