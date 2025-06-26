# drclause - Internal Audit Assistant

> AI-powered AS 9100 and ISO 9001 audit checklist generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

## 🎯 Overview

drclause is an Internal Audit Assistant that automatically generates and completes AS 9100 (and later ISO 9001) audit checklists by analyzing a company's existing quality-system documents with Large Language Models (LLMs). The tool guides auditors—junior or expert—through each clause, provides draft answers with citations to source documents, and highlights gaps that need attention.

## 🚀 MVP Goal

> **"Upload your checklist + docs → get a pre-filled, citation-rich checklist ready for review in minutes."**

### Success Criteria
- ✅ 100% of a 20-question pilot checklist answered
- ✅ Each answer cites the document/section used
- ✅ Expert auditor validates ≥90% answers as correct/complete
- ✅ Draft produced in ≤20% of the time a human normally spends

## 🎯 Target Users

| Persona | Role | Experience Level |
|---------|------|------------------|
| **Quality Lead** | Oversees compliance activities | 10+ yrs AS 9100 & ISO 9001 |
| **Internal Auditor (Junior)** | Executes audits, needs guidance | 0–2 yrs |
| **Consultant Auditor** | Advises multiple clients | 5–15 yrs |

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite** - Fast development and building
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** + **shadcn/ui** - Modern, accessible components
- **React Router** - Client-side routing
- **React Hook Form** + **Zod** - Form handling and validation

### Backend & Data
- **Supabase** - Postgres + `pgvector` + Auth + Storage
- **Supabase Edge Functions** - Serverless TypeScript functions
- **OpenAI GPT-4o** / **Anthropic Claude-3** - LLM integration

### Deployment
- **Vercel** - Frontend hosting
- **Supabase** - Backend and database

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/pnpm/yarn
- Supabase account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drclause
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations (see `supabase/migrations/`)
   - Configure storage buckets for document uploads

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
drclause/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── types/              # TypeScript type definitions
│   ├── i18n/               # Internationalization
│   └── styles/             # Global styles
├── supabase/
│   ├── functions/          # Edge Functions
│   ├── migrations/         # Database migrations
│   └── seed/               # Seed data
├── public/                 # Static assets
└── tests/                  # Test files
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run test         # Run tests
npm run test:coverage # Run tests with coverage
npm run type-check   # TypeScript type checking
```

### Code Quality

This project follows strict coding standards:

- **ESLint** with TypeScript and accessibility rules
- **Prettier** for consistent formatting
- **Conventional Commits** for git messages
- **TypeScript** strict mode enabled
- **Accessibility** (a11y) compliance

## 🔒 Security & Compliance

- **Row Level Security (RLS)** enabled on all tables
- **Environment variables** for all secrets
- **Input validation** with Zod schemas
- **File upload restrictions** (max 10MB, allowed extensions only)
- **Rate limiting** on API endpoints
- **Audit logging** for all operations

## 📊 Metrics & Monitoring

| Metric | Target |
|--------|--------|
| Checklist coverage | 100% of lines answered |
| Accuracy (auditor review) | ≥90% |
| Turn-around time | ≤20 min for 20 lines |
| User satisfaction (CSAT) | ≥4/5 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or auxiliary tool changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@drclause.com or create an issue in this repository.

## 🗺️ Roadmap

### Phase 1 (MVP) - Current
- [x] Basic document upload and processing
- [x] AS 9100 §8.3 checklist support
- [x] Citation generation
- [x] Review interface

### Phase 2
- [ ] ISO 9001 support
- [ ] Multiple checklist formats
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard

### Phase 3
- [ ] On-premise deployment option
- [ ] FedRAMP compliance
- [ ] Mobile app
- [ ] API for third-party integrations

---

**Built with ❤️ for quality management professionals** 