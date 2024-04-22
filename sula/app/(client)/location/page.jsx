"use client"
import { APIProvider, AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const LocationPage = () => {
    const [restaurant, setRestaurant] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/restaurant/all')
            if (res.ok) {
                const data = await res.json()
                setRestaurant(data[0])
            }
        }
        fetchData()
    }, [])
    const positionRes = {"lat":47.7084394664091,"lng":-122.3227907590838}
    const positionRes2 = {"lat": 47.6906201, "lng": -122.2909153}
    const midPoint = {"lat": 47.69952978320455, "lng": -122.3068530295419};
    return (
        restaurant && <div>
            <div className="relative">
                <Image className="max-h-125 object-cover" src={"/images/gallary/pic9.webp"} width={1920} height={1280}></Image>
                <span className="absolute text-8xl uppercase text-center font-gambarino py-2 px-5 text-white top-1/2 w-full">
                    {restaurant.name}
                </span>
            </div>
            <div className="py-15 text-center text-white">
                <div className="text-2xl mt-10 uppercase font-semibold">
                    Welcome to {restaurant.name} Cuisine <br></br> The best Indian restaurant in Seattle, WA. 
                </div>
                <div className="mt-10"> 
                    <p className="md:text-7xl text-5xl font-mrdehaviland tracking-widest">Cuisine & Refreshments</p>
                    <p className="md:text-lg text-sm mt-5 md:w-2/3 w-full md:mx-auto">Our menu features a blend of timeless classics, handpicked Mumbai street food delights, and authentic seafood from Mangalore in South India, all complemented by our fresh cocktail creations.</p>
                    <div className="grid md:gap-10 gap-5 md:grid-cols-2 grid-cols-1 md:mx-20 mx-5 mt-10">
                        <Image className="md:h-230 h-150 object-cover" src={"/images/bg/cuisine1.jpg"} width={1000} height={800}></Image>
                        <Image className="md:h-230 h-150 object-cover" src={"/images/bg/cuisine2.jpg"} width={1000} height={800}></Image>
                        <Image className="md:h-230 h-150 object-cover" src={"/images/bg/cuisine3.jpg"} width={1000} height={800}></Image>
                        <Image className="md:h-230 h-150 object-cover" src={"/images/bg/cuisine4.jpg"} width={1000} height={800}></Image>
                    </div>
                </div>
                <div className="mt-20"> 
                    <p className="md:text-7xl text-5xl font-mrdehaviland tracking-widest">Dining Experience</p>
                    <p className="md:text-lg text-sm mt-5 md:w-2/3 w-full md:mx-auto">Step into our dining room, where natural light illuminates the space, highlighting Indian antiques, temple carvings, and reclaimed wood accents paired with brass fixtures and contemporary lighting. Relax into our comfortable chairs for an authentic Indian dining experience.</p>
                    <div className="grid md:gap-10 gap-5 md:grid-cols-2 grid-cols-1 md:mx-20 mx-5 mt-10">
                        <Image className="md:h-230 h-150 object-cover" src={"/images/bg/dining1.webp"} width={1000} height={800}></Image>
                        <Image className="md:h-230 h-150 object-cover" src={"/images/bg/dining2.jpg"} width={1000} height={800}></Image>
                    </div>
                </div>
                <div className="mt-10"> 
                    <p className="text-3xl font-bold tracking-widest uppercase">Book a table or order online for takeout & delivery</p>
                    <div className="flex justify-evenly mt-15">
                        <Link className="border-white border-2 text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300" href={"/reservation/table"}>Table Reservation</Link>
                        <Link className="border-white border-2 text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300" href={"/order-online"}>Order Online</Link>
                    </div>
                </div>
                <div className="mt-10"> 
                    <p className="text-3xl font-bold tracking-widest uppercase">Get Direction</p>
                    <div className="mt-10 md:w-4/5 mx-auto h-150"> 
                        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                            <Map defaultCenter={midPoint} zoom={14} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
                                <AdvancedMarker position={positionRes} >
                                    <Pin scale={1.4} background="green" borderColor="green" glyphColor="white"></Pin>
                                </AdvancedMarker>
                                <AdvancedMarker position={positionRes2} >
                                    <Pin scale={1.4} background="green" borderColor="green" glyphColor="white"></Pin>
                                </AdvancedMarker>
                            </Map>
                        </APIProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LocationPage;