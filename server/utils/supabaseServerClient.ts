import {
    createServerClient,
    parseCookieHeader,
    serializeCookieHeader,
  } from '@supabase/ssr';
  import type { Request, Response } from 'express';

  const supabaseUrl = process.env.SUPABSE_URI || "";
  const supabaseAnonKey =process.env.SUPABASE_ANON_KEY || "";
  interface SupabaseContext {
    req: Request;
    res: Response;
  }
  
  export const createClient = (context: SupabaseContext) => {
    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll(): { name: string; value: string }[] {
          const cookies = parseCookieHeader(context.req.headers.cookie ?? '');
          return cookies.map(({ name, value }) => ({
            name,
            value: value ?? '',
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            context.res.appendHeader(
              'Set-Cookie',
              serializeCookieHeader(name, value, options)
            );
          });
        },
      },
    });
  };
  