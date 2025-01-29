-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'STAFF', 'ADMIN');

-- CreateEnum
CREATE TYPE "COURSESTATUS" AS ENUM ('INPROGRESS', 'DEFFERED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PRIORITY" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('HELPDESK', 'REPORT');

-- CreateEnum
CREATE TYPE "EscalationLevel" AS ENUM ('NONE', 'DELAYED', 'REASSIGNED1', 'REASSIGNED2');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('UNREAD', 'OPENED', 'INPROGRESS', 'INACTIVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TASKSTATUS" AS ENUM ('NOTSTARTED', 'INPROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headOfDepartmentId" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseEnrollments" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "date_enrolled" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "COURSESTATUS" NOT NULL DEFAULT 'INPROGRESS',

    CONSTRAINT "CourseEnrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Units" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "course_year" INTEGER NOT NULL,
    "course_semester" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitEnrollments" (
    "id" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "UnitEnrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semesters" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Semesters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SemesterEnrollments" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "SemesterEnrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exams" (
    "id" SERIAL NOT NULL,
    "date_done" TIMESTAMP(3) NOT NULL,
    "unitId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,

    CONSTRAINT "Exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "marks" DECIMAL(65,30) NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL,
    "examId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketChats" (
    "id" TEXT NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "TicketChats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "PRIORITY" NOT NULL DEFAULT 'NORMAL',
    "raisedById" TEXT NOT NULL,
    "assignedToId" TEXT,
    "type" "TicketType" NOT NULL DEFAULT 'HELPDESK',
    "escalation" "EscalationLevel" NOT NULL DEFAULT 'NONE',
    "status" "TicketStatus" NOT NULL DEFAULT 'UNREAD',
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketHistories" (
    "id" SERIAL NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "TicketHistories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketTasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "PRIORITY" NOT NULL DEFAULT 'NORMAL',
    "expected_completion_date" TIMESTAMP(3) NOT NULL,
    "date_completed" TIMESTAMP(3) NOT NULL,
    "status" "TASKSTATUS" NOT NULL DEFAULT 'NOTSTARTED',
    "assignedToUserId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "TicketTasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_code_key" ON "Departments"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_headOfDepartmentId_key" ON "Departments"("headOfDepartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_code_key" ON "Courses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "TicketChats_id_key" ON "TicketChats"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TicketChats_ticketId_key" ON "TicketChats"("ticketId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollments" ADD CONSTRAINT "CourseEnrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollments" ADD CONSTRAINT "CourseEnrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Units" ADD CONSTRAINT "Units_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitEnrollments" ADD CONSTRAINT "UnitEnrollments_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitEnrollments" ADD CONSTRAINT "UnitEnrollments_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitEnrollments" ADD CONSTRAINT "UnitEnrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemesterEnrollments" ADD CONSTRAINT "SemesterEnrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketChats" ADD CONSTRAINT "TicketChats_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_raisedById_fkey" FOREIGN KEY ("raisedById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketHistories" ADD CONSTRAINT "TicketHistories_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTasks" ADD CONSTRAINT "TicketTasks_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTasks" ADD CONSTRAINT "TicketTasks_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketTasks" ADD CONSTRAINT "TicketTasks_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
