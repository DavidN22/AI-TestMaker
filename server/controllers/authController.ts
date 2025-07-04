import { Request, Response, NextFunction } from "express";
import { pool } from "../db/db.js";
import { CLIENT_URL, API_URL } from "../utils/config.js";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail.js";

export const handleLogin = async ( // Handle login through OAuth
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const supabase = res.locals.supabase; // Access Supabase client instance from locals

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${API_URL}/api/auth/callback`,
      },
    });

    if (error) throw error;

    if (data.url) { // Redirect to the URL provided by Supabase after successful OAuth
      res.redirect(data.url);
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    next(error);
  }
};

export const handleOAuthCallback = async ( // Handle OAuth callback and user session exchange
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = req.query.code as string; // Extract authorization code from the query string

  try {
    if (!code) throw new Error("Authorization code missing");

    const supabase = res.locals.supabase;

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code); // Exchange authorization code for a session
    if (exchangeError) throw exchangeError;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw userError || new Error("User not found");

    const { id: uid, email, user_metadata } = user;

    const existingEmailQuery = "SELECT * FROM users WHERE email = $1"; // Query to check if the user email already exists
    const { rows } = await pool.query(existingEmailQuery, [email]);

    if (rows.length > 0) {
      const existingUser = rows[0];

      if (existingUser.uid !== uid) { 
        const updateQuery = `
          UPDATE users
          SET uid = $1, name = $2
          WHERE email = $3
        `;
        await pool.query(updateQuery, [
          uid,
          user_metadata?.name || "",
          email,
        ]);
      
      } else {
        console.log("User already exists with matching UID in local DB");
      }
    } else {
      const insertQuery = `
        INSERT INTO users (uid, email, name)
        VALUES ($1, $2, $3)
      `;
  await sendWelcomeEmail(email, user_metadata?.name || "there");
      try {
        await pool.query(insertQuery, [uid, email, user_metadata?.name || ""]);
      } catch (err: any) {
        if (err.code === "23505" && err.constraint === "users_uid_key") {
          console.warn("Supabase UID collision detected. Deleting user from Supabase.");
          await supabase.auth.admin.deleteUser(uid); // Delete the user from Supabase to resolve UID collisions
          return res.redirect(`${CLIENT_URL}/home`); // Redirect to the home page after successful login or registration
        } else {
          throw err;
        }
      }
    }

    res.redirect(`${CLIENT_URL}/home`);
  } catch (error) {
    next(error);
  }
};

export const handleLogout = async ( // Handle logout and session termination
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const supabase = res.locals.supabase;

    await supabase.auth.signOut(); // Terminate user session using Supabase
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async ( // Retrieve current user information from Supabase
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const supabase = res.locals.supabase;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) { // Handle scenario where no user is found
      res.json({ user: null });
      return;
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const getUserToken = async ( // Retrieve user token values from the database
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = res.locals.user;
    if (!email) {
      return next(new Error("Unauthorized: User email missing"));
    }

    const result = await pool.query( // Execute query to fetch user tokens based on email
      "SELECT tokens FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return next(new Error("User not found"));
    }

    const token = result.rows[0].tokens;

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
