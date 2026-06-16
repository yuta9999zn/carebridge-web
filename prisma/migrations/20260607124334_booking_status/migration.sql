-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "organization" TEXT,
ALTER COLUMN "status" SET DEFAULT '受付待ち';
