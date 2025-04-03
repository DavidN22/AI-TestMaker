import { Request, Response, NextFunction } from "express";
import { createClient } from "../utils/supabaseServerClient.js";

export const supabaseClientMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.locals.supabase = createClient({ req, res });
  next();
};
