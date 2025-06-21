/*
  Warnings:

  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.
  - Added the required column `stock` to the `productVariants` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `productVariants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "productVariants" ADD COLUMN     "stock" INTEGER NOT NULL,
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "stock";
