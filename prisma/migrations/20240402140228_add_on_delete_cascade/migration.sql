-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "operationTimeIndoor" TEXT NOT NULL,
    "operationTimeTakeAway" TEXT NOT NULL,
    "diningArea" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "seatingOption" BOOLEAN NOT NULL,
    "Status" BOOLEAN NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "idRestaurant" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idMenu" INTEGER NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idType" INTEGER,

    CONSTRAINT "SubType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "idSubType" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_ProductOption" (
    "id" SERIAL NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "idProductOption" INTEGER NOT NULL,

    CONSTRAINT "Product_ProductOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCustomization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductCustomization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_ProductCustomization" (
    "id" SERIAL NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "idProductCustomization" INTEGER NOT NULL,

    CONSTRAINT "Product_ProductCustomization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOptionChoice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idProductOption" INTEGER NOT NULL,

    CONSTRAINT "ProductOptionChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCustomizationChoice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idProductCustomization" INTEGER NOT NULL,

    CONSTRAINT "ProductCustomizationChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "idRestaurant" INTEGER NOT NULL,
    "idCustomerAccount" INTEGER,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "type" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentStatus" BOOLEAN NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "gst" DOUBLE PRECISION NOT NULL,
    "tip" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "idOrder" TEXT NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItemOption" (
    "id" SERIAL NOT NULL,
    "idOrderItem" INTEGER NOT NULL,
    "idProductOptionChoice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItemOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItemCustomization" (
    "id" SERIAL NOT NULL,
    "idOrderItem" INTEGER NOT NULL,
    "idProductCustomizationChoice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItemCustomization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAccount" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "numberOfReferrals" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "CustomerAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoyalCard" (
    "id" SERIAL NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "idCustomerAccount" INTEGER NOT NULL,

    CONSTRAINT "LoyalCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pointToRedeem" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "idProduct" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountOffer" (
    "id" SERIAL NOT NULL,
    "idAccount" INTEGER NOT NULL,
    "idOffer" INTEGER NOT NULL,
    "promoCode" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL,

    CONSTRAINT "AccountOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "idRestaurant" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyOut" (
    "id" SERIAL NOT NULL,
    "idReservation" INTEGER NOT NULL,
    "eventDetails" TEXT,

    CONSTRAINT "BuyOut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupReversation" (
    "id" SERIAL NOT NULL,
    "idReservation" INTEGER NOT NULL,

    CONSTRAINT "GroupReversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableReversation" (
    "id" SERIAL NOT NULL,
    "idReservation" INTEGER NOT NULL,
    "seatingOption" TEXT,
    "specialRequest" TEXT,

    CONSTRAINT "TableReversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestQuote" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "deliveryTime" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventAddress" TEXT NOT NULL,
    "spiceLevel" TEXT NOT NULL,
    "details" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "gst" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RequestQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestQuoteParty" (
    "id" SERIAL NOT NULL,
    "idRequestQoute" INTEGER NOT NULL,
    "dinnerWare" TEXT NOT NULL,
    "spoons" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "idCateringOption" INTEGER NOT NULL,

    CONSTRAINT "RequestQuoteParty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestQuotePartyProduct" (
    "id" SERIAL NOT NULL,
    "idCateringOptionIncludeProduct" INTEGER NOT NULL,
    "idRequestQuoteParty" INTEGER NOT NULL,

    CONSTRAINT "RequestQuotePartyProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestQuotePartyAddProduct" (
    "id" SERIAL NOT NULL,
    "idAdditinalOption" INTEGER NOT NULL,
    "idRequestQuoteParty" INTEGER NOT NULL,

    CONSTRAINT "RequestQuotePartyAddProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalMenuItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdditionalMenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalMenuItemOption" (
    "id" SERIAL NOT NULL,
    "idAddMenuItem" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "note" TEXT,

    CONSTRAINT "AdditionalMenuItemOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CateringService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CateringService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CateringOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "servedWith" TEXT,
    "assortedChutneys" TEXT,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CateringOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CateringServiceOption" (
    "id" SERIAL NOT NULL,
    "idCateringOption" INTEGER NOT NULL,
    "idCateringService" INTEGER NOT NULL,

    CONSTRAINT "CateringServiceOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CateringOptionInclude" (
    "id" SERIAL NOT NULL,
    "idCateringOption" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CateringOptionInclude_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CateringOptionIncludeProduct" (
    "id" SERIAL NOT NULL,
    "idCateringOptionInclude" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "note" TEXT,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CateringOptionIncludeProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomOrder" (
    "id" SERIAL NOT NULL,
    "idRequestQoute" INTEGER NOT NULL,
    "setupType" TEXT NOT NULL,
    "rentalRequired" TEXT NOT NULL,
    "spoons" TEXT NOT NULL,
    "plateAndCutlery" TEXT NOT NULL,
    "menuDetails" TEXT NOT NULL,

    CONSTRAINT "CustomOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FingerfoodOrder" (
    "id" SERIAL NOT NULL,
    "idRequestQoute" INTEGER NOT NULL,
    "setupType" TEXT NOT NULL,

    CONSTRAINT "FingerfoodOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FingerfoodOrderProduct" (
    "id" SERIAL NOT NULL,
    "idFingerfoodOrder" INTEGER NOT NULL,
    "idCateringOptionIncludeProduct" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "FingerfoodOrderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "idRestaurant" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "idRestaurant" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "orderType" TEXT NOT NULL,
    "idOrder" TEXT NOT NULL,
    "orderIssues" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogTopic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlogTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "idBlogTopic" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_idRestaurant_key" ON "Menu"("idRestaurant");

-- CreateIndex
CREATE UNIQUE INDEX "SubType_name_key" ON "SubType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductOptionChoice_name_idProductOption_key" ON "ProductOptionChoice"("name", "idProductOption");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCustomizationChoice_name_idProductCustomization_key" ON "ProductCustomizationChoice"("name", "idProductCustomization");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAccount_email_key" ON "CustomerAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAccount_phone_key" ON "CustomerAccount"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "LoyalCard_cardNumber_key" ON "LoyalCard"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "LoyalCard_idCustomerAccount_key" ON "LoyalCard"("idCustomerAccount");

-- CreateIndex
CREATE UNIQUE INDEX "BuyOut_idReservation_key" ON "BuyOut"("idReservation");

-- CreateIndex
CREATE UNIQUE INDEX "GroupReversation_idReservation_key" ON "GroupReversation"("idReservation");

-- CreateIndex
CREATE UNIQUE INDEX "TableReversation_idReservation_key" ON "TableReversation"("idReservation");

-- CreateIndex
CREATE UNIQUE INDEX "RequestQuoteParty_idRequestQoute_key" ON "RequestQuoteParty"("idRequestQoute");

-- CreateIndex
CREATE UNIQUE INDEX "CustomOrder_idRequestQoute_key" ON "CustomOrder"("idRequestQoute");

-- CreateIndex
CREATE UNIQUE INDEX "FingerfoodOrder_idRequestQoute_key" ON "FingerfoodOrder"("idRequestQoute");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_idOrder_key" ON "Feedback"("idOrder");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_idRestaurant_fkey" FOREIGN KEY ("idRestaurant") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_idMenu_fkey" FOREIGN KEY ("idMenu") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubType" ADD CONSTRAINT "SubType_idType_fkey" FOREIGN KEY ("idType") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idSubType_fkey" FOREIGN KEY ("idSubType") REFERENCES "SubType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_ProductOption" ADD CONSTRAINT "Product_ProductOption_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_ProductOption" ADD CONSTRAINT "Product_ProductOption_idProductOption_fkey" FOREIGN KEY ("idProductOption") REFERENCES "ProductOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_ProductCustomization" ADD CONSTRAINT "Product_ProductCustomization_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_ProductCustomization" ADD CONSTRAINT "Product_ProductCustomization_idProductCustomization_fkey" FOREIGN KEY ("idProductCustomization") REFERENCES "ProductCustomization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOptionChoice" ADD CONSTRAINT "ProductOptionChoice_idProductOption_fkey" FOREIGN KEY ("idProductOption") REFERENCES "ProductOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCustomizationChoice" ADD CONSTRAINT "ProductCustomizationChoice_idProductCustomization_fkey" FOREIGN KEY ("idProductCustomization") REFERENCES "ProductCustomization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idRestaurant_fkey" FOREIGN KEY ("idRestaurant") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idCustomerAccount_fkey" FOREIGN KEY ("idCustomerAccount") REFERENCES "CustomerAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemOption" ADD CONSTRAINT "OrderItemOption_idOrderItem_fkey" FOREIGN KEY ("idOrderItem") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemOption" ADD CONSTRAINT "OrderItemOption_idProductOptionChoice_fkey" FOREIGN KEY ("idProductOptionChoice") REFERENCES "ProductOptionChoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemCustomization" ADD CONSTRAINT "OrderItemCustomization_idOrderItem_fkey" FOREIGN KEY ("idOrderItem") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemCustomization" ADD CONSTRAINT "OrderItemCustomization_idProductCustomizationChoice_fkey" FOREIGN KEY ("idProductCustomizationChoice") REFERENCES "ProductCustomizationChoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoyalCard" ADD CONSTRAINT "LoyalCard_idCustomerAccount_fkey" FOREIGN KEY ("idCustomerAccount") REFERENCES "CustomerAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountOffer" ADD CONSTRAINT "AccountOffer_idAccount_fkey" FOREIGN KEY ("idAccount") REFERENCES "CustomerAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountOffer" ADD CONSTRAINT "AccountOffer_idOffer_fkey" FOREIGN KEY ("idOffer") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_idRestaurant_fkey" FOREIGN KEY ("idRestaurant") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyOut" ADD CONSTRAINT "BuyOut_idReservation_fkey" FOREIGN KEY ("idReservation") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupReversation" ADD CONSTRAINT "GroupReversation_idReservation_fkey" FOREIGN KEY ("idReservation") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableReversation" ADD CONSTRAINT "TableReversation_idReservation_fkey" FOREIGN KEY ("idReservation") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestQuoteParty" ADD CONSTRAINT "RequestQuoteParty_idRequestQoute_fkey" FOREIGN KEY ("idRequestQoute") REFERENCES "RequestQuote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestQuoteParty" ADD CONSTRAINT "RequestQuoteParty_idCateringOption_fkey" FOREIGN KEY ("idCateringOption") REFERENCES "CateringOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestQuotePartyProduct" ADD CONSTRAINT "RequestQuotePartyProduct_idCateringOptionIncludeProduct_fkey" FOREIGN KEY ("idCateringOptionIncludeProduct") REFERENCES "CateringOptionIncludeProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestQuotePartyProduct" ADD CONSTRAINT "RequestQuotePartyProduct_idRequestQuoteParty_fkey" FOREIGN KEY ("idRequestQuoteParty") REFERENCES "RequestQuoteParty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestQuotePartyAddProduct" ADD CONSTRAINT "RequestQuotePartyAddProduct_idAdditinalOption_fkey" FOREIGN KEY ("idAdditinalOption") REFERENCES "AdditionalMenuItemOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestQuotePartyAddProduct" ADD CONSTRAINT "RequestQuotePartyAddProduct_idRequestQuoteParty_fkey" FOREIGN KEY ("idRequestQuoteParty") REFERENCES "RequestQuoteParty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalMenuItemOption" ADD CONSTRAINT "AdditionalMenuItemOption_idAddMenuItem_fkey" FOREIGN KEY ("idAddMenuItem") REFERENCES "AdditionalMenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalMenuItemOption" ADD CONSTRAINT "AdditionalMenuItemOption_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CateringServiceOption" ADD CONSTRAINT "CateringServiceOption_idCateringOption_fkey" FOREIGN KEY ("idCateringOption") REFERENCES "CateringOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CateringServiceOption" ADD CONSTRAINT "CateringServiceOption_idCateringService_fkey" FOREIGN KEY ("idCateringService") REFERENCES "CateringService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CateringOptionInclude" ADD CONSTRAINT "CateringOptionInclude_idCateringOption_fkey" FOREIGN KEY ("idCateringOption") REFERENCES "CateringOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CateringOptionIncludeProduct" ADD CONSTRAINT "CateringOptionIncludeProduct_idCateringOptionInclude_fkey" FOREIGN KEY ("idCateringOptionInclude") REFERENCES "CateringOptionInclude"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CateringOptionIncludeProduct" ADD CONSTRAINT "CateringOptionIncludeProduct_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomOrder" ADD CONSTRAINT "CustomOrder_idRequestQoute_fkey" FOREIGN KEY ("idRequestQoute") REFERENCES "RequestQuote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FingerfoodOrder" ADD CONSTRAINT "FingerfoodOrder_idRequestQoute_fkey" FOREIGN KEY ("idRequestQoute") REFERENCES "RequestQuote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FingerfoodOrderProduct" ADD CONSTRAINT "FingerfoodOrderProduct_idFingerfoodOrder_fkey" FOREIGN KEY ("idFingerfoodOrder") REFERENCES "FingerfoodOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FingerfoodOrderProduct" ADD CONSTRAINT "FingerfoodOrderProduct_idCateringOptionIncludeProduct_fkey" FOREIGN KEY ("idCateringOptionIncludeProduct") REFERENCES "CateringOptionIncludeProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_idRestaurant_fkey" FOREIGN KEY ("idRestaurant") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_idRestaurant_fkey" FOREIGN KEY ("idRestaurant") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_idBlogTopic_fkey" FOREIGN KEY ("idBlogTopic") REFERENCES "BlogTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
