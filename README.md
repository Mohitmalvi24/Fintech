# Wealth Curator - AI-Powered Finance Dashboard

A production-quality Personal Finance Dashboard built with React, TypeScript, and Vite. This project focuses on high-fidelity UI, performance optimization, and scalable architecture.

##  Features

- **Net Worth & Financial Summary**: Real-time tracking of assets, spending, and savings.
- **AI-Driven Insights**: Smart suggestions based on financial data (mock logic).
- **Interactive Charts**: Visual breakdown of spending using Recharts.
- **Advanced Data Handling**: Custom hooks for fetching, local storage, and debouncing.
- **Premium Design System**: Glassmorphism, dark mode support, and fluid animations.
- **Analytics & SEO**: Integrated event tracking and search engine optimization.
- **Table Virtualization**: High-performance scrolling for large transaction datasets.
- **Cross-Platform Readiness**: Components built with React Native Web support for future mobile expansion.

##  Bonus Features (Strong Differentiators)

### 1. React Native Web Support
The project is configured to support **React Native Web**. Key components like `Alerts` have been refactored to use `react-native` primitives (`View`, `Text`, `StyleSheet`), making them reusable across Web, iOS, and Android.

### 2. Table Virtualization
Using `react-window`, the `TransactionsTable` now supports thousands of rows without performance degradation by only rendering the items currently in view.

### 3. Dark Mode Implementation
A full dark mode implementation using CSS variables and a custom `useLocalStorage` hook for persistence.

### 4. Chart Integration
Sophisticated data visualization using **Recharts**, featuring custom tooltips and gradient area charts.

### 5. Design System Implementation
A robust design system defined via CSS tokens for consistent spacing, typography, and colors across the entire dashboard.

##  Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Vanilla CSS (CSS Variables for Design Tokens)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: CSS Keyframes + Framer Motion (ready for integration)

##  Architecture Decisions

### 1. Component-Based Design
The UI is split into atomic components (`UI/Card`) and feature-based components (`Dashboard/SummaryCards`). This ensures reusability and separation of concerns.

### 2. Custom Hooks (Mandatory)
- `useFetch`: Centralized logic for data fetching with loading/error/empty states.
- `useAnalytics`: Wrapper for Google Analytics tracking.
- `useDebounce`: Optimized search and filtering logic.
- `useLocalStorage`: Persistent state for user preferences (Theme).

### 3. Performance Optimizations
- **Lazy Loading**: Heavy components like `SpendingChart` and `TransactionsTable` are loaded only when needed using `React.lazy` and `Suspense`.
- **Memoization**: Search results and complex calculations are wrapped in `useMemo` to prevent unnecessary re-renders.
- **CSS Efficiency**: Used CSS variables for a lightweight, scalable design system without the overhead of heavy CSS-in-JS libraries.

### 4. SEO & Accessibility
- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<aside>`, and `<table>`.
- **Meta Tags**: Fully configured Open Graph and Twitter cards in `index.html`.
- **Keyboard Navigation**: Buttons and interactive elements are accessible via keyboard.

##  Analytics Integration

The dashboard tracks the following events:
- `page_load`: Triggered on initial load.
- `search_usage`: Tracks user queries (debounced).
- `filter_clicks`: Tracks interaction with transaction filters.
- `execute_strategy`: Tracks when a user interacts with an AI insight CTA.

##  Trade-offs & Decisions

- **Vanilla CSS vs Tailwind**: Opted for Vanilla CSS to demonstrate core CSS mastery and create a highly customized, "pixel-accurate" design system as requested.
- **Mock Data**: Used a JSON service to simulate API responses, allowing for robust testing of loading and error states.
- **React Native Web**: While the project is built for Web, the component structure is modular enough to be adapted for React Native Web in future iterations.

---
*Built as a Frontend Intern Assignment for Fintech.*
