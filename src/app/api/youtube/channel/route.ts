import { NextResponse } from 'next/server'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const BASE_URL = "https://www.googleapis.com/youtube/v3"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const handle = searchParams.get('handle')
  
  if (!handle) {
    return NextResponse.json({ success: false, error: "Missing handle" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${BASE_URL}/channels?part=snippet,statistics&forHandle=${handle.replace('@', '')}&key=${YOUTUBE_API_KEY}`
    )
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      const channel = data.items[0]
      return NextResponse.json({ 
        success: true, 
        channel: {
          id: channel.id,
          title: channel.snippet.title,
          description: channel.snippet.description,
          subscriberCount: parseInt(channel.statistics.subscriberCount),
          videoCount: parseInt(channel.statistics.videoCount),
          viewCount: parseInt(channel.statistics.viewCount),
          thumbnailUrl: channel.snippet.thumbnails.default.url
        }
      })
    } else {
      return NextResponse.json({ success: false, error: "Channel not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("YouTube API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch channel" }, { status: 500 })
  }
}