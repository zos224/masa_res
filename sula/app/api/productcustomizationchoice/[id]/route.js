import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let pccs = await prisma.ProductCustomizationChoice.findMany({where: {idProductCustomization: parseInt(params.id)}})
        
        if (pccs) {
            return new Response(JSON.stringify(pccs), {status: 200})
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
        const response = await prisma.ProductCustomizationChoice.delete({where: {id: parseInt(params.id)}})
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