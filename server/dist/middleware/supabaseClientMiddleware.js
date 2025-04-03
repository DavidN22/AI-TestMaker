import { createClient } from "../utils/supabaseServerClient.js";
export const supabaseClientMiddleware = (req, res, next) => {
    res.locals.supabase = createClient({ req, res });
    next();
};
