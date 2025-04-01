import { createClient } from "../utils/supabaseServerClient.js";
export const decodeUserMiddleware = async (req, res, next) => {
    try {
        const supabase = createClient({ req, res });
        const { data: { user }, error, } = await supabase.auth.getUser();
        if (!user || error) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        res.locals.user = user.email;
        res.locals.uid = user.id;
        next();
    }
    catch (error) {
        next(error);
    }
};
