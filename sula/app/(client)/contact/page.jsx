import Image from "next/image";
import Link from "next/link";
export const metadata = {
    title: "Contact | Masala Of India - Indian Cuisine in Seattle, WA",
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
const ContactPage = async () => {
    const restaurant = await getRestaurant()
    const phoneNumber = (number) => {
        var areaCode = number.substring(0, 3);
        var middle = number.substring(3, 6);
        var last = number.substring(6, 10);
    
        return areaCode + '-' + middle + '-' + last;
    }
    return (
        <div className="min-h-screen">
            <div className="relative">
                <Image className="max-h-100 object-cover" src={"/images/bg/banner_contact.png"} width={1920} height={1280}></Image>
                <span className="absolute md:text-7xl text-5xl uppercase text-center font-gambarino lg:px-20 py-2 px-5 font-bold text-white top-1/3 w-full">
                    Contact
                </span>
            </div>
            <div className="text-center bg-image-contact min-h-203">
                <div className="w-full text-center pt-50">
                    <div className="text-white uppercase text-4xl font-semibold tracking-widest">{restaurant.name}</div>
                    <div className="flex flex-wrap uppercase text-xl justify-evenly mt-4 text-white">
                        <div className="mt-3">
                            <span>Operation Time Indoor: {restaurant.operationTimeIndoor}</span>
                        </div>
                        <div className="mt-3">
                            <span>Operation Time Takeaway: {restaurant.operationTimeTakeAway}</span>
                        </div>
                    </div>
                    <div className="font-jost md:text-xl text-lg text-white gap-3 mt-5 flex flex-wrap uppercase justify-evenly">{restaurant.address.split('|').map((a, index) => (
                        <div className="uppercase" key={index}>{a}
                            <div className="mt-2">{phoneNumber(restaurant.phoneNumber)}</div>
                        </div>
                    ))}</div>
                    <div className="mt-20">
                        <Link className="border-white border-2 text-white uppercase text-base font-medium bg-primary-hover px-10 py-4 duration-300" href={"/contact/feedback"}>Feedback</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContactPage;