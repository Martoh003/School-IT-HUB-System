import prisma from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tid: string }> }
) {
  const tid = (await params).tid // 'a', 'b', or 'c'
  console.log(tid)
  let result = await prisma.tickets.findFirst({
    where:{
      id:parseInt(tid)
    }
  })
 
  return Response.json({result})
}