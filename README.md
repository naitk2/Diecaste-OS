# Diecaste OS

Diecaste OS is an expert-level, AI-powered operations platform for student service businesses. It combines a dashboard-first SaaS interface, secure NextAuth authentication, MongoDB-backed order management, and AI document automation for leave notes and assignment polishing.

## Architecture

```text
Diecaste-OS/
├── app/
│   ├── api/
│   │   ├── analyze-assignment/route.ts      # multipart assignment analysis API
│   │   ├── generate-leave-note/route.ts     # leave-note generation API
│   │   └── orders/route.ts                  # MongoDB order fetch/update API
│   ├── ai-tools/page.tsx                    # AI tools route
│   ├── dashboard/page.tsx                   # founder dashboard route
│   ├── new-order/page.tsx                   # pricing engine route
│   ├── settings/page.tsx                    # configuration guidance route
│   ├── globals.css                          # Tailwind dark mode + glassmorphism styles
│   ├── layout.tsx                           # metadata and app shell
│   └── page.tsx                             # dashboard-first home page
├── components/
│   ├── AssignmentScrubber.tsx               # upload/paste assignment scrubber UI
│   ├── DashboardShell.tsx                   # responsive sidebar shell
│   ├── FounderDashboard.tsx                 # order table and status toggles
│   ├── LeaveNoteArchitect.tsx               # leave-note form and PDF export
│   ├── LoadingSpinner.tsx                   # reusable loading state
│   └── PricingEstimator.tsx                 # automated pricing UI
├── lib/
│   ├── ai.ts                                # OpenAI prompt templates and calls
│   ├── db.ts                                # MongoDB Atlas connection helper
│   ├── pricing.ts                           # pricing calculation engine
│   ├── rateLimit.ts                         # API abuse prevention
│   └── validators.ts                        # Zod input validation
└── middleware.ts                            # NextAuth route protection
```

## Core Modules

- **AI Leave Note Architect**: validates student details, prompts the LLM with a professional leave-letter template, returns the generated note, and lets students download it as a PDF.
- **Smart Assignment Scrubber**: accepts pasted text or text-based uploads, returns grammar/tone feedback, readability score, issues, and a polished version.
- **Client & Order Dashboard**: shows active orders, payment status, deadlines, and an operational status toggle from `In Progress` to `Review` to `Completed`.
- **Automated Pricing Engine**: calculates quotes from word count, urgency, and technical complexity so urgent/expert work is priced consistently.

## Environment Setup

1. Copy `.env.example` to `.env.local`.
2. Add `OPENAI_API_KEY` and optionally set `OPENAI_MODEL`.
3. Create a MongoDB Atlas cluster, add your IP/network access rule, create a database user, and paste the URI into `MONGODB_URI`.
4. Set `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` for the protected founder workspace.
5. Tune `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX_REQUESTS` to control AI API spend.

Never commit `.env.local`. Only `.env.example` belongs in Git.

## Frontend to Backend Calls

The app uses `fetch` so it works without extra client setup:

```ts
await fetch("/api/generate-leave-note", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form)
});
```

For Axios, create a shared client:

```ts
import axios from "axios";
export const api = axios.create({ baseURL: "/api" });
```

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deployment

### Vercel

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. Choose the Next.js framework preset.
4. Add all environment variables from `.env.example` in **Project Settings → Environment Variables**.
5. Deploy. Vercel will build the app and serverless API routes automatically.

### MongoDB Atlas

1. Create an Atlas project and free/shared cluster.
2. Create a database user with read/write permissions.
3. Add your Vercel outbound access policy or a controlled network access rule.
4. Create the `diecaste-os` database and `orders` collection.
5. Store the connection string in Vercel as `MONGODB_URI`.

## Security & Reliability

- NextAuth protects dashboard, order, AI tools, and settings routes.
- Zod validates leave-note form fields before the AI call.
- In-memory rate limiting prevents rapid repeated AI calls during demos.
- Secret API keys are read only from server-side environment variables.
- Loading states make long-running AI operations clear to mobile and desktop users.

## Why This Is Expert Level

Diecaste OS is not just a static CRUD demo. It demonstrates full-stack AI product architecture: secure auth, serverless backend routes, MongoDB Atlas operations, modular prompt engineering, structured AI outputs, document PDF export, responsive Tailwind UI, operational status management, and pricing automation for real business workflows.
