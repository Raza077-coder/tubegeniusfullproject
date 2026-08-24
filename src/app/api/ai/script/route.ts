import { NextResponse } from 'next/server'
import { generateScript } from '@/services/ai/ai.service'

export async function POST(request: Request) {
  try {
    const { topic } = await request.json()
    
    if (!topic) {
      return NextResponse.json({ success: false, error: "Missing topic" }, { status: 400 })
    }

    const script = await generateScript(topic)
    return NextResponse.json({ success: true, script })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate script" }, { status: 500 })
  }
}