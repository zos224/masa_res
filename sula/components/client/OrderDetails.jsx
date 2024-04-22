"use client"

import { useEffect, useState, useContext } from "react";
import { OrderContext } from "./OrderProvider";
import { APIProvider } from "@vis.gl/react-google-maps";
import SearchLocation from "./SearchLocation";

const OrderDetails = ({open, onClose}) => {
    const [restaurant, setRestaurant] = useState({})
    const [address, setAddress] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/restaurant/all')
            if (res.ok) {
                const data = await res.json()
                setRestaurant(data[0])
                setAddress(data[0].address.split("|")[0])
            }
        }
        fetchData()
    }, [])
    const [selectedDate, setSelectedDate] = useState(0);
    const [pickup, setPickup] = useState(true);
    const [delivery, setDelivery] = useState(false);
    const {orderDetails, updateOrderDetails} = useContext(OrderContext);

    useEffect(() => {
        setAddress(orderDetails.address)
    }, [orderDetails])
    const [error, setError] = useState("");
    function getDayName(date) {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dayNames[date.getDay()];
    }
    
    const datesAndDays = [];
    let date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    
    for (let i = 0; i < 7; i++) {
        let newDate = new Date(date);
        newDate.setDate(date.getDate() + i);
    
        if (i === 0) {
            let day = newDate.getDate();
            let month = newDate.getMonth() + 1; 
            let year = newDate.getFullYear();
            let formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;
            datesAndDays.push({
                date: newDate.getDate(),
                day: "Today",
                fullDate: formattedDate
            });
        } else {
            let day = newDate.getDate();
            let month = newDate.getMonth() + 1; 
            let year = newDate.getFullYear();
            let formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;
            datesAndDays.push({
                date: newDate.getDate(),
                day: getDayName(newDate),
                fullDate: formattedDate
            });
        }
    }

    const [selectedTime, setSelectedTime] = useState(0);
    function createTimeSlots(startHour, startMinute, endHour, endMinute, interval) {
        let slots = [];
        let date = new Date(); 
        date.setHours(startHour, startMinute, 0, 0);
    
        let endDate = new Date();
        endDate.setHours(endHour, endMinute, 0, 0);
    
        while (date <= endDate) {
            let time = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            slots.push(time);

            date.setMinutes(date.getMinutes() + interval);
        }
    
        return slots;
    }

    let times = createTimeSlots(10, 30, 21, 30, 15);

    const save = () => {
        if (delivery && address == "") {
            setError("Please enter your address");
            return
        }
        updateOrderDetails({
            ...orderDetails,
            date: datesAndDays[selectedDate].day + " " + datesAndDays[selectedDate].date,
            time: times[selectedTime],
            type: pickup ? "Pickup" : "Delivery",
            address: address,
            fullDate: datesAndDays[selectedDate].fullDate
        });
        onClose()
    }
    return (
        open && (
            <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 bg-dark-custom overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full">
                <div className="relative m-auto mt-20 w-full md:max-w-lg max-h-full">
                    <div className="relative bg-white rounded-lg shadow-md">
                        <div className="flex justify-between p-3">
                            <h1 className="text-black text-xl font-semibold">Schedule Order</h1>
                            <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-white bg-primary-color rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="pt-3 pb-6 px-3">
                            <div className="flex justify-between border-b py-7 text-center">
                                <div onClick={() => {setPickup(true); setDelivery(false)}} className={`w-1/2 py-2 font-semibold cursor-pointer rounded-full text-black font-base ${pickup ? "bg-primary-color text-white" : ""}`}>Pickup</div>
                                <div onClick={() => {setDelivery(true); setPickup(false)}} className={`w-1/2 py-2 font-semibold cursor-pointer rounded-full text-black font-base ${delivery ? "bg-primary-color text-white" : ""}`}>Delivery</div>
                            </div>
                            {delivery && (
                                <div className="mt-5">
                                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                                        <SearchLocation error={error}></SearchLocation>
                                    </APIProvider>
                                </div>
                            )}
                            {pickup && (
                                <div className="mt-2">
                                    <label className="text-black">Address</label>
                                    <select value={address} onChange={(e) => {setAddress(e.target.value)}} defaultValue={restaurant.address.split("|")[0]} className="w-full border rounded-md p-2 text-black-2">
                                        {restaurant.address.split("|").map((a, index) => (
                                            <option value={a} key={index}>{a}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <p className="text-sm mt-5 text-black">{pickup ? "Please select a location + day + time for Pickup" : "Please select a day + time for Delivery"}</p>
                            <div className="grid grid-cols-7 gap-1 mt-5 bg-zinc-300 rounded-md text-base mb-3">
                                {datesAndDays.map((date, index) => (
                                    <div onClick={() => {setSelectedDate(index)}} key={index} className={`cursor-pointer rounded-md p-2 text-center ${selectedDate == index ? "bg-primary-color text-white" : "text-black"}`}>
                                        <p className="font-semibold">{date.day}</p>
                                        <p className="text-center">{date.date}</p>
                                    </div>
                                ))}
                            </div>
                            <i className="text-sm text-black">All dates and times displayed in America/Los_Angeles</i>
                            <div className="max-h-70 overflow-auto">
                                {times.map((time, index) => (
                                    <div>
                                        <div onClick={() => {setSelectedTime(index)}} key={index} className={`cursor-pointer mt-4 rounded-full p-2 text-center ${selectedTime == index ? "bg-primary-color text-white" : "text-black border"}`}>
                                            <p className="font-semibold">{time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-end p-4">
                            <button onClick={save} className="w-fit px-4 bg-primary-color text-white py-2 rounded-md">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default OrderDetails;