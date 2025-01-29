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
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CreateTaskForm } from "./createTaskForm";
  
  

export function Tasks(){
     let {data:session} = useSession();
  let [userData,setUserData]=useState(session?.user)
  let [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => {
    setUserData(session?.user)
    let userId =  userData?.name?.split(",")[3]
    console.log(userData)
    fetch("/api/getTicketTask",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ticketId:2 }),
    })
          .then(async response => {  
            return response.json()})
          .then(data =>{
            console.log(data)
            console.log(data.resPrisma,"Tasks")
            setTasks(data.resPrisma || [])
          } );
  }, [session]);
    return (
        <>
        <div className="flex flex-col px-6 justify-start">
            <div className="flex justify-end">
            <Dialog>
  <DialogTrigger className="py-2 px-4 bg-blue-600 rounded-md text-white" >Create Ticket</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        
      </DialogTitle>
    </DialogHeader>
    <CreateTaskForm/>
  </DialogContent>
  
</Dialog>
            </div>
            <div >

    <Table>
      <TableCaption>All Tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead >Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assigned To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.id}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.assigned_to.id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>


            </div>
        </div>
        </>
    )
}