"use client"
import * as React from "react"
import {Notebook,BookOpenCheck,Calendar, LayoutDashboard, Tickets, Search,MessagesSquare, Settings,Users,GraduationCap,BriefcaseBusiness,BookUser,Ruler, icons} from "lucide-react"
import { SearchForm } from "@/components/search-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Admin",
      url: "#",
      items:  [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
          role:"all",
          isActive: true
        },
        {
          title: "Students",
          url: "#",
          icon:Users ,
          role:"admin",
          isActive: false
        },
        {
          title: "Lecturers",
          url: "#",
          icon: GraduationCap ,
          role:"admin",
          isActive: false
        },
        {
          title: "Staff",
          url: "#",
          icon: BriefcaseBusiness,
          role:"admin",
          isActive: false
        },
        {
          title: "Courses",
          url: "#",
          icon: BookUser,
          role:"admin",
          isActive: false
        },
        {
          title: "Units",
          url: "#",
          icon: Ruler,
          role:"admin",
          isActive: false
        },
        {
          title: "Attendance",
          url:"#",
          icon: BookOpenCheck,
          role:"admin",
          isActive: false
        },
        {
          title:"Exams",
          url:"#",
          icon: Notebook,
          role:"admin",
          isActive: false
        },
        {
          title: "Chats",
          url: "chats",
          icon: Calendar  ,
          role:"all",
          isActive: false
        },
        {
          title: "Tickets",
          url: "/tickets",
          icon: Tickets,
          role:"all",
          isActive: false
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
   const{data:session} = useSession()
  return (
    (<Sidebar {...props} className="text-sm lg:w-[16%] xl:w-[12%]" >
      <SidebarHeader>
      <Link href="/" className="flex  items-center justify-start lg:justify-start gap-2 p-3">
                <Avatar>
                <AvatarImage src ="/Logo.png"/>
                <AvatarFallback>SC</AvatarFallback>
             </Avatar>
             <span className="hidden lg:block">SCHEDULIX</span>
                </Link>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent className="text-gray-500">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="font-light" >{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  if(session?.user?.name.split(",")[2].toLowerCase() == item.role ||item.role =="all"){
                    return <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                    
                      <Link href={item.url} className="flex items-center justify-start gap-4 "><span>{<item.icon className="w-[15px]"/>}</span> <span>{item.title}</span>  </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  }
                  else{
                    return ""
                  }
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
