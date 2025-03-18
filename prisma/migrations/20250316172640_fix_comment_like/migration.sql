/*
  Warnings:

  - Added the required column `isLike` to the `CommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentLike" ADD COLUMN     "isLike" BOOLEAN NOT NULL;
