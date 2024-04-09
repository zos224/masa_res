import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let pocs = await prisma.ProductOptionChoice.findMany({where: {idProductOption: parseInt(params.id)}})
        
        if (pocs) {
            return new Response(JSON.stringify(pocs), {status: 200})
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
        const response = await prisma.ProductOptionChoice.delete({where: {id: parseInt(params.id)}})
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