import prisma from "@/lib/db"

export async function GET(request: Request) {
  let resPrima = await prisma.departments.findMany();

  return Response.json({ resPrima })
}