"use client"
import Image from "next/image";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
const SpecialOffersPage = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch('/api/event/active')
            if (res.ok) {
                const data = await res.json()
                setEvents(data)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        fetchEvents()
        AOS.init({
            duration: 1100,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            delay: 100,
            offset: 200
        });
    }, [])

    return (
        <div>
            <div className="relative">
                <Image className="w-full max-h-115 object-cover" src={"/images/bg/banner_offer.png"} width={1000} height={500}></Image>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute lg:top-1/2 top-1/3 w-full text-center">
                        <div className="tracking-widest uppercase font-gambarino text-white md:text-7xl text-5xl">Special Offers</div>
                        <div className="text-white font-mrdehaviland tracking-wide md:text-6xl text-4xl mt-2">just for you</div>
                    </div>
                </div>
            </div>
            <div className="py-10 bg-image text-center min-h-screen">
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:px-10 px-2">
                        {events.map((event, index) => (
                            <div data-aos="fade-left" key={index} className="bg-white text-white shadow-md rounded-md">
                                <Image className="rounded-md mx-auto w-full" src={event.image} width={500} height={300}></Image>
                                <div className="p-5 pt-2">
                                    <div className="text-xl font-semibold mt-5">{event.name}</div>
                                    <div className="text-gray-500 mt-2">{event.description}</div>
                                    <div className="text-black mt-5 font-semibold">Start Date: {moment(event.startDate).format('YYYY-MM-DD')}</div>
                                    <div className="text-black mt-2 font-semibold">End Date:  {moment(event.endDate).format('YYYY-MM-DD')}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-semibold text-white">No Special Offers Available Now</h1>
                    </div>
                )}
            </div>
        </div>
    )
}
export default SpecialOffersPage;