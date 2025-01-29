'use client'

import { CreateTaskForm } from "@/components/custom/createTaskForm";
import { CreateTicketForm } from "@/components/custom/createTicketForm";
import { KnowledgeBaseContent } from "@/components/custom/knowlegeBase";
import { SingePageTicketPage } from "@/components/custom/singleTicketPage";
import {SignOut} from "@/components/custom/signout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import { any } from "zod";
import { Button } from "@/components/ui/button";


export default function TicketsTable(props) {
  let {data:session} = useSession();
  let [userData,setUserData]=useState(session?.user)
  let [tickets, setTickets] = useState<any[]>([]);
  useEffect(() => {
    setUserData(session?.user)
    let userId =  userData?.name?.split(",")[3]
    console.log(userData)
    fetch("/api/getTickets",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id:userId }),
    })
          .then(async response => {  
            return response.json()})
          .then(data =>{
            console.log(data.resPrima)
            setTickets(data.resPrima || [])
          } );
  }, [session]);

  
  return (
    <div className="flex flex-col gap-6 p-10">
      <div className="flex flex-row justify-end">
      <Dialog>
  <DialogTrigger className="py-2 px-4 bg-blue-600 rounded-md text-white" >Create Ticket</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        
      </DialogTitle>
    </DialogHeader>
    <CreateTicketForm/>  
  </DialogContent>
</Dialog>

      
      </div>
      <Table >
      <TableCaption>Tickets List</TableCaption>
      <TableHeader>
        <TableRow >
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Descirption</TableHead>
          <TableHead >Type</TableHead>
          <TableHead >Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket?.id}>
            <TableCell className="font-medium">{ticket?.id}</TableCell>
            <TableCell>{ticket?.title}</TableCell>
            <TableCell>{ticket?.description}</TableCell>  
            <TableCell >{ticket?.type}</TableCell>
            <TableCell>{ticket?.status}</TableCell>
            <TableCell>{ticket?.priority}</TableCell>
            <TableCell ><SingePageTicketPage row = {<EyeIcon/>} ticket = {ticket}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        
      </TableFooter>
    </Table>
    </div>
    
  )
}
