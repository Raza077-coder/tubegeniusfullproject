🎬 TubeGenius
AI-Powered YouTube Content Creation Platform
📖 Overview
TubeGenius ek complete AI-powered platform hai jo YouTube creators ko unke content creation mein help karta hai. Ye platform AI ka use karke video scripts, titles, voiceovers generate karta hai aur channel analytics provide karta hai.

✨ Features
1. Authentication System
Email/Password Login

Forgot & Reset Password

Session Management

Protected Routes

2. Dashboard
Real-time YouTube Stats

Interactive Charts (Line, Bar, Donut)

Top Performing Videos List

Export Data (CSV & PDF)

Change Channel Feature

3. AI Tools
Script Generator (Topic to Script)

Titles Generator (10+ Titles)

Description Generator

Tags Generator

4. Video Upload
File Selection & Validation

Video Preview

Title, Description, Tags Input

Category & Privacy Options

5. Voice Cloning
Voice Recording (Mic Access)

Audio File Upload

Text-to-Speech

Voice Samples Playback

6. Settings & Profile
Profile Management

Notification Preferences

Account Settings

Password Change

7. UI/UX
Dark/Light Theme Toggle

Responsive Design

Loading Skeletons

Toast Notifications

🛠️ Tech Stack
Category	Technology
Framework	Next.js 14
Language	TypeScript
Database	SQLite + Prisma
Authentication	NextAuth
Charts	Chart.js
APIs	YouTube, OpenAI, ElevenLabs, Stripe
Styling	CSS3
🏗️ System Architecture
text
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                         │
│  Home │ Login │ Dashboard │ AI Tools │ Upload │ Settings   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│               NEXT.JS API ROUTES (Backend)                  │
│  /api/auth │ /api/login │ /api/ai/* │ /api/youtube/*       │
│  /api/voice/* │ /api/payment/*                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                           │
│                    Prisma ORM + SQLite                      │
│              User │ Account │ Session                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  EXTERNAL APIs                              │
│  YouTube │ OpenAI │ ElevenLabs │ Stripe                    │
└─────────────────────────────────────────────────────────────┘
📥 Installation
bash
# 1. Clone repository
git clone https://github.com/Raza077-coder/tubegeniusfullproject.git
cd tubegeniusfullproject

# 2. Install dependencies
npm install

# 3. Environment setup
cp .env.example .env
# Edit .env with your API keys

# 4. Database setup
npx prisma generate
npx prisma db push

# 5. Run development server
npm run dev

# 6. Open browser
# http://localhost:3000
🔐 Environment Variables
env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# APIs
YOUTUBE_API_KEY="AIzaSy..."
OPENAI_API_KEY="sk-..."
ELEVENLABS_API_KEY="sk_..."
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
📁 Project Structure
text
tubegenius/
├── src/
│   ├── app/
│   │   ├── api/              # Backend APIs
│   │   ├── dashboard/        # Dashboard page
│   │   ├── ai-tools/         # AI Tools page
│   │   ├── upload/           # Upload page
│   │   ├── voice-cloning/    # Voice cloning page
│   │   ├── settings/         # Settings page
│   │   ├── profile/          # Profile page
│   │   ├── about/            # About page
│   │   ├── pricing/          # Pricing page
│   │   ├── payment/          # Payment page
│   │   ├── login/            # Login page
│   │   ├── forgot-password/  # Forgot password
│   │   ├── reset-password/   # Reset password
│   │   ├── layout.tsx        # Main layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── Navbar.tsx        # Navigation bar
│   │   └── LoadingSkeleton.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx  # Dark/Light theme
│   │   └── ToastContext.tsx  # Notifications
│   ├── services/
│   │   ├── youtube/          # YouTube service
│   │   ├── ai/               # AI service
│   │   ├── voice/            # Voice service
│   │   └── export/           # Export service
│   ├── lib/
│   │   ├── db.ts             # Database connection
│   │   └── logger.ts         # Logging
│   └── utils/
│       ├── helpers.ts
│       └── validation.ts
├── prisma/
│   └── schema.prisma         # Database schema
├── .env
├── package.json
└── README.md
📄 Pages & Routes
Page	Route	Description
Home	/	Landing page
Login	/login	User login
Dashboard	/dashboard	Channel analytics
AI Tools	/ai-tools	Script & title generator
Upload	/upload	Video upload
Voice Cloning	/voice-cloning	Voice cloning studio
Settings	/settings	User settings
Profile	/profile	User profile
About	/about	About page
Pricing	/pricing	Pricing plans
Payment	/payment	Payment checkout
🔌 API Endpoints
Endpoint	Method	Description
/api/auth/[...nextauth]	POST	Authentication
/api/login	POST	User login
/api/auth/forgot-password	POST	Send reset link
/api/auth/reset-password	POST	Reset password
/api/youtube/channel	GET	Fetch channel data
/api/youtube/videos	GET	Fetch channel videos
/api/ai/script	POST	Generate script
/api/ai/titles	POST	Generate titles
/api/voice/generate	POST	Generate voice
/api/voice/clone	POST	Clone voice
/api/payment/create-checkout	POST	Create checkout
🗄️ Database Schema
prisma
model User {
  id             String   @id @default(cuid())
  email          String   @unique
  name           String?
  password       String?
  resetToken     String?  @unique
  resetTokenExpiry DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  accounts       Account[]
  sessions       Session[]
}

model Account {
  id                String @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
📊 Features Details
Dashboard
6 Stats Cards (Videos, Channels, Subscribers, Views, Watch Time, Engagement)

Line Chart (Views & Subscribers growth)

Bar Chart (Video performance)

Donut Chart (Traffic sources)

Top Videos List

AI Tools
Topic input field

Script Generator (Topic → Full Script)

Titles Generator (10+ Titles)

Tab switching (Script/Titles)

Video Upload
File selection & validation (video/*, max 100MB)

Video preview

Form validation (title required, 5-100 chars)

Category & privacy options

Reset button

Voice Cloning
Voice recording (mic access)

Audio file upload (MP3, WAV, M4A)

Text-to-speech

Voice samples

🚀 Deployment
Vercel (Recommended)
bash
# 1. Push to GitHub
git add .
git commit -m "TubeGenius project"
git push origin main

# 2. Import on Vercel
# https://vercel.com/new

# 3. Add environment variables
# 4. Deploy
Build Command
bash
npm run build
🔮 Future Scope
Feature	Status
YouTube API	✅ Complete
AI Script Generator	✅ Complete
Voice Cloning	✅ Complete
Payment System	📅 Planned
Mobile App	📅 Planned
Chrome Extension	📅 Planned
Multi-language Support	📅 Planned
📸 Screenshots
Home Page
text
🎬 TubeGenius
AI YouTube Content Creator
Create viral YouTube videos with the power of AI.
[Go to Dashboard] [View Pricing]
Dashboard
text
Welcome back, User! 👋
📹 247  📺 4  👥 125K  👁️ 2.45M
[Line Chart] [Bar Chart] [Donut Chart]
AI Tools
text
What's your video about?
[Input Field]
📝 Generate Script  🎯 Generate Titles
👤 Author
Raza077-coder

https://img.shields.io/badge/GitHub-Raza077--coder-black?style=flat-square&logo=github

📄 License
MIT License - Free to use and modify.

🙏 Acknowledgments
Next.js

Prisma

Chart.js

OpenAI

ElevenLabs

Stripe

GitHub: Raza077-coder


Made with ❤️ by Raza077-coder
