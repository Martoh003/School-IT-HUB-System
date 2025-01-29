-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_headOfDepartmentId_fkey" FOREIGN KEY ("headOfDepartmentId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
