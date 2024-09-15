import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, redirectToLogin } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./config";
import { isPublicPath, PUBLIC_PATHS } from "./lib/infra/publicPath";


export async function middleware(request: NextRequest) {
    return authMiddleware(request, {
        loginPath: "/api/login",
        logoutPath: "/api/logout",
        apiKey: clientConfig.apiKey,
        cookieName: serverConfig.cookieName,
        cookieSignatureKeys: serverConfig.cookieSignatureKeys,
        cookieSerializeOptions: serverConfig.cookieSerializeOptions,
        serviceAccount: serverConfig.serviceAccount,
        
        handleValidToken: async ({ token, decodedToken }, headers) => {
            if(request.nextUrl.pathname == '/') {
                return NextResponse.redirect('/dashboard');
            }

            return NextResponse.next({
                request: {
                    headers
                }
            });
        },

        handleInvalidToken: async (reason) => {
            console.info('Missing or malformed credentials', { reason });

            if (isPublicPath(request.nextUrl.pathname, PUBLIC_PATHS)) {
                // Deixa acessar as rotas públicas, mesmo sem token válido
                return NextResponse.next(); 
            }

            return redirectToLogin(request, {
                path: '/login',
                publicPaths: PUBLIC_PATHS
            });
        },

        handleError: async (error) => {
            console.error('Unhandled authentication error', { error });

            if (isPublicPath(request.nextUrl.pathname, PUBLIC_PATHS)) {
                // Deixa acessar as rotas públicas, mesmo sem token válido
                return NextResponse.next(); 
            }

            return redirectToLogin(request, {
                path: '/login',
                publicPaths: PUBLIC_PATHS
            });
        }
    });
}

export const config = {
    matcher: [
        "/",
        "/((?!_next|api|.*\\.).*)",
        "/api/login",
        "/api/logout",
    ],
};