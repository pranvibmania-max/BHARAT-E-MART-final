import { GoogleGenerativeAI } from "@google/generative-ai";

const getClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("Gemini API Key is missing");
    return null;
  }

  return new GoogleGenerativeAI(apiKey);
};

export const generateProductDescription = async (
  productName: string,
  category: string
): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "Gemini API key missing. Please configure it.";
  }

  try {
    const model = client.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      `You are an expert e-commerce copywriter.
Write a compelling product description for:
Product: ${productName}
Category: ${category}`
    );

    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    return "Failed to generate description";
  }
};
