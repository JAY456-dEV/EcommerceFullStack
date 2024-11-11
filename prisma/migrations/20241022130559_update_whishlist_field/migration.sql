-- CreateTable
CREATE TABLE "Whislist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "product_id" VARCHAR(255),

    CONSTRAINT "Whislist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Whislist" ADD CONSTRAINT "Whislist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
