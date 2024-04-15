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
        numberOfGuests: 11,
        dateTime: "",
        idRestaurant: 0,
        seatingOption: "",
        specialRequest: "",
        type: "group"
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


    const [selectedTime, setSelectedTime] = useState(0)
    function createTimeSlots() {
        const slots = [];
        const currentTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        const minStartTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 11, 0, 0);
        const maxEndTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 21, 30, 0); 
        const durationMinutes = 2 * 60 + 15;
      
        let startTime = currentTime > minStartTime ? currentTime : minStartTime;
      
        startTime.setMinutes(startTime.getMinutes() + (15 - startTime.getMinutes() % 15) % 15);
        startTime.setSeconds(0);
        startTime.setMilliseconds(0);
      
        while (true) {
          const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
      
          if (endTime > maxEndTime) {
            break;
          }
      
          slots.push({
            start: formatTime(startTime),
            end: formatTime(endTime)
          });
      
          startTime = new Date(startTime.getTime() + 15 * 60000);
        }
      
        return slots;
    }
      
    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return hours + ':' + minutes + ' ' + ampm;
    }

    const timeSlots = createTimeSlots();
      
    const handleSubmit = async () => {  
        if (!reservation.firstName || !reservation.lastName || !reservation.email || !reservation.phone) {
            setError(true)
            return
        }
        if (!reservation.numberOfGuests || reservation.numberOfGuests < 11 || reservation.numberOfGuests > 20) {
            setError(true)
            return
        }
        const formData = new FormData();
        const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        formData.append("idRestaurant", reservation.idRestaurant);
        formData.append("firstName", reservation.firstName);
        formData.append("lastName", reservation.lastName);
        formData.append("email", reservation.email);
        formData.append("phone", reservation.phone);
        formData.append("numberOfGuests", reservation.numberOfGuests);
        formData.append("dateTime", date.toLocaleDateString() + " " + timeSlots[selectedTime].start);
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
                            <div className="mt-3">
                                <label className="text-black text-sm mt-3">Number of Guests</label>
                                <input value={reservation.numberOfGuests} onChange={(e) => setReservation({...reservation, numberOfGuests: e.target.value})} min={11} max={20} className="w-full border rounded-md py-2 px-3 mt-1" type="number"></input>
                                <i className="text-black text-sm font-medium">Please enter number from 11 to 20</i>
                            </div>
                            <div className="mt-3">
                                <label className="text-black text-sm mt-3">Time</label>
                                <br></br>
                                <select className="text-black border px-4 py-2 rounded-md">
                                    {timeSlots.map((time, index) => (
                                        <option onClick={() => {setSelectedTime(index)}} className="" key={index} value={index}>{time.start} - {time.end}</option>
                                    ))}
                                </select>
                                <br></br>
                                <i className="text-black text-sm font-medium">Please note that group reservation is just for the current day.</i>
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