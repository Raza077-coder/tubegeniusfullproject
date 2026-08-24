import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Generate Script
export async function generateScript(topic: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional YouTube script writer. Create engaging, viral video scripts.'
        },
        {
          role: 'user',
          content: `Write a 5-minute YouTube video script about: ${topic}. Include hook, main content, and outro.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })
    return response.choices[0].message.content || ''
  } catch (error) {
    console.error("OpenAI Error:", error)
    return `⚠️ Failed to generate script. Please try again.`
  }
}

// Generate Titles
export async function generateTitles(topic: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a YouTube SEO expert. Create viral, high-CTR video titles.'
        },
        {
          role: 'user',
          content: `Generate 10 clickbait YouTube titles about: ${topic}. One per line, numbered.`
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
    })
    
    const content = response.choices[0].message.content || ''
    return content.split('\n')
      .filter(line => line.match(/^\d+\./))
      .map(line => line.replace(/^\d+\.\s*/, ''))
  } catch (error) {
    console.error("OpenAI Error:", error)
    return ['⚠️ Failed to generate titles. Please try again.']
  }
}