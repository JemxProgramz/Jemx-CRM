# Jemx CRM Dashboard

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

A premium, production-ready SaaS CRM Dashboard built with React, TypeScript, and a modern Claymorphism design system. Designed to provide a seamless, highly interactive, and visually stunning user experience comparable to top-tier enterprise products.

## ✨ Features

- **Modern Claymorphism UI:** Soft shadows, subtle gradients, and generous rounded corners for a premium feel.
- **Fully Responsive:** Seamlessly adapts to mobile, tablet, and desktop viewports.
- **Advanced Data Tables:** Built with `@tanstack/react-table` featuring sorting, pagination, and high performance.
- **Interactive Data Visualization:** Beautiful, responsive charts powered by `recharts`.
- **Robust State Management:** Centralized application state and toast notification system using `zustand`.
- **Fluid Animations:** Smooth micro-interactions, page transitions, and layout changes powered by `framer-motion`.
- **Form Validation:** Type-safe form handling using `react-hook-form` and `zod`.
- **Dark/Light Theme:** First-class support for dynamic color schemes.

## 🚀 Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Tables:** TanStack Table v8
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Routing:** React Router DOM

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/    # Navbar, Sidebar, Page Layout
│   └── ui/        # Reusable UI components (Buttons, Cards, Inputs, Toasts)
├── pages/         # Page components (Dashboard, Customers, Orders, Settings)
├── store/         # Zustand stores (useAppStore, useToastStore)
├── types/         # TypeScript interfaces and types
├── lib/           # Utility functions (cn, formatters)
└── App.tsx        # Application entry and routing
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🎨 Design Philosophy

This project strictly adheres to a premium standard:
- **Craftsmanship:** Deep focus on typography, color pairings, spacing, and micro-animations.
- **Clean Architecture:** Strictly typed, modular, and reusable component structure.
- **Claymorphism Standard:** Escaping flat-design norms with soft inner shadows and tactile depth.
