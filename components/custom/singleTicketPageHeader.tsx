import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  import { ChevronsUpDown } from "lucide-react"
  import { MoveLeft} from   "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { title } from "process"

  export function SingePageTicketHeader({ticket}:{ticket:any}){
    const [isOpen, setIsOpen] = useState(false)
    const {data:session} = useSession()
    console.log(ticket)
    return(
        <div className="flex gap-4 flex-col p-3 justify-between items-start md:flex-row">
            <div>
            <SheetClose className="flex items-center font-bold text-sm">
            <MoveLeft className="w-[25px] inline mr-2"/>
            Ticket List
            </SheetClose>
            </div>
            <div className="flex flex-col justify-start gap-4 items-center"> 
            <div className="flex gap-3 ">
            <SheetTitle className="text-base md:text-3xl">#{ticket.type} {ticket.id}</SheetTitle>
            <Badge variant={"secondary"} ><SheetDescription>{ticket.title}</SheetDescription>  </Badge>
            </div>
            <div className="">
            <p className="w-full md-w-1/4 text-base font-semibold leading-relaxed text-gray-900 dark:text-white">{ticket.description}</p>
            </div>
            </div>
            
            
            <div className="flex flex-row">
               
            {
             session?.user?.name?.split(",")[2] =="STUDENT"?<Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-[200px] space-y-2"
            >
            
              <div className="flex gap-[1px] items-center">
              <Button size={"default"} className="mr-0 rounded-r-none border-r-white" variant={"default"}>Confirm Solved</Button>
                <CollapsibleTrigger asChild className="rounded-l-none border-l-white">
                  <Button variant="default" className="">
                    <ChevronsUpDown className="h-4 w-4 " />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
           
              <CollapsibleContent className="space-y-2">
              <Button className="block w-full" variant={"outline"}>Forward</Button>
              <Button className="block w-full" variant={"outline"}>Inactive</Button>
              </CollapsibleContent>
            </Collapsible>
         :
            
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-[200px] space-y-2"
            >
            
              <div className="flex gap-[1px] items-center">
              <Button size={"default"} className="mr-0 rounded-r-none border-r-white" variant={"default"}>Submit as Closed</Button>
                <CollapsibleTrigger asChild className="rounded-l-none border-l-white">
                  <Button variant="default" className="">
                    <ChevronsUpDown className="h-4 w-4 " />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
           
              <CollapsibleContent className="space-y-2">
              <Button className="block w-full" variant={"outline"}>ReAssign</Button>
              <Button className="block w-full" variant={"outline"}>Inactive</Button>
              </CollapsibleContent>
            </Collapsible>
             }
             
            </div>
        </div>

    )
  }