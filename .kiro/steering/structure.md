# PlaNovo Project Structure

## Root Directory Layout
```
planovo/
├── src/                    # Frontend source code (Next.js App Router)
├── backend/                # FastAPI backend application
├── public/                 # Static assets and files
├── .kiro/                  # Kiro AI assistant configuration
├── .next/                  # Next.js build output (auto-generated)
├── node_modules/           # Frontend dependencies (auto-generated)
├── coverage/               # Test coverage reports (auto-generated)
└── [config files]          # Various configuration files
```

## Frontend Structure (`src/`)
```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Combined authentication page
│   ├── login/             # Sign in page
│   ├── signup/            # Sign up page
│   ├── user/              # User profile management
│   ├── organization/      # Organization settings
│   ├── create-organization/ # Organization creation
│   ├── unauthorized-sign-in/ # Security verification
│   ├── dashboard/         # Main dashboard pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Landing page
├── components/             # Reusable React components
│   ├── ui/               # shadcn/ui components (40+ components)
│   ├── __tests__/        # Component test files
│   ├── navigation.tsx     # Main navigation component
│   ├── hero-section.tsx   # Landing page hero
│   ├── login-form.tsx     # Authentication form
│   ├── dashboard-*.tsx    # Dashboard-specific components
│   ├── features-section.tsx # Features showcase
│   ├── cta-section.tsx    # Call-to-action sections
│   └── footer.tsx         # Site footer
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
└── middleware.ts          # Clerk authentication middleware
```

## Backend Structure (`backend/`)
```
backend/
├── main.py                # FastAPI application entry point
├── start.py               # Development startup script
├── database.py            # Database connection and session management
├── models.py              # SQLModel database models
├── webhooks.py            # Clerk webhook handlers
├── create_db.py           # Database initialization script
├── test_models.py         # Database model tests
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables
├── .env.development.local # Development environment variables
├── venv/                  # Python virtual environment
└── README.md              # Backend documentation
```

## Configuration Files (Root)
- **package.json**: Frontend dependencies and npm scripts
- **next.config.ts**: Next.js configuration
- **tailwind.config.ts**: Tailwind CSS and PlaNovo design system
- **tsconfig.json**: TypeScript compiler configuration
- **jest.config.js**: Testing framework configuration
- **components.json**: shadcn/ui component library configuration
- **eslint.config.mjs**: ESLint linting rules
- **.env.local**: Frontend environment variables (Clerk keys)
- **.gitignore**: Git ignore patterns

## Key Architectural Patterns

### Frontend Patterns
- **App Router**: Next.js 13+ file-based routing in `src/app/`
- **Component Co-location**: Components grouped by feature/page
- **Barrel Exports**: Index files for clean imports
- **Custom Hooks**: Reusable logic in `src/hooks/`
- **Utility Functions**: Shared utilities in `src/lib/`

### Backend Patterns
- **FastAPI Structure**: Single main.py with modular imports
- **Database Models**: SQLModel for type-safe database operations
- **Dependency Injection**: FastAPI's dependency system for database sessions
- **Environment Configuration**: python-dotenv for environment management

### Authentication Flow
- **Clerk Integration**: Frontend authentication with backend webhook sync
- **Middleware Protection**: Route-level authentication in Next.js
- **User Sync**: Clerk webhooks update backend user database

## File Naming Conventions
- **Components**: PascalCase for React components (`HeroSection.tsx`)
- **Pages**: lowercase with hyphens for routes (`sign-up/page.tsx`)
- **Utilities**: camelCase for functions (`getUserProjects.ts`)
- **Constants**: UPPER_SNAKE_CASE for constants
- **Types**: PascalCase with descriptive names (`UserProfile.ts`)

## Import/Export Patterns
```typescript
// Absolute imports using @ alias
import { Button } from "@/components/ui/button"
import { getUserData } from "@/lib/utils"

// Barrel exports in index files
export { Button } from "./button"
export { Input } from "./input"
```

## Testing Structure
- **Component Tests**: Co-located in `__tests__/` directories
- **Coverage Reports**: Generated in `coverage/` directory
- **Test Configuration**: Jest setup with React Testing Library
- **Naming**: `*.test.tsx` or `*.spec.tsx` for test files