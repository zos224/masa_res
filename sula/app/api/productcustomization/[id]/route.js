import prisma from "@/app/db/prismaClient";

export const GET = async(request, {params}) => {
    try {
        let productcustomizations;
        if (params.id == "all") {
            productcustomizations = await prisma.ProductCustomization.findMany({include: {productCustomizationChoices: true}})
        }
        else {
            productcustomizations = await prisma.ProductCustomization.findUnique({where: {id: parseInt(params.id)}})
        }
        
        if (productcustomizations) {
            return new Response(JSON.stringify(productcustomizations), {status: 200})
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
        const response = await prisma.ProductCustomization.delete({where: {id: parseInt(params.id)}})
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