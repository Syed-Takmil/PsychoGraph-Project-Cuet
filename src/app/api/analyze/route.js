import { GoogleGenAI, Type } from '@google/genai'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(req) {
  try {
    const body = await req.json()
    const { activityResults, totalActivities, userId, totalSessions, avgCognitiveIndex, recentSessions } = body

    let activitySection = ''
    if (activityResults) {
      activitySection = `\n\nThe user completed ${totalActivities || Object.keys(activityResults).length} cognitive activities with these results:\n${JSON.stringify(activityResults, null, 2)}`
    }

    const prompt = `
      You are an expert cognitive & psychological analysis assistant for the PsychoGraph platform.
      Analyze the user's metrics below:${activitySection}
      
      ${totalSessions !== undefined ? `\nHistorical data: ${totalSessions} sessions, avg cognitive index: ${avgCognitiveIndex}/100. Last sessions: ${JSON.stringify(recentSessions)}` : ''}

      Based on ALL available metrics:
      1. Predict their current mental state / mood in a single sentence.
      2. Calculate a Composite Cognitive Index (0 to 100) based on activity performance.
      3. Write a 2-3 sentence summary of their overall cognitive and emotional profile.
      4. Give 3 actionable, highly specific wellness suggestions tailored to their activity results (hydration, focus techniques, rest, emotional regulation).
    `

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
