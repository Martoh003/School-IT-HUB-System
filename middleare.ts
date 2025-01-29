import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "./lib/db";
import { getSession } from "next-auth/react";
// authjs.session-token
import { parse } from "cookie"; // To parse the cookies

export async function middleware(req) {
  // Extract the session token from cookies (default name is 'next-auth.session-token')
  const cookies = parse(req.headers.get("cookie") || "");
  const sessionToken = cookies["authjs.session-token"]; // Check if this is your session cookie name

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Query the database for the session based on the session token
  const session = await prisma.session.findUnique({
    where: {
      sessionToken: sessionToken, // You can change this if you have a custom token field
    },
    include: {
      user: {
        select:{
          id:true,
          schooluser:true,
        }
      }, 
      
  // Include the user associated with the session
    },
  });
  console.log(session?.user)

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url)); // Redirect to sign-in page if no session found
  }

  // The session is found, proceed with the request, and add the session user info to the request headers
  const user = session.user;

  // Optionally, you can set user data in the response or add it to headers
  const response = NextResponse.next();
  response.headers.set("x-user-id", user.id); // Example, customize according to your needs

  return response;
}

// Configure which routes this middleware applies to
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*","/"], // Protect paths for authenticated users
};
