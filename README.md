# Jemx CRM - Premium SaaS Dashboard

![Jemx CRM](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000&h=600)

Jemx CRM is a modern, production-ready SaaS Customer Relationship Management (CRM) dashboard. It focuses on delivering a premium user experience through a distinct "Claymorphism" design system, characterized by large rounded corners, soft drop shadows, and subtle gradients. The application is built with performance, accessibility, and scalability in mind.

## 🚀 Key Features

- **Modern Aesthetic:** A unique Claymorphism design language with smooth Framer Motion animations.
- **Interactive Dashboards:** Comprehensive data visualization using Recharts for revenue, user growth, and sales metrics.
- **Advanced Data Tables:** Highly performant, responsive data tables for Customers and Orders powered by TanStack Table, featuring sorting, filtering, and a mobile-optimized card view.
- **State Management:** Decoupled UI state (Zustand) and Server state (custom hooks simulating React Query).
- **Mock API Integration:** Realistic simulated API layer with artificial latency and error handling to demonstrate robust loading and error states.
- **Form Validation:** Type-safe forms built with React Hook Form and Zod.
- **Dark/Light Mode:** First-class support for both themes, ensuring optimal readability and contrast.
- **Responsive Design:** A desktop-first approach that gracefully adapts to mobile devices, converting complex tables into readable stacked cards.

## 🛠 Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (UI State), Custom Hooks (Server State)
- **Data Visualization:** Recharts
- **Tables:** @tanstack/react-table
- **Animations:** Motion (Framer Motion)
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Routing:** React Router DOM

## 📁 Architecture & Patterns

The application follows strict engineering standards to ensure maintainability:

1. **Separation of Concerns:** Global transient UI states (like theme and sidebar toggle) are managed in Zustand, while asynchronous data operations are encapsulated in custom React hooks (`/src/hooks/useData.ts`).
2. **Type Safety:** The entire codebase is strictly typed with TypeScript, avoiding `any` types and ensuring reliable data contracts between the API layer and the UI.
3. **Resilient UX:** The mock API layer (`/src/lib/api.ts`) intentionally introduces latency and occasional failures. The UI handles these gracefully using skeletons for loading states and inline error boundaries with retry mechanisms.
4. **Modular Components:** UI primitives (Buttons, Cards, Modals, Inputs) are abstracted into the `/src/components/ui` directory for consistent reuse across the application.

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or newer) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd jemx-crm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

To create a production-optimized build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🏗 Project Structure

```
├── src/
│   ├── assets/        # Static assets (images, logos)
│   ├── components/    # Reusable React components
│   │   ├── auth/      # Authentication guards and components
│   │   ├── dashboard/ # Dashboard specific widgets (KPI cards)
│   │   ├── layout/    # Structural components (Sidebar, Navbar)
│   │   └── ui/        # Reusable UI primitives (Button, Card, Input)
│   ├── hooks/         # Custom React hooks (Data fetching, etc.)
│   ├── lib/           # Utility functions and API mock layer
│   ├── pages/         # Top-level page components (Dashboard, Analytics, etc.)
│   ├── store/         # Zustand state stores
│   ├── types/         # TypeScript interface definitions
│   ├── App.tsx        # Application root and router configuration
│   └── main.tsx       # React DOM entry point
├── eslint.config.js   # ESLint configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## 🎨 Design Philosophy

Jemx CRM embraces **Claymorphism**, an evolution of Neumorphism that combines 3D-like elevated surfaces with soft, pastel-leaning gradients and generous border radii (20-28px). This aesthetic makes the interface feel tactile, friendly, and highly polished, distinguishing it from generic flat admin templates.

### Core Principles applied:
- **Clean Typography:** Strict adherence to modern sans-serif typefaces with clear hierarchical sizing.
- **Generous Spacing:** Utilizing ample padding and margins to let content breathe.
- **Meaningful Animation:** Micro-interactions and page transitions that provide spatial context without overwhelming the user.
- **Accessibility:** Ensuring high contrast ratios and keyboard navigability across all custom components.

---
*Built with ❤️ for modern SaaS teams.*
