import { NextResponse } from 'next/server'
import { generateSpeech } from '@/services/voice/voice.service'

export async function POST(request: Request) {
  try {
    const { text } = await request.json()
    
    if (!text) {
      return NextResponse.json({ success: false, error: "Missing text" }, { status: 400 })
    }

    const audioUrl = await generateSpeech(text)
    
    if (audioUrl) {
      return NextResponse.json({ success: true, audioUrl })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: "Failed to generate voice. Check ElevenLabs API key." 
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Voice generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate voice" }, { status: 500 })
  }
}