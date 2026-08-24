import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { topic } = await request.json()
    
    if (!topic) {
      return NextResponse.json({ success: false, error: "Missing topic" }, { status: 400 })
    }

    const tags = [
      topic,
      topic.replace(/\s/g, ''),
      `${topic}Tutorial`,
      `${topic}Guide`,
      'YouTube',
      'ContentCreation',
      'VideoEditing'
    ]

    return NextResponse.json({ success: true, tags })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate tags" }, { status: 500 })
  }
}