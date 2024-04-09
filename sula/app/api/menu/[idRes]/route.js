import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let menu = await prisma.Menu.findUnique({where : {idRestaurant: parseInt(params.idRes)}, include: {types: {include: {subTypes: {include: {subTypeProducts: {include: {product: true}}}}}}}})
        if (menu) {
            return new Response(JSON.stringify(menu), {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}
