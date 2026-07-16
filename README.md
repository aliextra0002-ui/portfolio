# Portfolio

> Personal portfolio and AI agent — proving I can build deployed, multilingual AI products with the Claude API and React.

## Links

| | |
|---|---|
| **Live site** | _Coming Week 2_ — replace with `https://your-portfolio.vercel.app` |
| **Book a call** | _Add Calendly URL_ — e.g. `https://calendly.com/your-name/30min` |
| **Hamdam case study** | _Coming Week 3_ — link to live demo or repo when ready |

## Status

🚧 In development — Week 1 of 8-week capstone build.

## Stack

- React
- Claude API (Anthropic SDK)
- Deployment: Vercel

## What this proves

This site demonstrates deployed, multilingual (English/Urdu/Roman Urdu) AI product development — built for a founder or CTO of an early-stage customer-support-automation startup in Pakistan, to show I can ship this exact kind of product.

The **Home** page includes a live agent demo: a multilingual support-style chatbot you can try in English, Urdu, or Roman Urdu without leaving the site.

## Site structure

- **Home** — states the claim, live agent demo
- **Work** — case study (Hamdam chatbot)
- **About** — short, load-bearing background
- **Contact** — book a call

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- An [Anthropic API key](https://console.anthropic.com/)

### Install and run locally

```bash
npm install
cp .env.example .env   # then add your API key
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Environment variables

Create a `.env` file in the project root (never commit it):

```bash
# Required for the live agent demo (server-side API route)
ANTHROPIC_API_KEY=your_key_here
```

For Vercel deployment, add the same variable in **Project Settings → Environment Variables**. The key stays on the server — it is not exposed to the browser.

### Other scripts

```bash
npm run build    # production build
npm run preview  # preview production build locally
```

## License

MIT — see [LICENSE](./LICENSE)
