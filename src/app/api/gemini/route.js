import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(req) {
  try {
    const { testName, gameInputs } = await req.json()

    const prompt = `
      You are an expert psychometrics and emotional health AI analyzer.
      Analyze the following results from a user's test named "${testName}":
      
      ${JSON.stringify(gameInputs, null, 2)}
      
      Provide a concise 2-3 sentence psychological insight based on these specific choices and scores.
      Be encouraging, objective, and easy to understand.
    `

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    const insight = response.text

    return NextResponse.json({ success: true, insight })
  } catch (error) {
    console.error('Gemini API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze results.' },
      { status: 500 }
    )
  }
}
