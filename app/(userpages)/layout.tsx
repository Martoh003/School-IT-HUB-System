'use client'

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset,SidebarTrigger} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge"
import {User} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import  {usePathname} from "next/navigation"
import { Fragment } from "react";
import { Link } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOut } from "@/components/custom/signout";

export default function DashboardLayout({ children }) {
    const paths = usePathname();
    const pathNames = paths.split("/").filter(s=> s);
    const{data:session} = useSession()

    return (
        <SidebarProvider
        style={{
            "--sidebar-width": "12rem",
            "--sidebar-width-mobile": "20rem",
          }}>
            
        <AppSidebar/>
        <SidebarInset>
        <header className="flex justify-between items-center px-4 text-gray-900 mb-8 " >
            <div className="flex h-16 shrink-0 items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <div className="flex items-center justify-center gap-4 mr-3 lg:mr-6">
                <div className="flex flex-col items-center justify-center">
                    <span className="text-sm lg:text-base">{`${session?.user?.name?.split(",")[0]} ${session?.user?.name?.split(",")[1]}`}</span>
                    <Badge  className="text-[12px] text-right text-gray-500 " variant="outline">{session?.user?.name?.split(",")[2]}</Badge>
                </div>
                    <DropdownMenu >
                      <DropdownMenuTrigger>
                      <Avatar className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center">
                      <AvatarImage href="" />
                    <AvatarFallback><User/></AvatarFallback>
                    </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent >
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><SignOut/></DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                
            </div>
          
        </header>
        {/* <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div> */}
      <div className="pl-3 pr-3 lg:pr-0">{children}</div>
      </SidebarInset>
        </SidebarProvider>
        
        // <div className="h-screen flex p-">
        //     <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-blue-300" >
                
              
            
        //     </div>
        //   {/* {children} */}
        //     <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-pink-300">r</div>
      
        // </div>
        
   
    );
  }