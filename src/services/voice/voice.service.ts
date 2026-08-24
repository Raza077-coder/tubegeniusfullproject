// Voice Service

export async function generateSpeech(text: string) {
  console.log("Generating speech for:", text)
  // Mock audio URL
  return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
}

export async function cloneVoice(audioFile: File, voiceName: string) {
  console.log("Cloning voice:", voiceName)
  // Mock voice ID
  return "mock-voice-id-123"
}

export async function getVoices() {
  return [
    { id: "1", name: "Rachel" },
    { id: "2", name: "Adam" },
  ]
}