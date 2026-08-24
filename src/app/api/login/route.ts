import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  return NextResponse.json({ 
    success: true, 
    user: { 
      id: "1", 
      email: body.email, 
      name: "User" 
    }
  })
}