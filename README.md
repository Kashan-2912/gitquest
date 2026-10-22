# 🐉 GitQuest

**Summon the Creature Behind Your Code**

![CI](https://github.com/Kashan-2912/gitquest/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

**[Live Demo](https://gitquest.is-a.software)** · **[Roadmap](ROADMAP.md)** · **[Contributing](CONTRIBUTING.md)**

GitQuest transforms your GitHub profile into a unique fantasy creature based on your contribution history. Using AI-powered generation, your coding journey comes to life as a D&D-inspired monster with visual power that reflects your contributions.

![GitQuest Banner](./public/github-creature-logo.png)

## ✨ Features

- **🎨 AI-Powered Creature Generation**: Leverages Google's Gemini AI to create unique fantasy creatures based on GitHub contribution data
- **📊 Contribution-Based Tiers**: Creatures scale from CR 0 (harmless vermin) to CR 20+ (legendary beings) based on contribution count
- **🏆 Leaderboard**: Compare your creatures with other developers
- **👤 User Profiles**: View individual developer profiles and their summoned creatures
- **🎲 Summoning System**: Discover what creature embodies your coding spirit
- **🎭 Beautiful 3D Effects**: Interactive cards with liquid chrome, plasma, and light pillar effects
- **🌓 Dark/Light Mode**: Full theme support with next-themes
- **📛 GitHub README Widget**: Embeddable SVG widget to showcase your creature on your GitHub profile

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Neon PostgreSQL with [Drizzle ORM](https://orm.drizzle.team)
- **AI**: Google Gemini 2.5 Flash Image
- **Storage**: Vercel Blob for creature images
- **3D Graphics**: Three.js & OGL
- **UI Components**: Custom components built with Base UI primitives
- **Forms**: React Hook Form with Zod validation
- **State Management**: nuqs for URL state

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- A GitHub account
- API keys for:
  - Google Gemini AI (`GEMINI_API`)
  - Neon PostgreSQL (`DATABASE_URL`)
  - Vercel Blob Storage (`BLOB_READ_WRITE_TOKEN`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gitquest.git
cd gitquest
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
GEMINI_API=your_gemini_api_key
DATABASE_URL=your_neon_database_url
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

4. Set up the database:

```bash
npx drizzle-kit push
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
gitquest/
├── app/                      # Next.js app directory
│   ├── [username]/          # Dynamic user profile pages
│   ├── leaderboard/         # Leaderboard page
│   ├── summon/              # Creature summoning page
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── forms/               # GitHub form components
│   ├── ui/                  # Reusable UI components
│   ├── creature-card.tsx    # Creature display card
│   ├── creatures-showcase.tsx
│   └── ...                  # 3D effects and visual components
├── db/                      # Database configuration
│   ├── schema.ts            # Drizzle ORM schema
│   └── drizzle.ts           # Database client
├── server/                  # Server actions
│   ├── ai.ts                # AI generation logic
│   └── creatures.ts         # Creature data operations
└── lib/                     # Utility functions
```

## 🎮 How It Works

1. **Enter a GitHub username**: Submit any GitHub profile URL or username
2. **Fetch Contributions**: The app queries the GitHub API for contribution count
3. **AI Generation**: Google Gemini generates a unique D&D-inspired creature based on:
   - Contribution count (determines Challenge Rating)
   - Randomized selection from Monster Manual creatures
   - Unique visual styling and effects
4. **Storage**: Creature image is stored in Vercel Blob and metadata in Neon database
5. **Display**: View your creature with beautiful 3D effects and share with others

## 🎯 Contribution Tiers

- **0-49 contributions**: CR 0 (Harmless/Vermin-tier)
- **50-150**: CR 1/8–1/4 (Minor threats)
- **151-300**: CR 1/2–1 (Novice adventurer)
- **301-750**: CR 2–4 (Competent)
- **751-1500**: CR 5–7 (Skilled)
- **1501-2500**: CR 8–10 (Veteran)
- **2501-4000**: CR 11–13 (Elite)
- **4001-5000**: CR 14–17 (Legendary)
- **5001+**: CR 18–30 (Mythic)

## 📛 GitHub README Widget

Showcase your GitQuest creature on your GitHub profile! Add this to your README:

```markdown
[![GitQuest Creature](https://gitquest.is-a.software/api/widget/YOUR_USERNAME)](https://gitquest.is-a.software/YOUR_USERNAME)
```

Replace `YOUR_USERNAME` with your GitHub username. The widget automatically displays:
- Your creature's portrait
- Power tier and Challenge Rating
- Contribution count
- Dynamic color theming based on tier

Visit [/widget](https://gitquest.is-a.software/widget) to generate your personalized embed code.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📜 License

This project is open source and available under the MIT License.

## 🔗 Links

- [Live Demo](https://gitquest.is-a.software/) <!-- Add your deployed URL here -->
- [GitHub Repository](https://github.com/Kashan-2912/gitquest) <!-- Add your repo URL here -->

## 🙏 Acknowledgments

- D&D 5e Monster Manual for creature inspiration
- Next.js team for the amazing framework
- Google for Gemini AI
- Vercel for hosting and blob storage
- Neon for serverless PostgreSQL

---

**Built with ❤️ for the developer community**

## Star History

<a href="https://www.star-history.com/#Kashan-2912/gitquest&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Kashan-2912/gitquest&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Kashan-2912/gitquest&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Kashan-2912/gitquest&type=date&legend=top-left" />
 </picture>
</a>
