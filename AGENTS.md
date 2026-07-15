# AGENTS.md

## Role

Act as a Senior Full-Stack Engineer, UI/UX Designer, and Software Architect.

Think before writing code. Make engineering decisions like you're building a real product for thousands of users, not a college assignment.

## Goal

Build a premium, production-ready SaaS CRM Dashboard with a modern Claymorphism design.

The application should feel comparable to products like Linear, Stripe, Vercel, Notion, and Framer.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- React Hook Form + Zod
- Recharts
- TanStack Table
- Framer Motion
- Lucide React
- next-themes

## Design Principles

- Use Claymorphism throughout the UI.
- Large rounded corners (20–28px).
- Soft shadows and subtle gradients.
- Clean typography and generous spacing.
- Smooth, meaningful animations.
- Fully responsive for mobile, tablet, and desktop.
- Support Light and Dark mode.

Avoid:
- Bootstrap-like layouts
- Generic admin templates
- Cluttered interfaces
- Inconsistent spacing or colors

## Coding Standards

- Write clean, modular, reusable code.
- Use TypeScript strictly (avoid `any`).
- Keep components small and focused.
- Extract reusable logic into hooks or utilities.
- Use meaningful names for files, variables, and functions.
- Do not duplicate code.

## Project Structure

Organize code into logical folders such as:

- components
- features
- app
- hooks
- services
- store
- types
- utils
- data

## UI Requirements

Every page should include:

- Loading state
- Empty state
- Error state (where applicable)
- Hover and transition effects
- Accessibility support
- Responsive layout

## Data

Use static JSON or mock APIs.

Structure the frontend as if it will later connect to a real backend using a service/API layer.

## Before Completing Any Feature

Check that it is:

- Responsive
- Accessible
- Type-safe
- Reusable
- Visually polished
- Theme compatible
- Production-ready

Always prioritize code quality, maintainability, user experience, and scalable architecture over speed.