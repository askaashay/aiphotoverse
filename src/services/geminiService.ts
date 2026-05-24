import { GoogleGenAI } from "@google/genai";
import { getApiKey } from "../lib/apiKeyStorage";

export async function generateCollage(base64Image: string, styles: { name: string; prompt: string }[]): Promise<string> {
  // Priority: 1. Storage (user entered) 2. Platform Key 3. Environment Fallback
  const storedKey = getApiKey();
  const apiKey = storedKey || (process.env as any).API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("No Gemini API key found. Please enter one in the setup screen.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const stylesList = styles.map((s, i) => `${i + 1}. ${s.name}: ${s.prompt}`).join("\n");
  const collagePrompt = `
Generate a 1024x1024 high-resolution 2x2 grid collage of four distinct images based on the provided reference photo.

IDENTITY LOCK: Preserve the exact face from the reference image — same facial bone structure, same eye shape and color, same nose, same lip shape, same jawline, same skin tone, same hair, same apparent age. This is the same individual; do not stylize, idealize, beautify, or age the face. Even in stylized modes like "Anime" or "Character Art", you MUST transpose the subject's specific personal features into that art style. Identity is more important than genre cliches.

QUALITY DIRECTIVES:
- PHOTOREALISM ENFORCEMENT: Unless a style is explicitly an illustration (like "Anime", "Pixar Animation", "Fine Art", or "Pop Art"), the resulting image MUST look like a professional, high-end photograph taken in the real world. Treat the subject as if they were physically present in that world dimension and photographed there.
- REALISM: Natural skin texture with visible pores, realistic color grading, and subtle filmic contrast.
- NEGATIVE: Avoid plastic skin, beauty-filters, age regression/progression, generic AI faces, and oversaturation.

COMPOSITION & ENVIRONMENT:
- CINEMATIC VARIETY: Avoid "passport photo" syndrome. Vary the camera distance and composition (e.g., tight close-ups, medium shots, artistic angles) to create a professional, "cool" aesthetic.
- ENVIRONMENT OVERHAUL: Completely ignore the original background. The subject must be integrated into 100% new environments as described in the style prompts below. No trace of the original room or setting should remain.

STYLE ASSIGNMENTS:
- Top-Left: ${styles[0]?.name || "Original Style"} - ${styles[0]?.prompt || ""}
- Top-Right: ${styles[1]?.name || styles[0]?.name || "Original Style"} - ${styles[1]?.prompt || ""}
- Bottom-Left: ${styles[2]?.name || styles[0]?.name || "Original Style"} - ${styles[2]?.prompt || ""}
- Bottom-Right: ${styles[3]?.name || styles[0]?.name || "Original Style"} - ${styles[3]?.prompt || ""}

Return only the final 2x2 collage image with clean, sharp grid lines.
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(",")[1],
              mimeType: "image/jpeg",
            },
          },
          {
            text: collagePrompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data returned from Gemini");
  } catch (error) {
    console.error("Gemini Collage Error:", error);
    throw error;
  }
}
