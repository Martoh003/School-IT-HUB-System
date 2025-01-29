import prisma from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  let {title,description,priority,raisedBy,department,type,escalation,status} = res;

  const depRes = await prisma.departments.findMany({
    where:{
        name:department
    }
  })
  console.log(depRes.length)
    let departmentId = depRes[0].id
  let resPrisma = await prisma.tickets.create({
    data:{
        title: title,
        description:description,
        priority:priority,
        raisedById:raisedBy,
        departmentId:departmentId,
        type:type,
        escalation:escalation,
        status:status,

    }
  })

  return Response.json({ resPrisma })
}