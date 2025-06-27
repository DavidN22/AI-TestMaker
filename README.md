# AI-TestMaker

AI-TestMaker is a full-stack web application for generating, taking, and managing AI-powered tests. It features Google OAuth authentication, user management, and a modern React frontend with a Node.js/Express backend and Supabase integration.

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
AI-TestMaker/
├── client/         # Frontend (React, Vite)
├── server/         # Backend (Node.js, Express, Supabase)
├── package.json    # Root scripts and dependencies
├── README.md       # Project documentation
└── ...
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database (for production)
- Supabase project (for authentication)

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

### 5. Start the Development Servers
#### Start Backend:
```sh
cd server
npm run dev
```
#### Start Frontend:
```sh
cd ../client
npm run dev
```
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
- Set environment variables in your deployment platform.

---

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)