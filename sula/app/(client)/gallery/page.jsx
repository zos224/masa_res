import Image from "next/image";
export const metadata = {
    title: "Gallery | Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
  };
async function getGallery() {
    const res = await fetch(process.env.APP_URL + '/api/cloudinary/gallery')
    if (res.ok) {
        const data = await res.json()
        return data
    }
}
const OrderPage =  async () => {
    const images = await getGallery()
    return (
        <div className="min-h-screen pt-40">
            <div className="text-center text-4xl text-black font-semibold tracking-widest">
                PHOTO GALLERY
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mx-10 my-10">
                {images && images.map((image, index) => (
                    <div key={index} className="overflow-hidden">
                        <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={image.secure_url} width={1000} height={500}></Image>
                    </div>))
                }
            </div>
        </div>
    );
};

export default OrderPage;