import prisma from "@/app/db/prismaClient";
export const GET = async (req, {params}) => {
    const data = {
        status: true
    }
    try {
        if (params.id == "all") {
            let feedback = await prisma.Feedback.findMany({});
            return new Response(JSON.stringify(feedback), { status: 200 })
        }
        let feedback = await prisma.Feedback.update({ where: { id: parseInt(params.id)}, data: data });
        return new Response(JSON.stringify(feedback), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}

export const DELETE = async (req, {params}) => {
    try {
        const response = await prisma.Feedback.delete({where: {id: parseInt(params.id)}});
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