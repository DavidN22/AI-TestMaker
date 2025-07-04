# Teskro

Teskro is a full-stack web application for generating, taking, and managing AI-powered tests. It features Google OAuth authentication, user management, and a modern React frontend with a Node.js/Express backend and Supabase integration.

---

## Features
- **Google OAuth Authentication** (via Supabase)
- **User Management** (PostgreSQL via Supabase)
- **Test Generation & History**
- **Custom Test Creation**
- **Statistics & Analytics**
- **Responsive UI** (React + Vite)

---

## Project Structure

```
Teskro/
├── client/                  # Frontend (React + Vite)
│   ├── public/              # Static assets (images, favicon, etc.)
│   └── src/
│       ├── components/      # UI components
│       ├── store/           # State management
│       ├── utils/           # Utilities and hooks
│       ├── Types/           # TypeScript types
│       └── ...              # Other frontend code
├── server/                  # Backend (Node.js, Express, Supabase)
│   ├── controllers/         # Route controllers
│   ├── routes/              # API routes
│   ├── db/                  # Database connection
│   ├── middleware/          # Express middleware
│   └── ...                  # Other backend code
├── package.json             # Root scripts and dependencies
├── README.md                # Project documentation
└── ...
```

---
## Global State Management

This application uses Redux Toolkit for global state management. The store is configured with the following slices:

### Core State Slices
- **Auth Slice** (`authSlice.ts`) - Manages user authentication state including:
  - User email, full name, and avatar URL
  - Authentication loading status
  - Login/logout actions

- **Toast Slice** (`toastSlice.ts`) - Handles UI notifications:
  - Success and error message display
  - Toast message types and content
  - Clear message actions

- **Config Slice** (`configSlice.ts`) - Environment-specific configuration:
  - API base URLs (localhost vs production)
  - Frontend base URLs for different environments
  - Automatic environment detection

- **Chat History Slice** (`chatHistorySlice.ts`) - Chatbot conversation management:
  - Message history storage (user and bot messages)
  - Loading states for ongoing conversations
  - Confirmation panel states
  - Message clearing and management

### Filter Management
- **Filter Slice** (`filterSlice.ts`) - Static/predefined test filtering:
  - Search term filtering
  - Provider-based filtering
  - Difficulty level filtering
  - Filter application and clearing

- **Custom Filter Slice** (`customFilterSlice.ts`) - User-created test filtering:
  - Custom test search functionality
  - Difficulty filtering for custom tests
  - Filtered results management

### API State Management (RTK Query)
- **API Slice** (`apiSlice.ts`) - Test results management:
  - Fetches and caches test results data
  - Automatic cache invalidation
  - Infinite cache retention for performance

- **Token API Slice** (`tokenSlice.ts`) - User credit system:
  - Token/credit balance management
  - Token usage tracking
  - Credit-based feature access

- **Custom Tests API** (`customTestsApi.ts`) - User test CRUD operations:
  - Create, read, update, delete custom tests
  - Custom test data caching
  - Test management operations

- **Stats API** (`statsApi.ts`) - Dashboard and analytics:
  - User statistics and performance metrics
  - Dashboard data aggregation
  - Test history analytics

All API slices include automatic error handling via `handleApiError` utility and optimized caching for enhanced performance.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database (for production)
- Supabase project (for authentication)
- Google Cloud project with OAuth 2.0 credentials configured (for Google OAuth setup)

### 1. Clone the repository
```sh
git clone https://github.com/your-username/AI-TestMaker.git
cd AI-TestMaker
```

### 2. Install dependencies
#### Root (for shared scripts):
```sh
npm install
```
#### Client (frontend):
```sh
cd client
npm install
```
#### Server (backend):
```sh
cd ../server
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server/` directory with the following keys:

```
RESEND_API_KEY=your_resend_api_key
DB_URI=your_postgres_connection_string
SUPABSE_URI=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
OPENAI_API_KEY=your_openai_api_key
```

- **RESEND_API_KEY**: For transactional email (welcome emails, etc)
- **DB_URI**: PostgreSQL connection string
- **SUPABSE_URI**: Supabase project URL
- **SUPABASE_ANON_KEY**: Supabase anon/public key
- **GEMINI_API_KEY**: Gemini AI API key (if used)
- **DEEPSEEK_API_KEY**: DeepSeek AI API key (if used)
- **OPENAI_API_KEY**: OpenAI API key (for AI features)

### 4. Database Setup
- Ensure your PostgreSQL database is running.
- Run migrations or create the `users` table as needed (see `server/db/db.ts`).

### 5. Quick Start
- To start both frontend and backend together, run:

```sh
npm start
```

- To start servers individually:
  - Backend: `cd server && npm start`
  - Frontend: `cd client && npm run dev`

- Frontend: [http://localhost:8000](http://localhost:8000)
- Backend: [http://localhost:3000](http://localhost:3000)

---

## Authentication Flow
- Users log in via Google OAuth (Supabase).
- On first login, user info is stored in the supabases managed auth database.
- Session management is handled by Supabase.

---

## Deployment
- Vercel configuration files are present in both `client/` and `server/` for easy deployment.
- **Important:** Before deploying the server to Vercel, make sure to build the server code (`cd server && npm run build`). This ensures Vercel serves the built JavaScript files instead of the TypeScript source files.
- Set environment variables in your deployment platform.

---

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server

---

## Contributing
To contribute:

1. **Fork the repository** on GitHub and clone your fork locally.
2. **Create a new branch** for your feature or bugfix:
   ```sh
   git checkout -b my-feature-branch
   ```
3. **Make your changes** and commit them with clear, descriptive messages.
4. **Push your branch** to your forked repository:
   ```sh
   git push origin my-feature-branch
   ```
5. **Open a Pull Request** from your branch to the `main` branch of this repository. Please provide a clear description of your changes and reference any related issues.
6. For major changes, open an issue first to discuss your proposal before submitting a pull request.

All contributions should follow the existing code style and include relevant documentation or tests where appropriate. Thank you for helping improve AI-TestMaker!

