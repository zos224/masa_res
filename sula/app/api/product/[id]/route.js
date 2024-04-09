import prisma from "@/app/db/prismaClient";
import { v2 as cloudinary } from 'cloudinary';
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const GET = async(request, {params}) => {
    try {
        let products;
        if (params.id == "all") {
            products = await prisma.Product.findMany({})
        }
        else {
            products = await prisma.Product.findUnique({where: {id: parseInt(params.id)}, include: {product_productOptions: true, product_productCustomizations: true}})
        }
        if (products) {
            return new Response(JSON.stringify(products), {status: 200})
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
        const product = await prisma.Product.findUnique({where: {id: parseInt(params.id)}})
        const publicId = product.image.split("/").pop().split(".")[0]
        cloudinary.uploader.destroy(publicId)
        const response = await prisma.Product.delete({where: {id: parseInt(params.id)}})
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