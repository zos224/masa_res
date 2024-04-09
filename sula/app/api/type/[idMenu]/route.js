import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let types = await prisma.Type.findMany({where: {idMenu: parseInt(params.idMenu)}, include: {subTypes: true}})
        
        if (types) {
            return new Response(JSON.stringify(types), {status: 200})
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
        const response = await prisma.Type.delete({where: {id: parseInt(params.idMenu)}})
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