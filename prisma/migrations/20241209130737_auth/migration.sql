/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departmentId` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Units` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseEnrollments" DROP CONSTRAINT "CourseEnrollments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Departments" DROP CONSTRAINT "Departments_headOfDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_studentId_fkey";

-- DropForeignKey
ALTER TABLE "SemesterEnrollments" DROP CONSTRAINT "SemesterEnrollments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TicketTasks" DROP CONSTRAINT "TicketTasks_assignedToUserId_fkey";

-- DropForeignKey
ALTER TABLE "TicketTasks" DROP CONSTRAINT "TicketTasks_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_raisedById_fkey";

-- DropForeignKey
ALTER TABLE "UnitEnrollments" DROP CONSTRAINT "UnitEnrollments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_departmentId_fkey";

-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "departmentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Units" ADD COLUMN     "teacherId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "SchoolUsers" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "SchoolUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolUsers_id_key" ON "SchoolUsers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolUsers_email_key" ON "SchoolUsers"("email");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolUsers" ADD CONSTRAINT "SchoolUsers_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolUsers" ADD CONSTRAINT "SchoolUsers_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_headOfDepartmentId_fkey" FOREIGN KEY ("headOfDepartmentId") REFERENCES "SchoolUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollments" ADD CONSTRAINT "CourseEnrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "SchoolUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Units" ADD CONSTRAINT "Units_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "SchoolUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitEnrollments" ADD CONSTRAINT "UnitEnrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "SchoolUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemesterEnrollments" ADD CONSTRAINT "SemesterEnrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "SchoolUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "SchoolUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_raisedById_fkey" FOREIGN KEY ("raisedById") REFERENCES "SchoolUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "SchoolUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTasks" ADD CONSTRAINT "TicketTasks_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "SchoolUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTasks" ADD CONSTRAINT "TicketTasks_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "SchoolUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
