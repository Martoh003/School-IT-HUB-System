import prisma from "@/lib/db";
import { SchoolUsers } from "@prisma/client";


export async function getShoolUserById(id:string){
return  prisma.schoolUsers.findUnique({
    where:{
        id:id
    },
})

}