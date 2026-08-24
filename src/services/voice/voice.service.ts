import { ElevenLabsClient } from 'elevenlabs'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const client = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY })

export async function generateSpeech(text: string) {
  try {
    const audio = await client.generate({
      text: text,
      voice: "21m00Tcm4TlvDq8ikWAM", // Rachel voice
      model_id: "eleven_monolingual_v1",
    })
    
    // Convert to base64 for browser
    const chunks: Uint8Array[] = []
    for await (const chunk of audio) {
      chunks.push(chunk)
    }
    const audioData = new Blob(chunks, { type: 'audio/mpeg' })
    const audioUrl = URL.createObjectURL(audioData)
    return audioUrl
  } catch (error) {
    console.error("Error generating speech:", error)
    return null
  }
}