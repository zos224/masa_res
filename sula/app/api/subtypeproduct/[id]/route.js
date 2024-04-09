import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let pocs = await prisma.SubTypeProduct.findMany({where: {idSubType: parseInt(params.id)}, include: {product: true}})
        
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
        const response = await prisma.SubTypeProduct.delete({where: {id: parseInt(params.id)}})
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