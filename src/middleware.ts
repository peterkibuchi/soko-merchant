import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";

/** This example protects all routes including `api/trpc` routes.
 * Please edit this to allow other routes to be public as needed.
 *
 * @see https://clerk.com/docs/references/nextjs/auth-middleware
 * for more information about configuring your Middleware
 */
export default authMiddleware({
  signInUrl: "/login",
  publicRoutes: [
    "/login(.*)",
    "/pricing(.*)",
    "/privacy(.*)",
    "/register(.*)",
    "/terms(.*)",
  ],

  afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      // Don't do anything for public routes
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      // User is not signed in
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
});

export const config = {
  /* With this, the entire application is protected; if one tries to access it, 
  they are redirected to the login page. Exceptions are listed above. */
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
