import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    console.log("Forgot password request for:", email)
    
    // Simple demo link
    const resetLink = `http://localhost:3000/reset-password?token=demo-token-${Date.now()}`
    
    console.log("Reset link:", resetLink)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Reset link sent! Check terminal for link.',
      devLink: resetLink
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}