import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { SingePageTicketHeader } from "./singleTicketPageHeader"
import { SingePageTicketBody } from "./singeTicketPageBody"
import { Separator } from "@/components/ui/separator"
import { any } from "zod"


  export function SingePageTicketPage({row,ticket}:{row:any,ticket:any}){
    return(
    <Sheet >
  <SheetTrigger>{row}</SheetTrigger>
 
  <SheetContent className="min-w-full ">
    <SheetHeader>
    <SingePageTicketHeader ticket={ticket}/>
    </SheetHeader>
    <Separator />

    <SheetFooter className="w-full">
        <SingePageTicketBody />
    </SheetFooter>
  </SheetContent>
</Sheet>

    )
  }