import { v2 as cloudinary } from 'cloudinary';
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
    const gallery = []
    await cloudinary.api.resources({type:"upload", prefix: "Gallery"}, function(error, res) {
        if (res) {
            res.resources.forEach((item) => {
              gallery.push(item)
            })
        }
    })
    return new Response(JSON.stringify(gallery), {status: 200});
}