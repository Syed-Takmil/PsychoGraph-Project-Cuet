import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req) {
  try {
    const { testName, gameInputs } = await req.json()

    // Select the model (gemini-1.5-flash is fast and cost-effective)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
      You are an expert psychometrics and emotional health AI analyzer.
      Analyze the following results from a user's test named "${testName}":
      
      ${JSON.stringify(gameInputs, null, 2)}
      
      Provide a concise 2-3 sentence psychological insight based on these specific choices and scores.
      Be encouraging, objective, and easy to understand.
    `

    const result = await model.generateContent(prompt)
    const analysisText = result.response.text()

    return NextResponse.json({ success: true, insight: analysisText })
  } catch (error) {
    console.error('Gemini API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze results.' },
      { status: 500 }
    )
  }
}