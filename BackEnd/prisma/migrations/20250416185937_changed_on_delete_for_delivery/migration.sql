-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_deliveryId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
