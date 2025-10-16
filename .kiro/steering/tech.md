# PlaNovo Technology Stack

## Frontend Stack
- **Framework**: Next.js 15.4.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.0 with custom PlaNovo design system
- **UI Components**: shadcn/ui (40+ components) with Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Outfit (primary) and Syne (secondary) from Google Fonts
- **Authentication**: Clerk (fully integrated)
- **State Management**: React hooks, React Query (planned for API integration)
- **Animation**: Framer Motion

## Backend Stack
- **Framework**: FastAPI (Python)
- **Database**: Neon PostgreSQL (in progress)
- **ORM**: SQLModel/SQLAlchemy
- **Authentication**: Clerk webhook integration
- **Environment**: Python 3.8+ with virtual environment

## Development Tools
- **Testing**: Jest with React Testing Library, jsdom environment
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode
- **Package Manager**: npm
- **Deployment**: Vercel (frontend), planned for backend

## Build System & Commands

### Frontend Commands
```bash
# Development
npm run dev              # Start Next.js dev server (localhost:3000)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Testing
npm test                # Run Jest tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
npm run test:ci         # Run tests for CI environment
```

### Backend Commands
```bash
# Setup (from backend/ directory)
source venv/bin/activate  # Activate virtual environment (Linux/Mac)
venv\Scripts\activate     # Activate virtual environment (Windows)
pip install -r requirements.txt

# Development
python start.py         # Start FastAPI server (recommended)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
python main.py          # Alternative startup method
```

## Configuration Files
- **next.config.ts**: Next.js configuration (minimal setup)
- **tailwind.config.ts**: Custom PlaNovo colors and design system
- **tsconfig.json**: TypeScript configuration with strict mode
- **jest.config.js**: Testing configuration with 80% coverage threshold
- **components.json**: shadcn/ui configuration
- **.env.local**: Environment variables (Clerk keys)

## Design System
- **Primary Colors**: PlaNovo brand palette (#E2EB98, #617073, #040403, #C9CAD9, #D5C67A)
- **Component Library**: shadcn/ui with custom PlaNovo styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built-in with Radix UI primitives

## Development Guidelines
- Use TypeScript for all new code
- Follow ESLint configuration
- Maintain 80% test coverage threshold
- Use functional components with hooks
- Implement proper error boundaries
- Follow PlaNovo design system for styling