import { NextResponse } from 'next/server'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const BASE_URL = "https://www.googleapis.com/youtube/v3"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const channelId = searchParams.get('channelId')
  const maxResults = parseInt(searchParams.get('maxResults') || '10')
  
  if (!channelId) {
    return NextResponse.json({ success: false, error: "Missing channelId" }, { status: 400 })
  }

  try {
    // Get uploads playlist
    const channelRes = await fetch(
      `${BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
    )
    const channelData = await channelRes.json()
    
    if (!channelData.items || channelData.items.length === 0) {
      return NextResponse.json({ success: false, error: "Channel not found" }, { status: 404 })
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads
    
    // Get videos
    const videosRes = await fetch(
      `${BASE_URL}/playlistItems?part=snippet,contentDetails&maxResults=${maxResults}&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
    )
    const videosData = await videosRes.json()
    
    if (!videosData.items) {
      return NextResponse.json({ success: true, videos: [] })
    }
    
    const videos = videosData.items.map((item: any) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0
    }))
    
    return NextResponse.json({ success: true, videos })
  } catch (error) {
    console.error("YouTube API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch videos" }, { status: 500 })
  }
}