import Image from "next/image";
import Link from "next/link";
export const metadata = {
    title: "Takeout & Delivery | Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
  };

const LocationPage = async () => {
    return (
        <div>
            <div className="relative">
                <Image className="max-h-115 object-cover" src={"/images/gallary/our_food.webp"} width={1920} height={1280}></Image>
                <span className="absolute text-center font-gambarino bg-dark-custom lg:px-20 py-2 px-5 font-bold text-white top-1/2 sm:left-1/2 sm:-translate-x-1/2">
                    <p className="text-2xl">MASALA AT HOME</p>
                    <p className="tracking-widest text-4xl mt-4">INDIAN TAKE OUT & DELIVERY</p>
                </span>
            </div>
            <div className="py-10 bg-image text-center text-black">
                <div className="mt-10"> 
                    <Image className="mx-auto mt-7" src={"/images/bg/decor_color.svg"} width={150} height={80} />
                    <p className="text-xl mt-5">
                        Indian Food delivery & takeout in Seattle by Masala
                    </p>
                    <Image className="mx-auto mt-4" src={"/images/bg/takeout1.jpg"} width={600} height={400}></Image>
                    <p className="text-xl mt-5">
                    It's no surprise that Indian cuisine is the answer to comfort for Seattle weather. <br></br>
Masala Restaurants aren't just for dine-in experiences, Masala's Indian food delivery & take out service in Seattle is available at the comfort of your home, and these delectable flavors are on their way to you
                    </p>
                    <Image className="mx-auto mt-4" src={"/images/bg/takeout2.jpg"} width={600} height={400}></Image>
                    <p className="text-xl mt-5">
                    Just order online with a few clicks & relax, have a drink and we will knock with delicious goodness!
                    </p>
                    <Image className="mx-auto mt-4" src={"/images/bg/takeout3.jpg"} width={600} height={400}></Image>
                </div>
                
                <div className="pt-10 bg-image4"> 
                    <div className="text-center">
                        <Link href={"/contact"} className="px-8 py-4 font-medium text-primary-color hover:text-white border-2 border-primary-color hover:bg-primary-color duration-300">OPENING HOURS</Link>
                    </div>
                    <div className="text-center mt-10">
                        <Image className="mx-auto" src={"/images/icon/handbag.svg"} width={70} height={70}></Image>
                        <div className="mt-10">
                            <span className="text-black font-medium text-3xl font-gambarino">MINIMUM ORDER</span>
                            <p className="mt-10 text-black font-normal text-xl">
                                Take Out: No Minimum
                                <br/>
                                Delivery: $35
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between md:w-3/5 mx-auto mt-30">
                        <Link className="px-8 py-4 font-medium text-primary-color hover:text-white border-2 border-primary-color hover:bg-primary-color duration-300" href={"/order-masala"}>ORDER ONLINE</Link>
                        <Link className="px-8 py-4 font-medium text-primary-color hover:text-white border-2 border-primary-color hover:bg-primary-color duration-300" href={"/contact"}>ORDER BY PHONE</Link>
                    </div>
                    <div className="mx-auto text-center mt-20 pb-10">
                        <p className="text-2xl font-gambarino text-black tracking-widest">DISTANCE CALCULATOR & DIRECTIONS FOR PICK UP</p>
                        <p className="mt-5 text-black">Click on directions or view larger map below to find the distance to your address</p>
                        <div className="mt-10">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2684.7848425171815!2d-122.32543182315692!3d47.70801458096831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490115703299c53%3A0x140fbebc49128727!2sNorthgate%20Fifth%20Ave%20-%20Super%20Sport%2C%20507%20NE%20Northgate%20Way%2C%20Seattle%2C%20WA%2098125%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1712507635538!5m2!1svi!2s" className="border-none w-4/5 mx-auto h-132.5" allowFullScreen="false" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LocationPage;