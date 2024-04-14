import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let orders;
        if (params.id == "all") {
            orders = await prisma.Order.findMany({orderBy: {dateTime: 'desc'}})
        }
        else {
            orders = await prisma.Order.findUnique({where: {id: params.id}, include: {restaurant: true, customerAccount: true, orderItems: {include: {product: true, orderItemOptions: {include: {productOptionChoice: {include: {productOption: true}}}}, 
                            orderItemCustomization: {include: {productCustomizationChoice: {include: {productCustomization: true}}}}}}}})
        }
        if (orders) {
            return new Response(JSON.stringify(orders), {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}

export const DELETE = async(request, {params}) => {
    try {
        const response = await prisma.Order.delete({where: {id: parseInt(params.id)}})
        if (response) {
            return new Response("Deleted", {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }

    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}