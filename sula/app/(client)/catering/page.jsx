import Image from "next/image";
import Link from "next/link";

const ReservationPage = () => {
    return (
        <div>
            <div className="relative">
                <Image className="max-h-100 object-cover" src={"/images/gallary/our_food.webp"} width={1920} height={1280}></Image>
                <span className="absolute text-4xl text-center font-gambarino bg-dark-custom lg:px-20 py-2 px-5 font-bold text-white top-1/2 sm:left-1/2 sm:-translate-x-1/2">
                    Catering
                </span>
            </div>
            <div className="py-10 bg-image4 text-center">
                <div className="text-black mt-10 md:w-2/3 w-full mx-auto">
                    <p className="text-2xl font-semibold mb-4">Elevate Your Event with Masala Of India's Catering Services</p>
                    <p className="mb-3">Make your event a tastier affair with Masala Of India's off-campus catering expertise, serving the best in Seattle. Our talented and well-trained staff are dedicated to serving you and ensuring your guests are served happiness. Whether it's an intimate gathering, corporate conference, wedding, or competition, Masala of India is your go-to caterer. With 20 years of excellence in catering, we understand your taste preferences and offer customizable spice levels for crowd-friendly dishes.</p>
                    <p className="font-semibold">Contact us with your requirements, and our sales team will reach out to you shortly.</p>
                </div>
                <div className="text-center mt-10 border-b md:w-1/3 mx-auto pb-7">
                    <Link href={"/catering/order"}><button className="px-10 py-3 rounded-md font-medium border-primary-color border-2 text-primary-color hover:bg-primary-color hover:text-white">REQUEST YOUR ORDER</button></Link>
                </div>
                <div className="text-center mt-10">
                    <p className="text-black text-3xl pb-5 tracking-wider font-semibold">Catering Menu</p>
                    <Link target="_blank" className="bg-primary-color mt-5 text-white font-bold px-5 py-3 rounded-md" href={"/cateringmenu.pdf"}>View Catering Menu</Link>
                </div>
            </div>
        </div>
    )
}
export default ReservationPage;