-- CreateTable
CREATE TABLE "ReviewTag" (
    "reviewId" INTEGER NOT NULL,
    "tagText" VARCHAR(255) NOT NULL,

    CONSTRAINT "ReviewTag_pkey" PRIMARY KEY ("reviewId","tagText")
);

-- AddForeignKey
ALTER TABLE "ReviewTag" ADD CONSTRAINT "ReviewTag_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewTag" ADD CONSTRAINT "ReviewTag_tagText_fkey" FOREIGN KEY ("tagText") REFERENCES "Tag"("text") ON DELETE RESTRICT ON UPDATE CASCADE;
