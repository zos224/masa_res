import Image from "next/image";
import Link from "next/link";
export const metadata = {
    title: "Buy Out | Masala Of India - Indian Cuisine in Seattle, WA",
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
const ReservationPage = async () => {
    const restaurant = await getRestaurant()

    return (
        <div>
            <div className="relative">
                <Image className="max-h-100 object-cover" src={"/images/bg/bg5.jpg"} width={1920} height={1280}></Image>
                <span className="absolute text-4xl text-center font-gambarino bg-dark-custom lg:px-20 py-2 px-5 font-bold text-white top-1/2 sm:left-1/2 sm:-translate-x-1/2">
                    BUY OUT
                </span>
            </div>
            <div className="py-10 bg-image4 text-center">
                <h1 className="text-2xl uppercase font-bold text-black tracking-widest">Location</h1>
                <div className="md:w-1/3 w-full mx-auto">
                    <Image className="w-full aspect-video object-cover mt-4" src={restaurant.image} alt={restaurant.name} width={500} height={300}></Image>
                </div>
                <div className="text-black mt-4 text-xl font-semibold uppercase">{restaurant.name}</div>
                <Image className="m-auto mt-7 lg:w-50 w-30" src="/images/bg/decor_color.svg" alt="line" width={200} height={50} />
                <div className="text-black text-lg mt-6">Dining Area: {restaurant.diningArea} SQFT</div>
                <div className="text-black text-lg mt-2">Capacity: {restaurant.capacity}</div>
            </div>
            <div className="py-10 bg-image4 text-center">
                <h1 className="text-2xl uppercase font-bold text-black tracking-widest">EVENT TYPES</h1>
                <div className="md:flex">
                    <div className="w-full">
                        <Image className="m-auto mt-7 lg:w-50 w-30" src="/images/bg/decor_color.svg" alt="line" width={200} height={50} />
                        <div className="text-black text-lg mt-6">BUFFET</div>
                    </div>
                    <div className="w-full">
                        <Image className="m-auto mt-7 lg:w-50 w-30" src="/images/bg/decor_color.svg" alt="line" width={200} height={50} />
                        <div className="text-black text-lg mt-6">FORMAL/PREPLATED</div>
                    </div>
                    <div className="w-full">
                        <Image className="m-auto mt-7 lg:w-50 w-30" src="/images/bg/decor_color.svg" alt="line" width={200} height={50} />
                        <div className="text-black text-lg mt-6">HORS D'OEUVRES/FINGERFOODS</div>
                    </div>
                </div>
            </div>
            <div className="py-10 bg-image4 text-center">
                <h1 className="text-2xl uppercase font-bold text-black tracking-widest">MINIMUM SPEND</h1>
                <div className="md:flex mt-5">
                    <div className="w-full">
                        <div className="text-black text-lg">
                            LUNCH <br></br>
                            MON - THUR: $3000 include tax <br></br>
                            FRI - SUN: $4000 include tax <br></br>
                            Beverages and Gratuity are extra <br></br>
                            Duration: 11:00 AM to 03:30 PM
                        </div>
                    </div>
                    <div className="w-full mt-5 md:mt-0">
                        <div className="text-black text-lg">
                            DINNER <br></br>
                            MON - THUR: $6900 include tax and gratuity <br></br>
                            FRI - SUN: $9900 include tax and gratuity <br></br>
                            Beverages and Gratuity are extra <br></br>
                            Duration: 05:00 PM to 10:00 PM
                        </div>
                    </div>
                </div>
            </div>
            <Image className="m-auto mt-7 lg:w-50 w-30" src="/images/bg/decor_color.svg" alt="line" width={200} height={50} />
            <div className="text-center mt-5">
                <Link href={"/reservation/buyout/booking"}><button className="text-white text-xl bg-primary-color font-semibold px-8 py-4">GET IN TOUCH</button></Link>
            </div>
            <div className="my-10">
                <div className="grid md:grid-cols-3 grid-cols-2 mx-10">
                    <div className="relative w-full h-100 md:h-180 group">
                        <Image className="w-full h-full object-cover" src={"/images/gallary/pic7.webp"} width={400} height={400} alt="Gallery image" />
                        <div className="absolute inset-0 hidden group-hover:block bg-dark-custom"></div>
                    </div>
                    <div className="relative w-full h-100 md:h-180 group">
                        <Image className="w-full h-100 md:h-180 object-cover" src={"/images/gallary/pic6.webp"} width={400} height={400} alt="Gallary"></Image>
                        <div className="absolute inset-0 hidden group-hover:block bg-dark-custom"></div>
                    </div>
                    <div className="relative w-full h-100 md:h-180 group">
                    <Image className="w-full h-100 md:h-180 object-cover" src={"/images/gallary/pic11.webp"} width={400} height={400} alt="Gallary"></Image>
                        <div className="absolute inset-0 hidden group-hover:block bg-dark-custom"></div>
                    </div>
                    <div className="relative w-full h-100 md:h-180 group">
                        <Image className="w-full h-full object-cover" src={"/images/gallary/pic12.webp"} width={400} height={400} alt="Gallery image" />
                        <div className="absolute inset-0 hidden group-hover:block bg-dark-custom"></div>
                    </div>
                    <div className="relative w-full h-100 md:h-180 group">
                        <Image className="w-full h-full object-cover" src={"/images/gallary/pic13.webp"} width={400} height={400} alt="Gallery image" />
                        <div className="absolute inset-0 hidden group-hover:block bg-dark-custom"></div>
                    </div>
                    <div className="relative w-full h-100 md:h-180 group">
                        <Image className="w-full h-full object-cover" src={"/images/gallary/pic14.webp"} width={400} height={400} alt="Gallery image" />
                        <div className="absolute inset-0 hidden group-hover:block bg-dark-custom"></div>
                    </div>
                    <div className="relative w-full h-100 md:h-180 group">
                        <Image className="w-full h-full object-cover" src={"/images/gallary/pic15.webp"} width={400} height={400} alt="Gallery image" />
                        <div className="absolute inset-0 hidden group-hover:block bg-dark-custom"></div>
                    </div>
                    <div className="relative w-full h-100 md:h-180 group">
                        <Image className="w-full h-full object-cover" src={"/images/gallary/pic16.webp"} width={400} height={400} alt="Gallery image" />
                        <div className="absolute inset-0 hidden group-hover:block bg-dark-custom"></div>
                    </div>
                    <div className="relative w-full h-100 md:h-180 group md:block hidden">
                        <Image className="w-full h-full object-cover" src={"/images/gallary/pic17.webp"} width={400} height={400} alt="Gallery image" />
                        <div className="absolute inset-0 hidden group-hover:block bg-dark-custom"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReservationPage;