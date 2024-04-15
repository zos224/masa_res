import Image from "next/image";
import Link from "next/link";
export const metadata = {
    title: "Location | Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
  };
async function getRestaurant() {
    const res = await fetch(process.env.APP_URL + '/api/restaurant/all')
    if (res.ok) {
        const data = await res.json()
        return data[0]
    }
}
const LocationPage = async () => {
    const restaurant = await getRestaurant()

    return (
        <div>
            <div className="relative">
                <Image className="max-h-100 object-cover" src={"/images/gallary/our_food.webp"} width={1920} height={1280}></Image>
                <span className="absolute text-4xl text-center font-gambarino bg-dark-custom lg:px-20 py-2 px-5 font-bold text-white top-1/2 left-1/2 -translate-x-1/2">
                    {restaurant.name}
                </span>
            </div>
            <div className="py-10 bg-image text-center text-black">
                <div className="flex justify-evenly mt-15">
                    <Link className="px-8 py-4 border-2 uppercase border-primary-color text-primary-color hover:bg-primary-color hover:text-white" href={"/reservation/table"}>Table Reservation</Link>
                    <Link className="px-8 py-4 border-2 uppercase border-primary-color text-primary-color hover:bg-primary-color hover:text-white" href={"/order-online"}>Order Online</Link>
                </div>
                <div className="text-2xl mt-10">
                    Welcome to {restaurant.name} Cuisine - The best Indian restaurant in Seattle, WA. 
                </div>
                <div className="mt-10"> 
                    <p className="text-3xl font-bold tracking-widest">Food & Drinks</p>
                    <p className="text-xl mt-5 md:w-2/3 w-full md:mx-auto">We have retained the classics & customer favorites on our menu, added handpicked street food dishes from Mumbai and regional seafood cuisine from the city of Mangalore in South India along with a brand new cocktail list.</p>
                    <Image className="mx-auto mt-7" src={"/images/bg/decor_color.svg"} width={150} height={80} />
                    <div className="grid md:gap-10 gap-5 md:grid-cols-2 grid-cols-1 md:mx-20 mx-5 mt-10">
                        <Image className="md:h-230 h-150 object-cover" src={"/images/gallary/pic16.webp"} width={1000} height={800}></Image>
                        <Image className="md:h-230 h-150 object-cover" src={"/images/gallary/our_baverage.webp"} width={1000} height={800}></Image>
                        <Image className="md:h-230 h-150 object-cover" src={"/images/gallary/pic9.webp"} width={1000} height={800}></Image>
                        <Image className="md:h-230 h-150 object-cover" src={"/images/gallary/pic13.webp"} width={1000} height={800}></Image>
                    </div>
                </div>
                <div className="mt-10"> 
                    <p className="text-3xl font-bold tracking-widest">Dining Room</p>
                    <p className="text-xl mt-5 md:w-2/3 w-full md:mx-auto">Our dinin room is outfitted into an airy lounge featuring nat r I light, Indian antiques, Indian temple carvings angVeclaimed wood matched with brass and contemp ary lighting along with
comfortable chairs for an ultimate Indian dining experience</p>
                    <Image className="mx-auto mt-7" src={"/images/bg/decor_color.svg"} width={150} height={80} />
                    <div className="grid md:gap-10 gap-5 md:grid-cols-2 grid-cols-1 md:mx-20 mx-5 mt-10">
                        <Image className="md:h-230 h-150 object-cover" src={"/images/gallary/our_space.webp"} width={1000} height={800}></Image>
                        <Image className="md:h-230 h-150 object-cover" src={"/images/gallary/pic3.webp"} width={1000} height={800}></Image>
                    </div>
                </div>
                <div className="mt-10"> 
                    <p className="text-3xl font-bold tracking-widest uppercase">Book a table or order online for takeout & delivery</p>
                    <Image className="mx-auto mt-7" src={"/images/bg/decor_color.svg"} width={150} height={80} />
                    <div className="flex justify-evenly mt-15">
                        <Link className="px-8 py-4 border-2 uppercase border-primary-color text-primary-color hover:bg-primary-color hover:text-white" href={"/reservation/table"}>Table Reservation</Link>
                        <Link className="px-8 py-4 border-2 uppercase border-primary-color text-primary-color hover:bg-primary-color hover:text-white" href={"/order-online"}>Order Online</Link>
                    </div>
                </div>
                <div className="mt-10"> 
                    <p className="text-3xl font-bold tracking-widest">Get Directions</p>
                    <Image className="mx-auto mt-7" src={"/images/bg/decor_color.svg"} width={150} height={80} />
                    <div className="mt-10"> 
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2684.7848425171815!2d-122.32543182315692!3d47.70801458096831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490115703299c53%3A0x140fbebc49128727!2sNorthgate%20Fifth%20Ave%20-%20Super%20Sport%2C%20507%20NE%20Northgate%20Way%2C%20Seattle%2C%20WA%2098125%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1712507635538!5m2!1svi!2s" className="border-none w-4/5 mx-auto h-132.5" allowFullScreen="false" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LocationPage;