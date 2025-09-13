# GoalGrid - AI-Powered Social Skills Coach

## Overview

GoalGrid is an AI-powered social skills coaching application that helps users transform their interpersonal abilities through personalized goal setting and actionable plans. The application is based on principles from "How to Win Friends and Influence People" and provides users with an interactive conversational experience guided by AI avatars. Users can select from different AI coaching personalities (Skyler, Raven, Phoenix), engage in guided conversations to define their goals, and receive customized step-by-step action plans for improving their social skills.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built as a React single-page application using TypeScript and Vite for development tooling. The UI framework leverages Shadcn/UI components built on top of Radix UI primitives with Tailwind CSS for styling. The application follows a component-based architecture with clear separation between:

- **Main Flow Components**: `GoalPlannerMain` orchestrates the multi-step user journey from avatar selection through plan generation
- **Interactive Components**: `AvatarSelection`, `ConversationFlow`, and `PlanPreview` handle specific user interactions
- **UI Components**: Reusable design system components for consistent styling and behavior

The design system implements a dark mode color scheme with purple gradients and avatar-specific color coding. State management is handled through React hooks and TanStack Query for server state management.

### Backend Architecture
The server is built with Express.js following a RESTful API pattern. The architecture separates concerns across:

- **Route Layer**: Handles HTTP requests and response formatting in `routes.ts`
- **Service Layer**: AI conversation logic in `groq.ts` manages interactions with the Groq AI service
- **Storage Layer**: Abstract storage interface in `storage.ts` with in-memory implementation for development

The API exposes endpoints for AI conversations (`/api/conversation`) and plan generation (`/api/generate-plan`), with request validation using Zod schemas.

### Data Storage
Currently implements an in-memory storage solution for development with interfaces designed for easy migration to persistent storage. The data models include:

- **Users**: Basic user accounts with username/password authentication
- **Goals**: User goals with associated avatar, conversation history, and generated plans
- **Messages**: Conversation messages between users and AI avatars

The schema is defined using Drizzle ORM with PostgreSQL dialect, prepared for production database integration.

### AI Integration
The application integrates with Groq AI service for natural language processing. Each of the three AI avatars (Skyler, Raven, Phoenix) has distinct personality prompts and conversation styles:

- **Skyler**: Visionary guide focused on big-picture thinking and inspiration
- **Raven**: Analytical coach emphasizing deep understanding and root cause analysis  
- **Phoenix**: Resilient mentor focused on overcoming challenges and building confidence

The AI service handles conversation flow, generates contextual responses, and creates structured action plans based on user goals.

### Authentication & Session Management
Basic authentication is implemented through username/password with session management prepared for integration with connect-pg-simple for PostgreSQL session storage. The system includes placeholder Firebase configuration for potential future OAuth integration.

## External Dependencies

### AI Services
- **Groq SDK**: Primary AI service for natural language processing and conversation generation
- **OpenAI-compatible API**: Structured for easy integration with various LLM providers

### Database & Storage
- **Drizzle ORM**: Database toolkit and query builder for PostgreSQL
- **@neondatabase/serverless**: Prepared for Neon PostgreSQL integration
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI & Styling
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: For managing component variants and styling

### Development & Build Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **TanStack Query**: Server state management and API interaction

### Form & Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for type-safe API contracts
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Additional Libraries
- **date-fns**: Date manipulation and formatting utilities
- **embla-carousel-react**: Carousel component for UI interactions
- **cmdk**: Command palette component for enhanced UX