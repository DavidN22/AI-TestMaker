# Tailwind + Vite + React + Express Boilerplate (Typescript)

A boilerplate for a Vite (React) frontend and Express backend in Typescript.

## Setup

1. **Clone the Repo and Reset repo history for you:**
   ```bash
   git clone <repo-url> your-project-name
   cd your-project-name
   ```
1. **Make sure you select correct branch before next step!:**

    Show branches:
   ```bash
   git branch --all
    ```
    Change branches:
   ```bash
   git switch <branch name>  
   ```

2. **Reset repo history for you (Powershell command):**
   ```bash
   Remove-Item -Recurse -Force .git
   ```
3. **Install Dependencies:**
      ```bash
    npm install
   ```
4. **Initialize your new repo:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

5. **Create a newly made copy in your repo:**
   ```bash
   git branch -M main
   git remote add origin <your origin>
   git push -u origin main
   ```



## Running the Project

Start both server (port 3000) and client (port 8000) concurrently:
npm start - In the root directory

- Access the app: `http://localhost:8000`
- API Proxy: `http://localhost:3000/api`
