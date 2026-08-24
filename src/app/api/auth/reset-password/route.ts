import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json()
    
    console.log("Reset password request for token:", token)
    console.log("New password:", newPassword)
    
    // Demo mode - always success
    return NextResponse.json({ 
      success: true, 
      message: 'Password reset successfully! (Demo mode)'
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    )
  }
}