import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { topic, title } = await request.json()
    
    if (!topic) {
      return NextResponse.json({ success: false, error: "Missing topic" }, { status: 400 })
    }

    const description = `📝 Video Description

Title: ${title || topic}

In this video, we explore everything about ${topic}.

🔍 What you'll learn:
- Key concepts of ${topic}
- Practical tips and tricks
- Common mistakes to avoid

⏰ Timestamps:
0:00 - Introduction
1:00 - What is ${topic}?
3:00 - Key Concepts
5:00 - Tips & Tricks
7:00 - Common Mistakes
9:00 - Conclusion

🔗 Resources:
- Link 1
- Link 2

📱 Follow us:
- Instagram: @tubegenius
- Twitter: @tubegenius

#${topic.replace(/\s/g, '')} #Tutorial #YouTube #ContentCreation`

    return NextResponse.json({ success: true, description })
  } catch (error) {
    console.error("Description generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate description" }, { status: 500 })
  }
}