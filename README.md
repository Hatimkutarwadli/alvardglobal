# Alvard Global

A modern, high-performance landing page for **Alvard Global**, featuring a premium design with smooth animations, interactive elements, and a global logistics focus.

![Landing Page Preview](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000)

## ✨ Features

-   **Hero Section**: Dynamic impact statement with high-end aesthetic.
-   **Interactive Shipping Globe**: A custom WebGL-based globe (`react-globe.gl`) visualizing global shipping routes and data.
-   **Journey Timeline**: Scroll-animated section detailing the company's evolution and milestones.
-   **Product Showcase**: Animated grid highlighting key services and products.
-   **Marquee Banner**: Seamless infinite scrolling banner for quick information delivery.
-   **Premium Animations**: Implemented using **Framer Motion** for a fluid user experience.
-   **Theme Support**: Integrated light/dark mode support with a custom theme hook.
-   **Contact & Footer**: Professional layout with form integration and social links.

## 🚀 Tech Stack

-   **Frontend**: [React 18](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (based on Radix UI)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Visualization**: [react-globe.gl](https://github.com/vasturiano/react-globe.gl)
-   **State Management**: [TanStack Query](https://tanstack.com/query/latest)
-   **Form Handling**: React Hook Form & Zod
-   **Testing**: Vitest & Playwright

## 📂 Project Structure

```text
alvardglobal/
├── frontend/
│   ├── src/
│   │   ├── components/       # UI & Logic components
│   │   │   └── ui/          # Shared Shadcn UI components
│   │   ├── hooks/            # Custom React hooks (theme, animations)
│   │   ├── pages/            # Page-level components
│   │   ├── lib/              # Utility functions
│   │   ├── data/             # Static data (shipping routes, journey)
│   │   ├── App.tsx           # Main application router
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   └── playwright/           # E2E tests
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Hatimkutarwadli/alvardglobal.git
    cd alvardglobal
    ```

2.  Install dependencies:
    ```bash
    cd frontend
    npm install
    ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Build

Create a production-ready build:

```bash
npm run build
```

## 🧪 Scripts

-   `npm run dev`: Start Vite development server.
-   `npm run build`: Build for production.
-   `npm run lint`: Run ESLint checks.
-   `npm run test`: Run unit tests with Vitest.
-   `npm run preview`: Preview the production build locally.

---


