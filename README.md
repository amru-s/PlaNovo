# PlaNovo - Agentic AI for Project Management

> Stop managing projects. Start piloting them with PlaNovo's agentic AI platform.

## 🚀 Project Overview

PlaNovo is an intelligent, agentic workflow platform designed to be the autopilot for modern product development. Our mission is to move beyond passive, traditional project management tools by creating an active system of collaboration using AI agents to automate tedious administrative tasks.

## 🎯 Vision & Mission

**Vision**: To be the autopilot for modern product development
**Mission**: Move beyond passive, traditional project management tools by creating an active system of collaboration using AI agents to automate the most tedious administrative tasks, freeing teams to focus on building and innovation.

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend**: Next.js 15.4.4 & TypeScript
- **UI Framework**: shadcn/ui with Tailwind CSS
- **Styling**: Custom PlaNovo design system
- **Icons**: Lucide React
- **Testing**: Jest with React Testing Library
- **Authentication**: ✅ Clerk (Fully Integrated)
- **Database**: ✅ Neon PostgreSQL (Connected)
- **Backend**: ✅ FastAPI & Python (Running)
- **AI Integration**: ✅ Google Gemini AI (Active)
- **Deployment**: ✅ Vercel (Live Frontend)

## 📋 Current Implementation Status

### ✅ **Completed Features**

#### 1. **Landing Page (`/`)**
- **Modern, responsive design** with PlaNovo branding
- **Navigation bar** with Login and Request Demo buttons
- **Hero section** with compelling value proposition
- **Features section** showcasing key capabilities
- **Call-to-action sections** driving user engagement
- **Footer** with additional information
- **Auto-redirect** authenticated users to dashboard

#### 2. **Complete Authentication System** ✅ **PRODUCTION READY**
- **Custom Sign In Page** (`/login`) with PlaNovo branding and dashboard redirect
- **Custom Sign Up Page** (`/signup`) with seamless onboarding and dashboard redirect
- **User Profile Management** with Clerk's UserButton component
- **Organization Management** (`/organization`) for team settings
- **Create Organization** (`/create-organization`) for team setup
- **Unauthorized Sign In** (`/unauthorized-sign-in`) for security verification
- **Combined Auth Page** (`/auth`) with toggle between sign in/up
- **Middleware Protection** for all routes
- **Custom Styling** matching PlaNovo design system
- **Responsive Design** for all devices
- **Proper Routing** - authenticated users automatically redirected to dashboard
- **User Profile Popup** - click user avatar for detailed profile information

#### 3. **Dashboard Foundation (`/dashboard`)** ✅ **ENHANCED**
- **Sidebar navigation** with functional routing
- **User profile area** with Clerk UserButton and user name display
- **Responsive layout** ready for content integration
- **Navigation between pages** with proper routing
- **Dashboard cards** for project overview
- **Personalized welcome message** with user's name
- **Clean user interface** with no duplicate elements
- **Professional user profile popup** with all user details

#### 4. **AI Requirements Analyst (`/srs`)** ✅ **NEW FEATURE**
- **Integrated into dashboard** with sidebar navigation
- **Google Gemini AI integration** for SRS generation
- **Professional input interface** with large textarea and examples
- **Real-time SRS generation** from feature descriptions
- **Structured output** with Functional Requirements (FR-XXX) and Non-Functional Requirements (NFR-XXX)
- **Markdown rendering** with custom PlaNovo styling
- **Loading states** and error handling
- **Keyboard shortcuts** (Ctrl+Enter to generate)
- **Professional formatting** for enterprise-ready specifications

#### 5. **Backend Infrastructure** ✅ **OPERATIONAL**
- **FastAPI server** running on localhost:8000
- **Neon PostgreSQL database** with complete schema
- **Database models** for workspaces, users, projects, tasks, epics, sprints
- **API endpoints** for health checks and database testing
- **Clerk webhook integration** for user synchronization
- **Google Gemini AI integration** for SRS generation
- **CORS configuration** for frontend integration
- **Environment management** with secure API keys

#### 6. **Design System**
- **Custom color palette**: PlaNovo brand colors (#E2EB98, #617073, #040403, #C9CAD9, #D5C67A)
- **Typography**: Outfit and Syne fonts
- **Component library**: shadcn/ui integration with 40+ components
- **Responsive design**: Mobile-first approach
- **Consistent styling**: Across all pages

#### 7. **Testing Infrastructure**
- **Jest configuration** with React Testing Library
- **Component tests** for login form, navigation, and dashboard sidebar
- **Test coverage** reporting setup
- **CI/CD ready** testing pipeline
- **All tests passing** ✅

#### 8. **Production Deployment** ✅ **LIVE**
- **Frontend on Vercel**: [https://planovo.vercel.app](https://planovo.vercel.app)
- **Custom Domain**: Configured and working
- **Environment Variables**: Properly configured
- **Build Optimization**: All pages optimized
- **Performance**: Fast loading times

### 🔄 **In Progress**
- **Backend deployment** for production API access
- **Frontend-Backend integration** for real project data
- **CRUD operations** for projects, tasks, and workspaces

### 📅 **Next Steps**

#### **Phase 1: Production Backend** 🎯 **CURRENT FOCUS**
- [ ] **Deploy FastAPI backend** to Railway/Render
- [ ] **Connect frontend to production API**
- [ ] **Implement CRUD endpoints** for projects and tasks
- [ ] **Add authentication middleware** for API security

#### **Phase 2: Core Project Management** 
- [ ] **Project Creation & Management**
- [ ] **Task Management System** with status tracking
- [ ] **Team Collaboration** features
- [ ] **Kanban Board Views**

#### **Phase 3: Advanced AI Features**
- [ ] **Auto-Task Creation** from SRS documents
- [ ] **Intelligent Task Prioritization**
- [ ] **Automated Progress Reporting**
- [ ] **Smart Workload Balancing**

#### **Phase 4: Enterprise Features**
- [ ] **Advanced Analytics Dashboard**
- [ ] **Integration Hub** (GitHub, Slack, Jira)
- [ ] **Custom Workflows**
- [ ] **Enterprise Security & Compliance**

## 🤖 AI Requirements Analyst

### **Google Gemini Integration** ✅ **LIVE**

PlaNovo's first AI agent is now operational! The AI Requirements Analyst transforms simple feature ideas into comprehensive, professional Software Requirements Specifications.

#### **Key Features**
- ✅ **Natural Language Input**: Describe features in plain English
- ✅ **Professional SRS Output**: Structured documents with FR-XXX and NFR-XXX requirements
- ✅ **Real-time Generation**: Powered by Google Gemini AI
- ✅ **Integrated Dashboard**: Accessible via sidebar navigation
- ✅ **Enterprise Ready**: Professional formatting and comprehensive coverage

#### **API Integration**
```typescript
// SRS Generation Endpoint
POST http://localhost:8000/api/srs/generate
Content-Type: application/json

{
  "featureIdea": "User authentication system with login and signup"
}

// Response
{
  "srs_document": "## 1. Feature Overview\n\n[Comprehensive SRS]...",
  "feature_idea": "User authentication system with login and signup",
  "status": "success"
}
```

#### **Example Outputs**
The AI generates complete specifications including:
- **Feature Overview**: Comprehensive description and scope
- **Functional Requirements**: Specific user stories (FR-AUTH-01, FR-USER-01, etc.)
- **Non-Functional Requirements**: Security, Performance, and Usability requirements
- **Technical Standards**: Industry best practices and compliance requirements

### **Authentication System** ✅ **PRODUCTION READY**

#### **Clerk Integration Features**
- ✅ **Custom Branding**: All pages match PlaNovo design system
- ✅ **Responsive Design**: Works on all devices
- ✅ **Security**: Proper middleware protection
- ✅ **User Management**: Profile and organization settings
- ✅ **Error Handling**: Graceful error states
- ✅ **Loading States**: Smooth user experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or yarn
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd planovo
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Activate virtual environment**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up backend environment variables**
   ```bash
   # Edit backend/.env file
   DATABASE_URL="your_neon_postgresql_url"
   GEMINI_API_KEY="your_google_gemini_api_key"
   CLERK_WEBHOOK_SECRET="your_clerk_webhook_secret"
   ```

5. **Start the backend server**
   ```bash
   python start.py
   ```

### Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Available Scripts

#### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests for CI environment

#### Backend Commands
- `python start.py` - Start FastAPI development server
- `python main.py` - Alternative startup method
- `uvicorn main:app --reload` - Direct uvicorn command

## 🎨 Design System

### Colors
- **Primary**: `#E2EB98` (PlaNovo Primary)
- **Secondary**: `#617073` (PlaNovo Secondary)
- **Dark**: `#040403` (PlaNovo Dark)
- **Light**: `#C9CAD9` (PlaNovo Light)
- **Accent**: `#D5C67A` (PlaNovo Accent)

### Typography
- **Primary Font**: Outfit (Google Fonts)
- **Secondary Font**: Syne (Google Fonts)

## 📁 Project Structure

```
planovo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Combined auth page
│   │   ├── login/             # Sign in page
│   │   ├── signup/            # Sign up page
│   │   ├── user/              # User profile page
│   │   ├── organization/      # Organization settings
│   │   ├── create-organization/ # Create organization
│   │   ├── unauthorized-sign-in/ # Security verification
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/             # React components
│   │   ├── ui/               # shadcn/ui components (40+ components)
│   │   ├── __tests__/        # Component tests
│   │   ├── navigation.tsx     # Navigation component
│   │   ├── hero-section.tsx   # Landing page hero
│   │   ├── login-form.tsx     # Login form
│   │   ├── dashboard-*.tsx    # Dashboard components
│   │   ├── features-section.tsx # Features showcase
│   │   ├── cta-section.tsx    # Call-to-action
│   │   └── footer.tsx         # Footer component
│   ├── lib/                   # Utility functions
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
├── jest.config.js            # Jest configuration
├── jest.setup.js             # Jest setup
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful component and function names

### Component Structure
- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices
- Use shadcn/ui for consistent UI components

### Styling
- Use Tailwind CSS for styling
- Follow the PlaNovo design system
- Ensure responsive design
- Maintain accessibility standards

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Jest with React Testing Library for component testing
- **Component Tests**: Testing individual UI components
- **Integration Tests**: Testing component interactions
- **E2E Tests**: Playwright for user workflows (planned)

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI environment
npm run test:ci
```

### Current Test Coverage
- ✅ **Login Form**: Form validation and user interactions
- ✅ **Navigation**: Component rendering and navigation links
- ✅ **Authentication**: Clerk integration tests
- 🔄 **Additional Components**: More component tests in progress

## 🚀 Deployment

### **Production Deployment** ✅ **LIVE**
- **URL**: [https://planovo.vercel.app](https://planovo.vercel.app)
- **Platform**: Vercel
- **Status**: Fully deployed and functional
- **Performance**: Optimized build with fast loading

### **Environment Configuration**
```bash
# Production Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### **Build Process**
- ✅ **TypeScript Compilation**: No errors
- ✅ **ESLint**: Code quality checks
- ✅ **Jest Tests**: All tests passing
- ✅ **Build Optimization**: All pages optimized
- ✅ **Performance**: Lighthouse score optimized

## 🔄 Continuous Integration

### **Current Status**
- ✅ **Build Verification**: All builds successful
- ✅ **Test Suite**: 8/8 tests passing
- ✅ **Type Checking**: No TypeScript errors
- ✅ **Linting**: Code quality maintained

### **GitHub Actions Workflow** (Planned)

Our CI/CD pipeline will ensure code quality and automated testing:

#### **Workflow Triggers**
- **Push to main branch**: Automatic testing and deployment
- **Pull requests**: Code quality checks and testing
- **Manual triggers**: For specific deployment needs

#### **CI Pipeline Steps** (Planned)

1. **Code Quality Checks**
   ```yaml
   - name: Lint and Type Check
     run: |
       npm run lint
       npm run type-check
   ```

2. **Dependency Security**
   ```yaml
   - name: Security Audit
     run: npm audit --audit-level moderate
   ```

3. **Build Verification**
   ```yaml
   - name: Build Application
     run: npm run build
   ```

4. **Testing Suite**
   ```yaml
   - name: Run Tests
     run: npm run test:ci
   ```

5. **Deployment**
   ```yaml
   - name: Deploy to Vercel
     run: vercel --prod
   ```

## 🗄️ Database Architecture

### **Neon PostgreSQL Integration** ✅ **OPERATIONAL**

PlaNovo uses a robust, scalable database architecture designed for multi-tenant project management.

#### **Database Schema Overview**

```sql
-- Core Tables (All Implemented)
✅ workspaces          -- Organization-level containers
✅ users               -- User profiles synced from Clerk
✅ workspace_members   -- User-workspace relationships with roles
✅ projects            -- Project containers within workspaces
✅ project_members     -- User-project assignments
✅ epics               -- High-level strategic initiatives
✅ sprints             -- Time-boxed work cycles
✅ tasks               -- Core work units with full metadata
✅ attachments         -- File attachments for tasks
```

#### **Key Architectural Features**
- **Multi-tenant Design**: Workspace-based isolation
- **Flexible Hierarchy**: Projects → Epics/Sprints → Tasks
- **Role-based Access**: Granular permissions at workspace and project levels
- **Clerk Integration**: Seamless user synchronization
- **Scalable Structure**: Designed for enterprise-level usage

#### **Database Connection Status**
- ✅ **Neon PostgreSQL**: Connected and operational
- ✅ **Connection Pooling**: Configured for performance
- ✅ **Schema Created**: All tables deployed
- ✅ **API Integration**: FastAPI connected to database
- ✅ **Health Monitoring**: Database health checks implemented

### **API Architecture** ✅ **FUNCTIONAL**

#### **Current Endpoints**
```python
# Health & Status
GET  /                    # API status
GET  /health             # Health check
GET  /db-test           # Database connection test

# AI Features
POST /api/srs/generate   # SRS document generation

# Webhooks
POST /api/webhooks/clerk # Clerk user synchronization
```

#### **Planned Endpoints**
```python
# Project Management
GET    /api/workspaces           # List user workspaces
POST   /api/workspaces           # Create workspace
GET    /api/projects             # List projects
POST   /api/projects             # Create project
GET    /api/tasks                # List tasks
POST   /api/tasks                # Create task
PUT    /api/tasks/{id}           # Update task
DELETE /api/tasks/{id}           # Delete task
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Guidelines
- ✅ All CI checks must pass
- ✅ Code review required
- ✅ Tests must be included
- ✅ Documentation updated
- ✅ No breaking changes

## 📄 License

*License information to be added*

## 📞 Contact

*Contact information to be added*

---

**PlaNovo** - Transforming project management with AI-powered automation.

*Last updated: December 2025*
