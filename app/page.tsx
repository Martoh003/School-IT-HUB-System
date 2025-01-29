'use client'
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SignInForm } from "@/components/custom/signinform";

export default function Home() {

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      redirect("/auth/login")
    },
  })
  console.log(status)
  if (status === "loading") {
    return "Loading or not authenticated..."
  }
  else{
    redirect("/dashboard")
  }
  
}
