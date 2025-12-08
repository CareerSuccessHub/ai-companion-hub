# AI Daily Companion Hub

A personalized AI companion application with three unique switchable themes: Pixel RPG, Anime Companion, and Pet Companion.

## Features

- 🎨 **Three Unique Themes**: Switch between Pixel RPG, Anime, and Pet companion styles
- 🤖 **AI-Powered Chat**: Interact with your companion using OpenAI's GPT
- 🛠️ **Micro Tools**: Built-in productivity tools (reminders, timer, calculator, to-do list)
- 💬 **Real-time Chat Interface**: Engaging conversations with theme-appropriate responses
- 🎭 **Dynamic Companion Display**: Companion changes appearance and personality based on theme

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API
- **State Management**: Zustand + React Context
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-companion-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your-actual-api-key-here
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Project Structure

```
ai-companion-hub/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── providers/
│   │   └── ThemeProvider.tsx     # Theme context provider
│   ├── ChatInterface.tsx         # Chat UI component
│   ├── CompanionDisplay.tsx      # Companion visual display
│   ├── MicroTools.tsx            # Productivity tools
│   └── ThemeSwitcher.tsx         # Theme switching UI
├── lib/
│   └── themes.ts                 # Theme configurations
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## Themes

### 1. Pixel RPG
- Retro gaming aesthetic
- Adventure and quest-themed interactions
- Dark background with neon accents

### 2. Anime Companion
- Bright, colorful gradient backgrounds
- Cheerful and encouraging personality
- Cute and friendly visual style

### 3. Pet Companion
- Warm, cozy color palette
- Playful and loving personality
- Pet-themed interactions

## Customization

### Adding New Themes

Edit `lib/themes.ts` to add new theme configurations:

```typescript
export const themes: Record<string, Theme> = {
  'your-theme': {
    id: 'your-theme',
    name: 'Your Theme Name',
    background: 'bg-your-color',
    // ... other properties
  },
};
```

### Customizing AI Personality

Edit the system prompts in `app/api/chat/route.ts` to change how the AI responds for each theme.

## Roadmap

- [ ] Implement micro tools functionality
- [ ] Add user authentication
- [ ] Implement data persistence
- [ ] Add voice interaction
- [ ] Premium features & monetization
- [ ] Mobile app version
- [ ] Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the GitHub repository.
