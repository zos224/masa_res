-- CreateTable
CREATE TABLE "CreditCard" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "ccNumber" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "exDate" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "idCustomerAccount" INTEGER NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_idCustomerAccount_fkey" FOREIGN KEY ("idCustomerAccount") REFERENCES "CustomerAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
