import { createClient } from "../utils/supabaseServerClient.js";
//This middleware is just to create the client and is not doing any auth checks
export const supabaseClientMiddleware = (req, res, next) => {
    res.locals.supabase = createClient({ req, res });
    next();
};
