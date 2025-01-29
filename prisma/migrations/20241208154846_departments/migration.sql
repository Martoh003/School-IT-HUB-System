-- DropForeignKey
ALTER TABLE "Departments" DROP CONSTRAINT "Departments_headOfDepartmentId_fkey";

-- AlterTable
ALTER TABLE "Departments" ALTER COLUMN "headOfDepartmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_headOfDepartmentId_fkey" FOREIGN KEY ("headOfDepartmentId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
