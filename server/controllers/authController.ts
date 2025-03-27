import { Request, Response, NextFunction } from "express";
import { createClient } from "../utils/supabaseServerClient.ts";
import { pool } from "../db/db.ts"; 

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supabase = createClient({ req, res });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/api/auth/callback",
      },
    });

    if (error) throw error;

    if (data.url) {
      res.redirect(data.url);
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    next(error);
  }
};

export const handleOAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
  const code = req.query.code as string;

  try {
    if (code) {
      const supabase = createClient({ req, res });
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) throw exchangeError;

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError || new Error("User not found");

      const checkQuery = "SELECT * FROM users WHERE uid = $1";
      const checkResult = await pool.query(checkQuery, [user.id]);

      if (checkResult.rows.length === 0) {
        const insertQuery = `
          INSERT INTO users (uid, email, name)
          VALUES ($1, $2, $3)
        `;
        await pool.query(insertQuery, [
          user.id,
          user.email,
          user.user_metadata?.name || "",
        ]);
        console.log("User inserted into local DB");
      } else {
        console.log("User already exists in local DB");
      }
    }

    res.redirect("http://localhost:8000/home");
  } catch (error) {
    next(error);
  }
};
export const handleLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supabase = createClient({ req, res });
    await supabase.auth.signOut();
    res.redirect("http://localhost:8000/home");
  } catch (error) {
    next(error);
  }
};


export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("hit")
    const supabase = createClient({ req, res });
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};
