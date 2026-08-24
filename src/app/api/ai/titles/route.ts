import { NextResponse } from 'next/server'
import { generateTitles } from '@/services/ai/ai.service'

export async function POST(request: Request) {
  try {
    const { topic } = await request.json()
    
    if (!topic) {
      return NextResponse.json({ success: false, error: "Missing topic" }, { status: 400 })
    }

    const titles = await generateTitles(topic)
    return NextResponse.json({ success: true, titles })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate titles" }, { status: 500 })
  }
}