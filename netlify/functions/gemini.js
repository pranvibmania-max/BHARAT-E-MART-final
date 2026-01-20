import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handler(event) {
  try {
    const { productName, category } = JSON.parse(event.body || "{}");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { statusCode: 400, body: JSON.stringify({ error: "GEMINI_API_KEY missing" }) };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert e-commerce copywriter.
Write a compelling product description for:
Product: ${productName}
Category: ${category}`;

        const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ description: text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Something went wrong" }),
    };
  }
}
