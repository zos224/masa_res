import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let subTypes;
        if (params.idType == "notype") {
            subTypes = await prisma.SubType.findMany({where: {idType: null}, include: {subTypeProducts: true}})
        }
        else {
            subTypes = await prisma.SubType.findUnique({where: {id: parseInt(params.idType)}})
        }

        if (subTypes) {
            return new Response(JSON.stringify(subTypes), {status: 200})
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
        const response = await prisma.SubType.delete({where: {id: parseInt(params.idType)}})
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