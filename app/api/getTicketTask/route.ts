import prisma from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  let resPrisma = await prisma.ticketTasks.findMany({
    where:{
      ticketId: res.ticketId
    },
    include:{
        assigned_to:true
    }
  })
  console.log(resPrisma)
  return Response.json({ resPrisma })
}