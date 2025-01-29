"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import prisma  from "@/lib/db"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useState } from "react"
const formSchema = z.object({
  schoolId: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
})

export function SignInForm() {
  const{data:session} = useSession()
    const { toast } = useToast()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolId: "",
    },
  })

  return (
    <Card className="max-w-[400px] mx-auto my-0 radius-2xl">
        <CardHeader>
            <CardTitle className="text-3xl">Sign In</CardTitle>
            <CardDescription className="text-base">This will only work if you are a registered member of Zetech University</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="schoolId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Username</FormLabel>
              <FormControl>
                <Input placeholder="BSCIT-05....." {...field}  className="py-6 md:text-base"   />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full text-base" type="submit">SIGN IN</Button>
        {session?.user?.email}
      </form>
    </Form>
        </CardContent>
     
    </Card>
   
  )
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let {schoolId} = values
    console.log(schoolId)
    //Check database for school Id
    let response = await fetch("/api/getStudentByID",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ schoolId:schoolId }),
    })
    if(response.ok && response.status == 200){
      let data = await response.json()
       console.log(data);
      let {email} = data.user 
      console.log(email)
      // Get the email and add it to the signIn
      const signInResponse = await signIn("nodemailer",{
        email:email,
        callbackUrl:`http://localhost:3000`,
        redirect:false,
    })
    toast({
      title: "The email has been sent to your email",
      description: `Email has been sent to your registered email ${email.substring(0,3)}****`,
    })
    }
    else if(response.status==404){
        toast({
            title: "Not Registered!",
            description: "Could not find you school ID",
          })
      form.reset()
      return
    }
    else{
      toast({
        title: "Error!",
        description: "Something happened on our end. Please try again later",
      })
    }
    

    //If the school Id exists, get email of the student and call signIn
   
  }
}
