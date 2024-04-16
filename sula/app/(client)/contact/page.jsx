import Image from "next/image";
import Link from "next/link";
export const metadata = {
    title: "Contact | Masala Of India - Indian Cuisine in Seattle, WA",
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
const ContactPage = async () => {
    const restaurant = await getRestaurant()

    return (
        restaurant && (
	<div className="min-h-screen">
            <div className="relative">
                <Image className="max-h-100 object-cover" src={"/images/bg/bg5.jpg"} width={1920} height={1280}></Image>
                <span className="absolute text-4xl text-center font-gambarino bg-dark-custom lg:px-20 py-2 px-5 font-bold text-white top-1/2 sm:left-1/2 sm:-translate-x-1/2">
                    Contact
                </span>
            </div>
            <div className="py-10 text-center">
                <div className="text-black text-4xl font-semibold tracking-widest">{restaurant.name}</div>
                <div className="flex justify-evenly mt-4 text-black">
                    <div className="text-xl mt-3">
                        <span>Operation Time Indoor: {restaurant.operationTimeIndoor}</span>
                    </div>
                    <div className="text-xl mt-3">
                        <span>Operation Time Takeaway: {restaurant.operationTimeTakeAway}</span>
                    </div>
                </div>
                <div className="text-xl text-black mt-5">
                    <span>Phone: {restaurant.phoneNumber}</span>
                </div>
            </div>
        </div>
	)
    )
}
export default ContactPage;