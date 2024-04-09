import { v2 as cloudinary } from 'cloudinary';
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    const formData = await request.formData();
    const publicId = formData.get('publicId');
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return new Response("OK", { status: 200 })
    }
    catch {
        return new Response("Error", { status: 500})
    }
}