"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
const OrderMaSalaPage = () => {
    const [pickup, setPickup] = useState(true)
    const [delivery, setDelivery] = useState(false)
    const [listRestaurant, setListRestaurant] = useState([]);
    useEffect(() => {
        const getRestaurant = async () => {
          let response = await fetch('/api/restaurant/all'); 
          if (response.ok) {
            let data = await response.json();
            setListRestaurant(data);
          }
          else {
            throw new Error("Error fetching data");
          }
        }
        getRestaurant();
      }, []);
    const phoneNumber = (number) => {
    var areaCode = number.substring(0, 3);
    var middle = number.substring(3, 6);
    var last = number.substring(6, 10);

    return areaCode + '-' + middle + '-' + last;
    }
    return (
        <div className="relative">
            <div className="bg-white absolute z-10 xsm:max-w-md w-full px-5 h-screen">
                <div className="flex mt-30 text-center">
                    <span onClick={() => {setPickup(true); setDelivery(false)}} className={`rounded-full py-2 w-1/2 cursor-pointer text-black font-bold ${pickup ? "bg-primary-color text-white" : ""}`}>Pickup</span>
                    <span onClick={() => {setDelivery(true); setPickup(false)}} className={`rounded-full py-2 cursor-pointer w-1/2 text-black font-bold ${delivery ? "bg-primary-color text-white" : ""}`}>Delivery</span>
                </div>
                <hr className="mt-5"></hr>
                {delivery && (
                    <div className="mt-10">
                        <p className="text-black text-lg font-semibold">Where are we delivaring to?</p>
                        <input type="text" className="mt-2 w-full border-b-2 rounded-none focus:border-primary-color outline-none p-1" placeholder="Enter location"></input>
                        <button className="bg-primary-color rounded-full text-sm px-6 py-2 text-white font-semibold mt-4">Save</button>
                    </div>
                )}
                {listRestaurant.map((restaurant, index) => (
                    <div key={index} className="mt-10 p-5 rounded-lg bg-slate-100 hover:shadow-lg">
                        <h2 className="text-black text-lg font-semibold">{restaurant.name}</h2>
                        <p className="text-black text-sm">{restaurant.address}</p>
                        <Image className="mt-5 w-full aspect-4/3 object-cover" alt={restaurant.name} src={restaurant.image} width={400} height={300}></Image>
                        <p className="mt-3">
                            <span className="text-black font-semibold">Opening Time: </span>
                            <span className="text-black">{restaurant.operationTimeIndoor}</span>
                        </p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-black text-lg">{phoneNumber(restaurant.phoneNumber)}</p>
                            <button className="bg-primary-color rounded-full px-6 py-2 text-white font-semibold">Order</button>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className="w-full overflow-auto h-full">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2684.7848425171815!2d-122.32543182315692!3d47.70801458096831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490115703299c53%3A0x140fbebc49128727!2sNorthgate%20Fifth%20Ave%20-%20Super%20Sport%2C%20507%20NE%20Northgate%20Way%2C%20Seattle%2C%20WA%2098125%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1712507635538!5m2!1svi!2s" className="border-none w-full h-screen"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
};

export default OrderMaSalaPage;