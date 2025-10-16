import { render, screen } from '@testing-library/react'
import { DashboardSidebar } from '../dashboard-sidebar'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/dashboard',
}))

// Mock Clerk hooks
jest.mock('@clerk/nextjs', () => ({
  useClerk: () => ({
    signOut: jest.fn().mockResolvedValue(undefined),
  }),
  useUser: () => ({
    user: {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      emailAddresses: [{ emailAddress: 'john@example.com' }],
      imageUrl: 'https://example.com/avatar.jpg',
      createdAt: '2024-01-15T10:30:00Z',
      id: 'user_123456789',
    },
    isLoaded: true,
  }),
  UserButton: () => <div data-testid="user-button">User Button</div>,
}))

describe('DashboardSidebar', () => {
  it('renders navigation items', () => {
    render(<DashboardSidebar />)
    
    // Check if navigation items are present
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('AI Requirements')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Team')).toBeInTheDocument()
    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders PlaNovo logo and description', () => {
    render(<DashboardSidebar />)
    
    expect(screen.getByText('PlaNovo')).toBeInTheDocument()
    expect(screen.getByText('AI Project Management')).toBeInTheDocument()
  })

  it('renders Clerk UserButton for profile functionality', () => {
    render(<DashboardSidebar />)
    
    // Check if UserButton is present
    expect(screen.getByTestId('user-button')).toBeInTheDocument()
  })

  it('displays user name next to UserButton', () => {
    render(<DashboardSidebar />)
    
    // Check if user name is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('has proper user section layout with UserButton and name', () => {
    render(<DashboardSidebar />)
    
    // Check if both UserButton and user name are present
    expect(screen.getByTestId('user-button')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
}) 