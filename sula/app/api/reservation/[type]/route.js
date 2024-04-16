import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let reservations = await prisma.Reservation.findMany({orderBy: {dateTime: 'desc'}})
        if (reservations) {
            return new Response(JSON.stringify(reservations), {status: 200})
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
        const response = await prisma.Reservation.delete({where: {id: parseInt(params.type)}})
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
