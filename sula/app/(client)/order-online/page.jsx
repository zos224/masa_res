"use client"
import Link from "next/link";
import Image from "next/image";
import { APIProvider, AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
const OrderPage =  () => {
    const positionRes = {"lat":47.7084394664091,"lng":-122.3227907590838}
    const positionRes2 = {"lat": 47.6906201, "lng": -122.2909153}
    const midPoint = {"lat": 47.69952978320455, "lng": -122.3068530295419};
    return (

    <div>
        <div className="relative">
            <Image className="max-h-100 object-cover" src={"/images/bg/banner_online.png"} width={1920} height={1280}></Image>
            <span className="absolute md:text-8xl text-5xl uppercase text-center font-gambarino lg:px-20 py-2 px-5 text-white top-1/3 w-full">
              Order Online
            </span>
        </div>
        <div className="pt-10 bg-image"> 
            <div className="text-center">
                <Link href={"/contact"} className="border-white border-2 text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300">OPENING HOURS</Link>
            </div>
            <div className="text-center mt-10 border-b-2 border-white w-fit mx-auto pb-6">
                <Image className="mx-auto" src={"/images/icon/handbag.png"} width={120} height={90}></Image>
                <div className="mt-10">
                    <span className="text-white font-bold text-3xl font-jost">MINIMUM ORDER</span>
                    <p className="mt-3 text-white font-normal text-xl">
                        Take Out: No Minimum
                        <br/>
                        Free Delivery for Orders Above: $45
                    </p>
                </div>
            </div>
            <div className="flex flex-col w-fit gap-4 mx-auto mt-6">
                <Link className="border-white border-2 text-center text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300" href={"/order-masala"}>ORDER ONLINE</Link>
                <Link className="border-white border-2 text-center text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300" href={"/contact"}>ORDER BY PHONE</Link>
            </div>
            <div className="mx-auto text-center mt-20 pb-10">
                <p className="text-2xl font-jost text-white font-semibold">DISTANCE CALCULATOR & DIRECTIONS FOR PICK UP</p>
                <p className="mt-1 text-white">Click on directions or view larger map below to find the distance to your address</p>
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
  );
};

export default OrderPage;