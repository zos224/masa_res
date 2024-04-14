import prisma from "@/app/db/prismaClient";
export const POST = async (req) => {
    let order = {
        id: "",
        idRestaurant: 0,
        idCustomerAccount: 0,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        type: "",
        dateTime: "",
        paymentMethod: "",
        paymentStatus: false,
        subTotal: 0,
        gst: 0,
        tip: 0,
        discount: 0,
        total: 0,
        status: false
    }
    const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    order.id = "MS" + date.getDate() + date.getMonth() + date.getMinutes() + date.getSeconds() + Math.floor(Math.random() + 10);
    const formData = await req.formData();
    order.idRestaurant = parseInt(formData.get('idRestaurant'));
    order.idCustomerAccount = parseInt(formData.get('idCustomerAccount'));
    order.firstName = formData.get('firstName');
    order.lastName = formData.get('lastName');
    order.email = formData.get('email');
    order.phone = formData.get('phone');
    order.address = formData.get('address');
    order.type = formData.get('type');
    const dateTime = formData.get('dateTime');
    const dateParts = dateTime.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2}) (AM|PM)/);
    let hours = parseInt(dateParts[4], 10);
    if (dateParts[6] === 'PM' && hours < 12) {
      hours += 12;
    }
    if (dateParts[6] === 'AM' && hours === 12) {
      hours = 0;
    }
    order.dateTime = new Date(`${dateParts[3]}-${dateParts[1]}-${dateParts[2]}T${hours.toString().padStart(2, '0')}:${dateParts[5]}:00Z`).toISOString();
    order.subTotal = parseFloat(formData.get('subTotal'));
    order.gst = parseFloat(formData.get('gst'));
    order.tip = parseFloat(formData.get('tip'));
    order.discount = parseFloat(formData.get('discount'));
    order.total = parseFloat(formData.get('total'));
    order.status = false;
    order.paymentMethod = formData.get('paymentMethod');
    order.paymentStatus = formData.get('paymentStatus') === 'true' ? true : false;
    const products = JSON.parse(formData.get('products'));

    try {
        let newOrder = await prisma.Order.create({ data: order });
        for (let i = 0; i < products.length; i++) {
            let orderProduct = {
                idOrder: newOrder.id,
                idProduct: products[i].idProduct,
                quantity: products[i].quantity
            }
            const oderItem = await prisma.OrderItem.create({ data: orderProduct });
            if (products[i].options) {
                for (let j = 0; j < products[i].options.length; j++) {
                    for (let k = 0; k < products[i].options[j].optionSelected.length; k++) {
                        let orderItemOption = {
                            idOrderItem: oderItem.id,
                            idProductOptionChoice: products[i].options[j].optionSelected[k].id
                        }
                        await prisma.OrderItemOption.create({ data: orderItemOption });
                    }
                }
            }
            if (products[i].customizations) {
                for (let j = 0; j < products[i].customizations.length; j++) {
                    for (let k = 0; k < products[i].customizations[j].customizationSelected.length; k++) {
                        let orderItemOption = {
                            idOrderItem: oderItem.id,
                            idProductCustomizationChoice: products[i].customizations[j].customizationSelected[k].id
                        }
                        await prisma.OrderItemCustomization.create({ data: orderItemOption });
                    }
                }
            }
        }
        return new Response("Done", { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response(error, { status: 500 })
    }
    

}
