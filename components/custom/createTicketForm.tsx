"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  DialogClose
} from "@/components/ui/dialog"
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
async function getAllDepartments(){
  let res = await fetch("/api/getDepartments",{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  let data = await res.json()
  console.log(data.resPrima)
  return data.resPrima
}
const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }).max(50,{message: "The Title cannot be more than 50characters"}),
  description: z.string().min(10,{message:"The description is too short"})
  .max(150,{message:"The description cannot be longer that 150 characters"}),
  type: z.enum(["HELPDESK","REPORT"]),
  department: z.enum((await getAllDepartments()).map((d)=>{return d.name}))

})

export function CreateTicketForm() {
 
  const{data:session} = useSession()
    const { toast } = useToast()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description:"",
      type:"HELPDESK",
      department:"School of ICT, Media & Engineering"
    },
  })
return(<Card className="md:max-w-[800px] mx-auto my-0 ">
    <CardHeader>
        <CardTitle className="text-3xl">Create Ticket</CardTitle>
        <CardDescription className="text-base">Before you create a ticket have a look at our knowledge to see if your query has already been answered/solved!</CardDescription>
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
    <div className="flex md:gap-3 md:flex-row  flex-col gap-6 flex-wrap">
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="md:w-5/12">
          <FormLabel className="text-base">Type</FormLabel>
          <FormControl>
            <Select>
                <SelectTrigger className="py-6 md:text-base">
                    <SelectValue placeholder="Select the ticket type"/>
                </SelectTrigger>
                <SelectContent>
                    {formSchema.shape.type.options.map((option)=>(
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
      name="department"
      render={({ field }) => (
        <FormItem className="md:w-7/12 relative">
          <FormLabel className="text-base">Department</FormLabel>
          <FormControl>
            <Select  onValueChange={field.onChange}  {...field}>
                <SelectTrigger className="py-6 md:text-base">
                    <SelectValue placeholder="Select the Department">{field.value}</SelectValue>
                </SelectTrigger>
                <SelectContent className=" ">
                    {formSchema.shape.department.options.map((option:{option:any})=>(
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
    <DialogClose> <span  className=" text-base" type="button">Cancel</span></DialogClose>
    <Button className=" text-base" type="submit">Create Ticket</Button>
    </div>
    {/* {session?.user?.email} */}
  </form>
</Form>
    </CardContent>
 
</Card>)


async function onSubmit(values:z.infer<typeof formSchema>){
  while(session == null){
    console.log("wait")
  }
  let res = await fetch("/api/createTicket",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({raisedBy:session?.user?.name.split(",")[3],title:values.title,description:values.description,department:values.department,type:values.type,priority:"NORMAL",status:"UNREAD",escalation:"NONE" }),
  })
     if(res.status == 200){
      toast({
        title: "The Ticket is successfully created",
        description: `You can chat once someone has been assigned `,
      })
     }   
}

}