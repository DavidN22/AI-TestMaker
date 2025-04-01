import { createServerClient, parseCookieHeader, serializeCookieHeader, } from '@supabase/ssr';
const supabaseUrl = process.env.SUPABSE_URI || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
export const createClient = (context) => {
    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                const cookies = parseCookieHeader(context.req.headers.cookie ?? '');
                return cookies.map(({ name, value }) => ({
                    name,
                    value: value ?? '',
                }));
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => {
                    context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options));
                });
            },
        },
    });
};
