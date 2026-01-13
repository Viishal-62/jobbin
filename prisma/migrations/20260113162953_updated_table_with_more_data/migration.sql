-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "ats" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "logo" TEXT,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "category" TEXT,
    "tags" JSONB,
    "jobtype" TEXT,
    "salary" TEXT,
    "applyUrl" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3),
    "firstSeen" TIMESTAMP(3) NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_hash_key" ON "Job"("hash");

-- CreateIndex
CREATE INDEX "Job_title_idx" ON "Job"("title");

-- CreateIndex
CREATE INDEX "Job_company_idx" ON "Job"("company");

-- CreateIndex
CREATE INDEX "Job_isActive_idx" ON "Job"("isActive");
