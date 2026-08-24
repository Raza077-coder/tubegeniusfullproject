import { NextResponse } from 'next/server'
import { cloneVoice } from '@/services/voice/voice.service'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    const voiceName = formData.get('name') as string || 'Cloned Voice'
    
    if (!audioFile) {
      return NextResponse.json({ success: false, error: "Missing audio file" }, { status: 400 })
    }
    
    const voiceId = await cloneVoice(audioFile, voiceName)
    
    if (voiceId) {
      return NextResponse.json({ success: true, voiceId })
    } else {
      return NextResponse.json({ success: false, error: "Failed to clone voice" }, { status: 500 })
    }
  } catch (error) {
    console.error("Voice cloning error:", error)
    return NextResponse.json({ success: false, error: "Failed to clone voice" }, { status: 500 })
  }
}