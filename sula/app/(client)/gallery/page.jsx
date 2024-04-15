import Image from "next/image";
export const metadata = {
    title: "Gallery | Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
  };
const OrderPage =  async () => {
  return (
    <div className="min-h-screen pt-40">
        <div className="text-center text-4xl text-black font-semibold tracking-widest">
            PHOTO GALLERY
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mx-10 my-10">
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/our_baverage.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/our_food.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/our_service.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/our_space.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic0.png"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic1.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic2.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic3.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic5.jpg"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic6.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic7.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic8.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic9.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic10.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic11.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic12.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic13.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic14.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic15.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic16.webp"} width={1000} height={500}></Image>
            </div>
            <div className="overflow-hidden">
                <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={"/images/gallary/pic17.webp"} width={1000} height={500}></Image>
            </div>
        </div>
    </div>
  );
};

export default OrderPage;