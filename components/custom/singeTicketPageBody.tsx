import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KnowledgeBaseContent } from "./knowlegeBase"
import { Separator } from "../ui/separator"
import { Tasks } from "./task"
export function SingePageTicketBody(){
    return(
        
    <Tabs defaultValue="conversation" className="w-full">
  <TabsList className="pt-[20px] w-full flex justify-center bg-transparent  rounded-none  ">
    <TabsTrigger  value="conversation">Conversation</TabsTrigger>
    <TabsTrigger value="tasks">Tasks</TabsTrigger>
    <TabsTrigger value="activitylogs">Activity Logs</TabsTrigger>
  </TabsList>
  <div className="flex flex-col md:h-screen md:flex-row">
  <TabsContent className="w-full md:w-3/4  pt-4" value="conversation">Make changes to your account here.</TabsContent>
  <TabsContent className="w-full md:w-3/4  pt-4" value="tasks">
  <Tasks/>
  </TabsContent>
  <TabsContent className="w-full md:w-3/4  pt-4" value="activitylogs">Change your password here.</TabsContent>
  <Separator orientation="vertical"  />
  <KnowledgeBaseContent className="md:w-1/4 p-7 w-full"/>
  </div>
 
</Tabs>
   
        
    )
  }