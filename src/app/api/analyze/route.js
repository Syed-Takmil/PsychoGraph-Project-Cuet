// File: app/api/analyze/route.js
import { GoogleGenAI, Type } from '@google/genai'
import { NextResponse } from 'next/server'

// Initialize Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(req) {
  try {
    const userSessionData = await req.json()

    const prompt = `
      You are an expert cognitive & psychological analysis assistant for the PsychoGraph platform.
      Analyze the user's latest session metrics below:
      ${JSON.stringify(userSessionData, null, 2)}

      Based on these metrics:
      1. Predict their current mental state / mood.
      2. Calculate a Composite Cognitive Index (0 to 100).
      3. Give 3 actionable, highly specific wellness suggestions (hydration, focus techniques, rest).
    `

    // Request structured JSON using gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedMood: { type: Type.STRING },
            cognitiveIndex: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['predictedMood', 'cognitiveIndex', 'summary', 'suggestions']
        }
      }
    })

    const analysis = JSON.parse(response.text)
    return NextResponse.json({ success: true, data: analysis })

  } catch (error) {
    console.error('Gemini Analysis Error:', error)
    return NextResponse.json({ error: 'Failed to analyze cognitive data' }, { status: 500 })
  }
}