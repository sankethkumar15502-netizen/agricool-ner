import { GoogleGenAI, Type } from '@google/genai';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    optimalTempMin: { type: Type.NUMBER },
    optimalTempMax: { type: Type.NUMBER },
    optimalHumidityMin: { type: Type.NUMBER },
    optimalHumidityMax: { type: Type.NUMBER },
    predictedShelfLifeDays: { type: Type.INTEGER },
    spoilageRisk: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["optimalTempMin", "optimalTempMax", "optimalHumidityMin", "optimalHumidityMax", "predictedShelfLifeDays", "spoilageRisk", "recommendations"]
};

export async function getAiAdvisory(params: {
  vegetableName: string;
  quantityKg: number;
  harvestDate: string;
  currentTemp: number;
  currentHumidity: number;
  batterySoc: number;
}) {
  const prompt = `
Analyze the following vegetable batch and current cold storage unit environment:
- Vegetable: ${params.vegetableName} (${params.quantityKg} kg)
- Harvest Date: ${params.harvestDate}
- Current Storage Temp: ${params.currentTemp}°C
- Current Humidity: ${params.currentHumidity}%
- Available Solar Battery SoC: ${params.batterySoc}%

Determine the optimal temperature and humidity range, predict the remaining safe shelf-life in days, evaluate current spoilage risk (Low/Medium/High), and provide 3 actionable operational recommendations for the cold storage operator.
You are an expert Agricultural Systems Architect, Post-Harvest Technologist, and Green Energy Engineer specializing in off-grid solar cold storage operations in the challenging topography of North East India (NER). Your objective is to maximize shelf-life for perishable high-value crops (such as King Chilli, tree tomatoes, bamboo shoots, and exotic vegetables), minimize energy waste under variable solar/battery constraints, and provide actionable, localized market routing advice. Always ground your responses in agricultural science, thermodynamic principles, and real-world micro-grid limitations. Return responses strictly in valid JSON matching the requested schema.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });
    
    if (response.text) {
        return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw error;
  }
}
