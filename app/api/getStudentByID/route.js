import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { schoolId } = body;
    console.log(body)
    // Check if the student exists in the database
    const user = await prisma.schoolUsers.findUnique({
      where: { id: schoolId },
    });

    if (user) {
      return new Response(
        JSON.stringify({user}),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ isRegistered: false, message: 'User not found' }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error checking User:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
