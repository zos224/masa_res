import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let events;
        if (params.id == "all") {
            events = await prisma.Event.findMany({})
        }
        else {
            events = await prisma.Event.findUnique({where: {id: parseInt(params.id)}})
        }
        if (events) {
            return new Response(JSON.stringify(events), {status: 200})
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
        const response = await prisma.Event.delete({where: {id: parseInt(params.id)}})
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