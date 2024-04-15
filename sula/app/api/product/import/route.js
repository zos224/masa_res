import { promises as fs } from 'fs';
import prisma from "@/app/db/prismaClient";
import { v2 as cloudinary } from 'cloudinary';
import { resolve } from 'path';
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
export const GET = async (req) => {
    const file = await fs.readFile('/data.json', 'utf8');
    const data = JSON.parse(file);
    for (let i = 0; i < data.length; i++) {
        try {
            const upload = await cloudinary.uploader.upload(data[i].Image);
            const product = {
                name: data[i].Name,
                description: data[i].Description ? data[i].Description : "Let's try it",
                price: parseFloat(data[i].Price) ? parseFloat(data[i].Price) : 1,
                image: upload.secure_url,
                amount: data[i].Amount,
                status: data[i].Status == 1 ? true : false
            }
            let newProduct = await prisma.Product.create({ data: product });
            await prisma.SubTypeProduct.create({ data: { idProduct: newProduct.id, idSubType: data[i].CategoryID } });
        }
        catch (error) {
            continue
        }
    }
    return new Response("Created", {status: 200})
}