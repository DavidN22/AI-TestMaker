import { Request, Response, NextFunction } from "express";
import { createClient } from "../utils/supabaseServerClient.js";
//This middleware is just to create the client and is not doing any auth checks
export const supabaseClientMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.locals.supabase = createClient({ req, res });
  next();
};
