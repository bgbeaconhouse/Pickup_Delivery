-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_pickupId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_pickupId_fkey" FOREIGN KEY ("pickupId") REFERENCES "Pickup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
