import prisma from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  console.log(res.user_id);
  let resPrima = await prisma.tickets.findMany({
    where:{
     OR:[
      { raisedById:res.user_id},
      {assignedToId:res.user_id}]
    }
  })

  return Response.json({ resPrima })
}