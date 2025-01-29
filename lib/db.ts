import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()



// async function main() {
//   /***********************************/
//   /* SOFT DELETE MIDDLEWARE */
//   /***********************************/

//   prisma.$use(async (params, next) => {
  
//     // Check incoming query type
//     if (params?.model == 'Tickets') {
//       if (params.action == 'update') {
//         // Delete queries
//         // Change action to an update
//         params.action = 'update'
//         params.args['data'] = { deleted: true }
//       }
//       if (params.action == 'deleteMany') {
//         // Delete many queries
//         params.action = 'updateMany'
//         if (params.args.data != undefined) {
//           params.args.data['deleted'] = true
//         } else {
//           params.args['data'] = { deleted: true }
//         }
//       }
//     }
//     return next(params)
//   })

  
// }

// main()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma