import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let productoptions;
        if (params.id == "all") {
            productoptions = await prisma.ProductOption.findMany({include: {productOptionChoices: true}})
        }
        else {
            productoptions = await prisma.ProductOption.findUnique({where: {id: parseInt(params.id)}})
        }
        
        if (productoptions) {
            return new Response(JSON.stringify(productoptions), {status: 200})
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
        const response = await prisma.ProductOption.delete({where: {id: parseInt(params.id)}})
        if (response) {
            return new Response("Deleted", {status: 200})
        }
        else {
            return new Response("Error", {status: 500})
        }

    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}