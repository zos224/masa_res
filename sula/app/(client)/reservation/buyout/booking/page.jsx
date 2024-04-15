"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const ReservationPage = () => {
    const [restaurant, setRestaurant] = useState({})
    const router = useRouter()
    const [success, setSuccess] = useState(false)
    const [reservation, setReservation] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        numberOfGuests: 20,
        dateTime: "",
        idRestaurant: 0,
        seatingOption: "",
        specialRequest: "",
        type: "buyout",
        time: "lunch"
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
      
    const handleSubmit = async () => {  
        if (!reservation.firstName || !reservation.lastName || !reservation.email || !reservation.phone || !reservation.dateTime || !reservation.time) {
            setError(true)
            return
        }
        if (!reservation.numberOfGuests || reservation.numberOfGuests < 20 || reservation.numberOfGuests > 100) {
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
        formData.append("dateTime", reservation.dateTime);
        formData.append("seatingOption", reservation.seatingOption);
        formData.append("specialRequest", reservation.specialRequest);
        formData.append("type", reservation.type);
        formData.append("time", reservation.time);
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
            success ? (
                <div className="h-screen pt-100">
                    <div className="text-center">
                        <Image className="mx-auto cursor-pointer" src={"/images/icon/success.gif"} width={50} height={50}></Image>
                        <p className="text-black text-lg font-semibold mt-5">Reservation Successful</p>
                    </div>
                    <div className="text-center mt-5">
                        <p className="text-black">Thank you for your reservation</p>
                        <p className="text-black">We look forward to seeing you</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white pt-30 md:w-2/5 mx-auto pb-5 min-h-screen">
                    <div className="border rounded-md py-3 px-5">
                        <div className="flex items-center ">
                            <Image onClick={() => {router.back()}} className="w-7 cursor-pointer" src={"/images/icon/back.svg"} width={20} height={20}></Image>
                            <div className="w-11/12 text-center">
                                <p className="text-black font-bold text-lg">{restaurant.name}</p>
                                <p className="pb-3">{restaurant.address}</p>
                            </div>
                        </div>
                        <div className="pb-10 border-b">
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
                            <div className="mt-3 lg:flex gap-10">
                                <div className="lg:w-2/4 w-full">
                                    <label className="text-black text-sm">Number of Guests</label>
                                    <input value={reservation.numberOfGuests} onChange={(e) => setReservation({...reservation, numberOfGuests: e.target.value})} min={20} max={100} className="w-full border rounded-md py-2 px-3 mt-1" type="number"></input>
                                    <i className="text-black text-sm font-medium">Please enter number from 20 to 100</i>
                                </div>
                                <div className="lg:w-1/4 lg:mt-0 mt-4 w-full">
                                    <label className="text-black text-sm">Date</label>
                                    <input onChange={(e) => setReservation({...reservation, dateTime: e.target.value})} className="w-full  border rounded-md py-2 px-3 mt-1" type="date"></input>
                                </div>
                                <div className="lg:w-1/4 w-full lg:mt-1 mt-4">
                                    <label className="text-black text-sm">Time</label>
                                    <div>
                                        <select className="text-black border px-4 py-2.5 rounded-md">
                                            <option onClick={() => {setReservation({...reservation, time: "lunch"})}} value={"lunch"}>Lunch</option>
                                            <option onClick={() => {setReservation({...reservation, time: "dinner"})}} value={"dinner"}>Dinner</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-black text-sm mt-3">Event Details</label>
                                <textarea onChange={(e) => setReservation({...reservation, specialRequest: e.target.value})} className="w-full border rounded-md py-2 px-3 mt-1" type="text"></textarea>
                            </div>
                            {error && (<div className="text-red mt-2 font-medium">Please fill the form!</div>)}
                        </div>
                        <div className="text-black p-4 border-b">
                                <p className="font-bold ">
                                    Restaurant Terms & Conditions
                                </p>
                                <p className="text-sm">
                                    - Please note we do not seat incomplete parties. <br></br>
                                    - We aim to have you seated vhthin 10 minutes of your entire party's arrival. <br></br>
                                    - Reservations will be held for 10 minutes. <br></br>
                                    - Groups will be seated for up to a maximum of 2 Hours and 15 Minutes
                                </p>
                            </div>
                        <div className="mt-10">
                            <button onClick={handleSubmit} className="bg-primary-color text-white font-semibold w-full py-3 rounded-md">Reserve</button>
                        </div>
                    </div>
                </div> 
            )
        )
    )
}
export default ReservationPage;