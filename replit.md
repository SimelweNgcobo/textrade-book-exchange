# Rebooked Solutions - Full-Stack Application

## Overview

This is a full-stack web application built with Node.js, Express, React, and PostgreSQL. The application appears to be a marketplace for buying and selling textbooks, specifically targeting South African universities. It includes features for user authentication, book listings, admin management, university information, and various supporting services.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI components with Tailwind CSS styling
- **State Management**: React Context for cart and authentication
- **Data Fetching**: TanStack React Query for server state management
- **Routing**: React Router for client-side navigation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Authentication**: Supabase Auth integration
- **API Structure**: RESTful API with `/api` prefix

### Database Architecture
- **Primary Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon serverless database with WebSocket support
- **Schema Management**: Drizzle migrations in `/migrations` directory
- **Schema Definition**: Centralized in `/shared/schema.ts`

## Key Components

### Authentication System
- Supabase authentication with email/password and OAuth providers
- Admin role verification with email-based fallback
- Profile management with address validation
- Email change verification system

### Book Management
- CRUD operations for book listings
- Image upload support (front cover, back cover, inside pages)
- Category and condition filtering
- University and grade-specific categorization
- Commission calculation system (10% platform fee)

### Admin Dashboard
- User management with suspension capabilities
- Book listing moderation
- Contact message management
- Broadcast system for platform-wide announcements
- Reporting and analytics

### University Integration
- Comprehensive South African university database
- APS (Admission Point Score) calculation system
- Course and degree information
- Faculty-specific program mapping

### Shipping Integration
- Multiple courier service integrations (Courier Guy, ShipLogic)
- Address validation and management
- Shipping quote calculations
- Automatic shipment creation

### Cart and Checkout
- Shopping cart with seller-specific grouping
- Commission calculation per transaction
- Address-based shipping quotes

## Data Flow

1. **User Registration**: Users register via Supabase Auth, profile created in profiles table
2. **Book Listing**: Authenticated users create listings with image uploads and categorization
3. **Search & Discovery**: Books filtered by category, university, condition, and price range
4. **Purchase Flow**: Cart → Address validation → Shipping quotes → Checkout
5. **Admin Moderation**: Admins review listings, manage users, handle reports

## External Dependencies

### Core Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Supabase**: Authentication, real-time subscriptions, edge functions
- **Vite**: Frontend build tool and development server

### Third-Party Services
- **Courier Guy API**: Shipping and logistics
- **ShipLogic API**: Alternative shipping provider
- **Radix UI**: Accessible component primitives
- **TanStack Query**: Server state management

### Development Tools
- **Drizzle Kit**: Database migrations and schema management
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Production bundling for server code

## Deployment Strategy

### Development Environment
- Run command: `npm run dev`
- Vite dev server with HMR on port 5000
- PostgreSQL database with connection pooling
- Environment variables for API keys and database URLs

### Production Build
- Build command: `npm run build` (Vite + ESBuild bundling)
- Start command: `npm run start`
- Static file serving from `/dist/public`
- Server-side rendering disabled (SPA mode)

### Database Management
- Schema defined in `/shared/schema.ts`
- Migrations managed with Drizzle Kit
- Push schema changes: `npm run db:push`

### Environment Configuration
- Database URL required for Neon connection
- Supabase project configuration
- API keys for shipping services
- Authentication secrets

## Changelog
- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.