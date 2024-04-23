"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
const ReservationPage = () => {
    const [restaurant, setRestaurant] = useState(null)
    const [step1, setStep1] = useState(true)
    const [success, setSuccess] = useState(false)
    const [reservation, setReservation] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        numberOfGuests: "1",
        dateTime: "",
        idRestaurant: 0,
        seatingOption: "",
        specialRequest: "",
        type: "table",
        location: ""
    })
    const [viewPolicy, setViewPolicy] = useState(false)
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
        let date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
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
        formData.append("location", reservation.location);
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
        <div className="bg-image">
            <div className="relative">
                <Image className="max-h-100 object-cover -m-px" src={"/images/bg/banner_reservation.png"} width={1920} height={1280}></Image>
                {/* <span className="absolute text-4xl text-center font-gambarino bg-dark-custom lg:px-20 py-2 px-5 font-bold text-white top-1/2 sm:left-1/2 sm:-translate-x-1/2">
                    Reservation
                </span> */}
            </div>
            <div className="pt-30 md:w-2/5 mx-auto pb-5">
            {step1 ? (
                <div className="border border-white rounded-md py-3">
                    <div className="text-center border-b border-white uppercase">
                        <p className="text-white font-bold text-xl">{restaurant.name}</p>
                        <p className="pb-3 text-white">{restaurant.address.split('|').map((a, index) => (
                        <div key={index}>Address {index+1}: {a}</div>
                      ))}</p>
                    </div>
                    <div className="flex gap-10 px-4 py-3 shadow-md border-b border-white">
                        <div className="w-full">
                            <div className="text-white">
                                <label>GUEST</label>
                            </div>
                            <select onChange={(e) => setReservation({...reservation, numberOfGuests: e.target.value})} className="px-2 py-3 border  rounded-md w-full text-black">
                                <option value={"1"}>1</option>
                                <option value={"2"}>2</option>
                                <option value={"3"}>3</option>
                                <option value={"4"}>4</option>
                                <option value={"5"}>5</option>
                                <option value={"6"}>6</option>
                                <option value={"7"}>7</option>
                                <option value={"8"}>8</option>
                                <option value={"9"}>9</option>
                                <option value={"10"}>10</option>
                                <option value={"10+"}>10+</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <div className="text-white">
                                <label>DATE</label>
                            </div>
                            <select onChange={(e) => setSelectedDate(e.target.value)} className="px-2 py-3 border rounded-md w-full text-black">
                                {dates.map((date, index) => (
                                    <option key={index} value={index}>{date.toDateString()}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full">
                            <div className="text-white">
                                <label>ADDRESS</label>
                            </div>
                            <select onChange={(e) => setReservation({...reservation, location: e.target.value})} className="px-2 py-3 border rounded-md w-full text-black">
                                {restaurant.address.split('|').map((a, index) => (
                                    <option key={index}>{a}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="p-3 pb-8 text-center border-b border-white">
                        <p className="text-white font-semibold uppercase">Select a time</p>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-7 mt-6">
                            {times.map((time, index) => (
                                <button onClick={() => {setSelectedTime(index)}} key={index} className={`border-2 text-white px-4 py-3 rounded-2xl ${selectedTime == index ? "border-primary-color" : ""}`}>{time}</button>
                            ))}
                        </div>
                    </div>
                    <div className="text-white py-2 px-4 border-b">
                        <p className="font-bold text-xl uppercase">
                            Terms & Conditions
                        </p>
                        <p className="text-sm">
                            We aim to have you seated within 10 minutes of your entire party's arrival. <br></br>
                            Reservations will be held for 15 minutes. <br></br>
                            Reservations will be seated for up to a maximum of 2 hours.
                        </p>
                    </div>
                    <div className="py-5 px-3">
                        <button onClick={() => {setStep1(false)}} className="border-white w-full text-2xl font-bold border-2 text-white uppercase px-6 py-1 bg-primary-hover duration-300">Continue</button>
                    </div>
                </div>
                ) : (
                    success ? (
                        <div className="h-screen bg-image">
                            <div className="text-center">
                                <Image className="mx-auto cursor-pointer" src={"/images/icon/success.gif"} width={50} height={50}></Image>
                                <p className="text-white text-lg font-semibold mt-5">Reservation Successful</p>
                            </div>
                            <div className="text-center mt-5">
                                <p className="text-white">Thank you for your reservation</p>
                                <p className="text-white">We look forward to seeing you</p>
                            </div>
                        </div>
                    ) : (
                    <div className="border border-white rounded-md py-3 ">
                        <div className="flex items-center border-b border-white px-5">
                            <Image onClick={() => setStep1(true)} className="w-7 cursor-pointer" src={"/images/icon/back.svg"} width={20} height={20}></Image>
                            <div className="w-11/12 text-center uppercase">
                                <p className="text-white font-bold text-xl">{restaurant.name}</p>
                                <p className="pb-3 text-white">{restaurant.address.split('|').map((a, index) => (
                                    <div key={index}>Address {index+1}: {a}</div>
                                ))}</p>
                            </div>
                        </div>
                        <div className="pb-10 border-b border-white px-5 mt-5">
                            <p className="text-white font-semibold">Reservation Details</p>
                            <p className="text-white mt-3">
                                {dates[selectedDate].toDateString()}, at {times[selectedTime]} <br></br>
                                {reservation.numberOfGuests} guests
                            </p>
                            <p className="text-white font-semibold mt-7">Personal Details</p>
                            <div className="flex gap-10 mt-3">
                                <div className="w-full">
                                    <label className="text-white">First Name</label>
                                    <input onChange={(e) => setReservation({...reservation, firstName: e.target.value})} className="w-full text-black border rounded-md py-2 px-3 mt-1" type="text"></input>
                                </div>
                                <div className="w-full">
                                    <label className="text-white">Last Name</label>
                                    <input onChange={(e) => setReservation({...reservation, lastName: e.target.value})} className="w-full text-black border rounded-md py-2 px-3 mt-1" type="text"></input>
                                </div>
                            </div>
                            <div className="mt-3"> 
                                <label className="text-white">Email</label>
                                <input onChange={(e) => setReservation({...reservation, email: e.target.value})} className="w-full border text-black rounded-md py-2 px-3 mt-1" type="email"></input>
                            </div>
                            <div className="w-fit mt-3">
                                <label className="text-white mt-3">Phone</label>
                                <input onChange={(e) => setReservation({...reservation, phone: e.target.value})} className="w-full border text-black rounded-md py-2 px-3 mt-1" type="text"></input>
                            </div>
                            <div className="mt-3">
                                <label className="text-white mt-3">Special Requests</label>
                                <textarea onChange={(e) => setReservation({...reservation, specialRequest: e.target.value})} className="w-full text-black border rounded-md py-2 px-3 mt-1" rows="4"></textarea>
                            </div>
                            {error && (<div className="text-red mt-2 font-medium">Please fill the form!</div>)}
                        </div>
                        <div className="text-white m-5">
                            By clicking "Reserve" you agree to the <b onClick={() => setViewPolicy(true)} className="text-white cursor-pointer">Masala's policy</b>.
                        </div>
                        {viewPolicy && (
                        <div className="w-full z-99 absolute top-0 left-0 h-full bg-dark-custom">
                            <div className="absolute text-black max-w-230 h-[calc(80%)] overflow-auto top-30 bg-white px-20 py-5 rounded-md md:left-1/2 md:-translate-x-1/2">
                                <div className="font-bold text-xl text-center uppercase">Reservation Policy</div>
                                <div className="mt-5"> 
                                    <p className="text-lg font-semibold mt-2">Reservation Requests</p>
                                    Reservations can be made via phone, online booking system, or in-person at least 24 hours in advance.
                                    For large parties (10 or more guests), we recommend making reservations at least 48 hours in advance to ensure accommodation.

                                    <p className="text-lg font-semibold mt-2">Confirmation</p>

                                    A confirmation of the reservation will be provided via email, SMS, or phone call.
                                    Please confirm your reservation at least 2 hours before the scheduled time. Failure to confirm may result in cancellation to accommodate other guests.

                                    <p className="text-lg font-semibold mt-2">Cancellation Policy</p>

                                    We understand plans can change. Please notify us at least 2 hours prior to your reservation if you need to cancel or modify your booking.
                                    Cancellations made less than 2 hours before the reservation time may incur a cancellation fee.

                                    <p className="text-lg font-semibold mt-2">Late Arrivals</p>

                                    We will hold your table for 15 minutes past the reservation time. If you anticipate being late, please inform us as soon as possible.
                                    Late arrivals may result in a reduced dining time to accommodate subsequent reservations.

                                    <p className="text-lg font-semibold mt-2">Walk-Ins</p>

                                    While we welcome walk-in guests, we prioritize reservations. Availability for walk-ins will be subject to table availability at the time of arrival.

                                    <p className="text-lg font-semibold mt-2"> Special Requests</p>

                                    Please inform us of any special requests such as dietary restrictions, seating preferences, or special occasions at the time of booking. We will do our best to accommodate your needs.

                                    <p className="text-lg font-semibold mt-2">Group Reservations and Events</p>

                                    For group reservations and private events, please contact our events team at least one week in advance to discuss options and availability.

                                    <p className="text-lg font-semibold mt-2">Reservation Duration</p>

                                    We kindly request that guests limit their dining time to 2 hours to accommodate other patrons, especially during peak hours.

                                    <p className="text-lg font-semibold mt-2">Service Charge and Gratuity</p>

                                    A service charge may be added for large parties or special events. Gratuity is not included in the bill and is at the discretion of the guest.

                                    <p className="text-lg font-semibold mt-2"> Changes to Policy</p>

                                    We reserve the right to update or modify our reservation policy at any time. Any changes will be communicated through our website or directly to guests with existing reservations.</div>
                                    <div className="text-center mt-10">
                                        <button onClick={() => setViewPolicy(false)} className="bg-primary-color text-lg text-white px-7 py-3 rounded-md">Done</button>
                                    </div>
                                </div> 
                            </div>
                        )}
                        <div className="mt-10 mx-5">
                            <button onClick={handleSubmit} className="border-white w-full text-2xl font-bold border-2 text-white uppercase px-6 py-1 bg-primary-hover duration-300">Reserve</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        )
    )
}
export default ReservationPage;