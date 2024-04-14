"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
const ReservationPage = () => {
    const [restaurant, setRestaurant] = useState({})
    const [step1, setStep1] = useState(true)
    const [success, setSuccess] = useState(false)
    const [reservation, setReservation] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        numberOfGuests: 2,
        dateTime: "",
        idRestaurant: 0,
        seatingOption: "",
        specialRequest: "",
        type: "table"
    })
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchRestaurant = async () => {
            const res = await fetch('/api/restaurant/all')
            const data = await res.json()
            setRestaurant(data[0])
            setReservation({...reservation, idRestaurant: data[0].id})
        }
        fetchRestaurant()
    }, [])

    const [selectedDate, setSelectedDate] = useState(0)
    const [selectedTime, setSelectedTime] = useState(0)
  
    const dates = []
    for (let i = 0; i < 30; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        dates.push(date)
    }

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

    const handleSubmit = async () => {  
        if (!reservation.firstName || !reservation.lastName || !reservation.email || !reservation.phone) {
            setError(true)
            return
        }
        const formData = new FormData();
        formData.append("idRestaurant", reservation.idRestaurant);
        formData.append("firstName", reservation.firstName);
        formData.append("lastName", reservation.lastName);
        formData.append("email", reservation.email);
        formData.append("phone", reservation.phone);
        formData.append("numberOfGuests", reservation.numberOfGuests);
        formData.append("dateTime", dates[selectedDate].toLocaleDateString() + " " + times[selectedTime]);
        formData.append("seatingOption", reservation.seatingOption);
        formData.append("specialRequest", reservation.specialRequest);
        formData.append("type", reservation.type);
        const res = await fetch('/api/reservation/create', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            setSuccess(true)
        }
    }
    return (
        restaurant && (
        <div className="bg-white pt-30 md:w-2/5 mx-auto pb-5">
            {step1 ? (
                <div className="border rounded-md py-3">
                    <div className="text-center border-b">
                        <p className="text-black font-bold text-lg">{restaurant.name}</p>
                        <p className="pb-3">{restaurant.address}</p>
                    </div>
                    <div className="flex gap-10 px-4 py-3 shadow-md">
                        <div className="w-1/4">
                            <div className="text-black">
                                <label>Guest</label>
                            </div>
                            <select onChange={(e) => setReservation({...reservation, numberOfGuests: e.target.value})} className="px-2 py-3 border rounded-md w-full text-black">
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                        </div>
                        <div className="w-2/4">
                            <div className="text-black">
                                <label>Date</label>
                            </div>
                            <select onChange={(e) => setSelectedDate(e.target.value)} className="px-2 py-3 border rounded-md w-full text-black">
                                {dates.map((date, index) => (
                                    <option key={index} value={index}>{date.toDateString()}</option>
                                ))}
                            </select>
                        </div>
                        {restaurant.seatingOption && (
                            <div>
                                <div>
                                    <label>Seating Option</label>
                                </div>
                                <select className="px-2 py-3 border rounded-md">
                                    <option value={"no"}>No preference</option>
                                    <option value={"inside"}>Inside</option>
                                    <option value={"outside"}>Outside</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="p-3 pb-8 text-center border-b">
                        <p className="text-black font-semibold">Select a time</p>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-7 mt-6">
                            {times.map((time, index) => (
                                <button onClick={() => {setSelectedTime(index)}} key={index} className={`border-2 text-black px-4 py-3 rounded-md ${selectedTime == index ? "border-primary-color" : ""}`}>{time}</button>
                            ))}
                        </div>
                    </div>
                    <div className="text-black p-4 border-b">
                        <p className="font-bold ">
                            Restaurant Terms & Conditions
                        </p>
                        <p className="text-sm">
                            - Patio reservations cannot be moved indoor <br></br>
                            - We aim to have you seated within 10 minutes of your entire party's arrival. <br></br>
                            - Reservations will be held for 10 minutes. <br></br>
                            - Reservations will be seated for up to a maximum of 2 hours.
                        </p>
                    </div>
                    <div className="py-5 px-3">
                        <button onClick={() => {setStep1(false)}} className="bg-primary-color text-white font-semibold w-full py-3 rounded-md">Continue</button>
                    </div>
                </div>
                ) : (
                    success ? (
                        <div className="h-screen">
                            <div className="text-center">
                                <Image className="mx-auto" src={"/images/icon/success.gif"} width={50} height={50}></Image>
                                <p className="text-black text-lg font-semibold mt-5">Reservation Successful</p>
                            </div>
                            <div className="text-center mt-5">
                                <p className="text-black">Thank you for your reservation</p>
                                <p className="text-black">We look forward to seeing you</p>
                            </div>
                        </div>
                    ) : (
                    <div className="border rounded-md py-3 px-5">
                        <div className="flex items-center ">
                            <Image onClick={() => setStep1(true)} className="w-7" src={"/images/icon/back.svg"} width={20} height={20}></Image>
                            <div className="w-11/12 text-center">
                                <p className="text-black font-bold text-lg">{restaurant.name}</p>
                                <p className="pb-3">{restaurant.address}</p>
                            </div>
                        </div>
                        <div className="pb-10 border-b">
                            <p className="text-black text-sm font-semibold">Reservation Details</p>
                            <p className="text-black text-sm mt-3">
                                {dates[selectedDate].toDateString()}, at {times[selectedTime]} <br></br>
                                {reservation.numberOfGuests} guests
                            </p>
                            <p className="text-black text-sm font-semibold mt-7">Personal Details</p>
                            <div className="flex gap-10 mt-3">
                                <div className="w-full">
                                    <label className="text-black text-sm">First Name</label>
                                    <input onChange={(e) => setReservation({...reservation, firstName: e.target.value})} className="w-full border rounded-md py-2 px-3 mt-1" type="text"></input>
                                </div>
                                <div className="w-full">
                                    <label className="text-black text-sm">Last Name</label>
                                    <input onChange={(e) => setReservation({...reservation, lastName: e.target.value})} className="w-full border rounded-md py-2 px-3 mt-1" type="text"></input>
                                </div>
                            </div>
                            <div className="mt-3"> 
                                <label className="text-black text-sm">Email</label>
                                <input onChange={(e) => setReservation({...reservation, email: e.target.value})} className="w-full border rounded-md py-2 px-3 mt-1" type="email"></input>
                            </div>
                            <div className="w-fit mt-3">
                                <label className="text-black text-sm mt-3">Phone</label>
                                <input onChange={(e) => setReservation({...reservation, phone: e.target.value})} className="w-full border rounded-md py-2 px-3 mt-1" type="text"></input>
                            </div>
                            <div className="mt-3">
                                <label className="text-black text-sm mt-3">Special Requests</label>
                                <textarea onChange={(e) => setReservation({...reservation, specialRequest: e.target.value})} className="w-full text-black border rounded-md py-2 px-3 mt-1" rows="4"></textarea>
                            </div>
                            {error && (<div className="text-red mt-2 font-medium">Please fill the form!</div>)}
                        </div>
                        <div className="mt-10">
                            <button onClick={handleSubmit} className="bg-primary-color text-white font-semibold w-full py-3 rounded-md">Reserve</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    )
}
export default ReservationPage;