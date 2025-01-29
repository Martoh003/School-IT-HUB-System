import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import Nodemailer from "next-auth/providers/nodemailer"
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
  ],
  session: {
    strategy: "database", // Store sessions in the database
    maxAge: 30 * 24 * 60 * 60, // Session lifetime (30 days in seconds)
    updateAge: 24 * 60 * 60, // Frequency of session updates
  },
  callbacks: {
    async jwt({ token, user }) {
    
      // Only needed for custom JWT handling; optional with database strategy
      if (user) {
        token.id = user.id;
        token.email = user.email; // Add user role to the JWT token
      }
      return token;
    },
    async session({ session, user }) {
      const users = await prisma.schoolUsers.findUnique({
        where: { email:user.email },
      });
      // Attach user data to the session object
      session.user.id = user.id;
      session.user.email = user.email; // Example: adding a user role
      session.user.name = `${users?.first_name},${users?.last_name},${users?.role},${users?.id},${users?.phone},${users?.departmentId}`
      return session;
    },
    
  },
  secret:process.env.AUTH_SECRET
})
