# Studio Frontend

A React + Vite application for inventory scanning and issue tracking.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:5173/](http://localhost:5173/)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/       # Reusable UI components
├── views/            # Page-level components
├── styles/           # Global styles and CSS variables
├── db.js             # Database configuration (Dexie/IndexedDB)
├── App.jsx           # Main app component with routing
└── main.jsx          # Entry point
```

## Tech Stack

- React 18+
- Vite
- React Router
- Dexie (IndexedDB wrapper)
- Lucide React (icons)
