import Image from "next/image";
import Link from "next/link";
export const metadata = {
    title: "Reservation | Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
  };
async function getRestaurant() {
    const res = await fetch(process.env.APP_URL + '/api/restaurant/all', {next: {revalidate: 3600}})
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
                <Image className="max-h-100 object-cover -my-px" src={"/images/bg/banner_reservation.png"} width={1920} height={1280}></Image>
                {/* <span className="absolute text-4xl text-center font-gambarino bg-dark-custom lg:px-20 py-2 px-5 font-bold text-white top-1/2 sm:left-1/2 sm:-translate-x-1/2">
                    Reservation
                </span> */}
            </div>
            <div className="py-10 bg-image text-center">
                <div className="text-white uppercase text-4xl font-semibold tracking-widest">{restaurant.name}</div>
                <div className="text-2xl uppercase mt-3">
                    <span className="text-white font-semibold">INDOOR DINING: </span>
                    <span className="text-white font-semibold">{restaurant.operationTimeIndoor}</span>
                </div>
                <div className="text-white mt-10 md:w-2/3 w-full mx-auto">
                    <p className="font-mrdehaviland text-7xl mb-4"> Authentic Indian Cuisines - Unforgettable Dining Experience </p>

                Embark on a culinary journey at Masala Of India Cuisine, savoring vibrant flavors and aromas of Indian cuisine. Our carefully curated menu features traditional and contemporary dishes prepared with fresh ingredients and authentic spices. Reserve your table today to experience the heart of India through our delectable offerings.
                </div>
                <div className="text-center mt-10 border-b-2 border-white md:w-1/3 mx-auto pb-7">
                    <Link href={"/reservation/table"}><button className="border-white border-2 text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300">RESERVE YOUR TABLE</button></Link>
                </div>
                <div className="text-center mt-10">
                    <span className="text-white text-3xl tracking-wider font-semibold uppercase">Reservation Terms & Conditions</span>
                    <p className="text-white text-base mt-5">
                        We aim to have you seated within 10 minutes of your entire party's arrival. <br></br>
                        Reservations will be held for 15 minutes. <br></br>
                        Reservations will be seated for up to a maximum of 2 hours.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default ReservationPage;