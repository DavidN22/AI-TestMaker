const isDev = process.env.NODE_ENV !== "production";
export const CLIENT_URL = isDev ? "http://localhost:8000" : "https://teskro.com";
export const API_URL = isDev ? "http://localhost:3000" : "https://api.teskro.com";
