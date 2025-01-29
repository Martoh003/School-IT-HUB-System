"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Textarea } from "@/components/ui/textarea"


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
import { title } from "process"
const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }).max(50,{message: "The Title cannot be more than 50characters"}),
  description: z.string().min(10,{message:"The description is too short"})
  .max(150,{message:"The description cannot be longer that 150 characters"}),
  department: z.enum(["General","Reception","Finance","ICT","Education"]),
  priority:z.enum(['NORMAL','HIGH',"CRITICAL"])
})

export function CreateTaskForm() {
  const{data:session} = useSession()
    const { toast } = useToast()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description:"",
      department:"General",
      priority:"NORMAL"
    },
  })
return(<Card className="md:max-w-[600px] mx-auto my-0 ">
    <CardHeader>
        <CardTitle className="text-3xl">Create Task</CardTitle>
        <CardDescription className="text-base">Tasks are to help you in areas that is beyond your jurisdiction</CardDescription>
    </CardHeader>
    <CardContent>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">Title</FormLabel>
          <FormControl>
            <Input placeholder="Whats up?" {...field}  className="py-6 md:text-base"   />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <div className="flex md:gap-3 md:flex-row  flex-col gap-6">
    <FormField
      control={form.control}
      name="department"
      render={({ field }) => (
        <FormItem className="md:w-7/12">
          <FormLabel className="text-base">Department</FormLabel>
          <FormControl>
            <Select>
                <SelectTrigger className="py-6 md:text-base">
                    <SelectValue placeholder="What department does this belong to?"/>
                </SelectTrigger>
                <SelectContent>
                    {formSchema.shape.department.options.map((option)=>(
                         <SelectItem className="py-6 md:text-base" key={option} value={option}>
                         {option}
                     </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem className="md:w-5/12">
          <FormLabel className="text-base">Priority</FormLabel>
          <FormControl>
            <Select>
                <SelectTrigger className="py-6 md:text-base">
                    <SelectValue placeholder="Task Priority"/>
                </SelectTrigger>
                <SelectContent>
                    {formSchema.shape.priority.options.map((option)=>(
                         <SelectItem className="py-6 md:text-base" key={option} value={option}>
                         {option}
                     </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    </div>
     <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Tell us more..." {...field} rows={3}  className="py-3 md:text-base"   />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <div className="flex justify-end gap-4">
    <Button variant={"outline"} className=" text-base" type="button">Cancel</Button>
    <Button className=" text-base" type="submit">Create Ticket</Button>
    </div>
    {/* {session?.user?.email} */}
  </form>
</Form>
    </CardContent>
 
</Card>)


function onSubmit(values:z.infer<typeof formSchema>){

}

}