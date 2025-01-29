'use client'

import { CreateTaskForm } from "@/components/custom/createTaskForm";
import { CreateTicketForm } from "@/components/custom/createTicketForm";
import { KnowledgeBaseContent } from "@/components/custom/knowlegeBase";
import { SingePageTicketPage } from "@/components/custom/singleTicketPage";
import {SignOut} from "@/components/custom/signout";
export default function Home(props) {
  return (
 
  <div className="  ">
    <SignOut/>
    {/* Signin Form */}
    {/* <CreateTicketForm/> */}
    {/* <CreateTaskForm/> */}
    {/* <KnowledgeBaseContent/> */}
    <SingePageTicketPage/>
    
  </div>
  );
}
