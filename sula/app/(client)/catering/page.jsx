import Image from "next/image";
import Link from "next/link";

const ReservationPage = () => {
    return (
        <div>
            <div className="relative">
                <Image className="max-h-100 object-cover" src={"/images/bg/banner_catering.png"} width={1920} height={1280}></Image>
                <span className="absolute md:text-7xl text-5xl uppercase text-center font-gambarino lg:px-20 py-2 px-5 font-bold text-white top-1/3 w-full">
                    Catering
                </span>
            </div>
            <div className="py-10 bg-image text-center">
                <div className="text-white mt-10 md:w-2/3 w-full mx-auto">
                    <p className="text-7xl font-mrdehaviland mb-4">Elevate Your Event with Masala Of India's Catering Services</p>
                    <p className="mb-3">Make your event a tastier affair with Masala Of India's off-campus catering expertise, serving the best in Seattle. Our talented and well-trained staff are dedicated to serving you and ensuring your guests are served happiness. Whether it's an intimate gathering, corporate conference, wedding, or competition, Masala of India is your go-to caterer. With 20 years of excellence in catering, we understand your taste preferences and offer customizable spice levels for crowd-friendly dishes.</p>
                    <p className="font-semibold mt-20">Contact us with your requirements, and our sales team will reach out to you shortly.</p>
                </div>
                <div className="text-center mt-10 border-b border-white md:w-1/3 mx-auto pb-7">
                    <Link href={"/catering/order"}><button className="border-white border-2 text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300">REQUEST YOUR ORDER</button></Link>
                </div>
                <div className="text-center mt-7">
                    <p className="text-white text-3xl pb-5 tracking-wider uppercase font-semibold">Catering Menu</p>
                    <Link target="_blank" className="border-white border-2 text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300" href={"/cateringmenu.pdf"}>View Catering Menu</Link>
                </div>
            </div>
        </div>
    )
}
export default ReservationPage;