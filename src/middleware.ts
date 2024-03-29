import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  signInUrl: "/login",
  publicRoutes: [
    "/api/:path*", // Allow API routes to be public. Routes that require authentication/authorization will still be protected in the API Layer.
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
