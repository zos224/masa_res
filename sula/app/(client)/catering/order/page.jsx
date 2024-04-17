"use client"
import { useState } from "react";
import Image from "next/image";
const ContactPage = () => {
    const [catering, setCatering] = useState({
        name: "",
        email: "",
        phone: "",
        numberOfPeople: 0,
        dateTime: "",
        occasion: "Birthday",
        budget: "",
        additionalComments: ""
    })
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!catering.name || !catering.email || !catering.phone || !catering.numberOfPeople || !catering.dateTime || !catering.occasion || !catering.budget) {
            console.log(catering)
            setError("Please fill all the fields!")
            return
        }
        const formData = new FormData()
        formData.append('name', catering.name)
        formData.append('email', catering.email)
        formData.append('phone', catering.phone)
        formData.append('numberOfPeople', catering.numberOfPeople)
        formData.append('dateTime', catering.dateTime)
        formData.append('occasion', catering.occasion)
        formData.append('budget', catering.budget)
        formData.append('additionalComments', catering.additionalComments)
        const response = await fetch('/api/catering/create', {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            setSuccess(true)
        }
        else {
            alert("Something went wrong while submitting catering!")
        }
    }
    return (
        success ? (
            <div className="h-screen pt-40">
                <div className="text-center">
                    <Image className="mx-auto cursor-pointer" src={"/images/icon/success.gif"} width={50} height={50}></Image>
                    <p className="text-black text-lg font-semibold mt-5">Request Order Successfully!</p>
                </div>
                <div className="text-center mt-5">
                    <p className="text-black">We will contact you soon!</p>
                </div>
            </div>
        ) : (
        <div className="min-h-screen">
            <div className="relative">
                <Image className="max-h-100 object-cover" src={"/images/gallary/our_food.webp"} width={1920} height={1280}></Image>
                <span className="absolute text-4xl text-center font-gambarino bg-dark-custom lg:px-20 py-2 font-bold text-white sm:w-auto w-full top-1/2 sm:left-1/2 sm:-translate-x-1/2">
                    Catering
                </span>
            </div>
            <div className="py-10">
                <div className="lg:w-1/3 md:w-2/3 w-full mx-auto text-black bg-white px-4 py-2 border rounded-md">
                    <div className="text-lg text-center">Catering</div>
                    <div className="mt-4">
                        <label>Name</label>
                        <input className="w-full border rounded-md p-1" type="text" value={catering.name} onChange={(e) => setCatering({ ...catering, name: e.target.value })} />
                    </div>
                    <div className="mt-4">
                        <label>Email</label>
                        <input className="w-full border rounded-md p-1" type="email" value={catering.email} onChange={(e) => setCatering({ ...catering, email: e.target.value })} />
                    </div>
                    <div className="mt-4">
                        <label>Phone</label>
                        <input className="w-full border rounded-md p-1" type="text" value={catering.phone} onChange={(e) => setCatering({ ...catering, phone: e.target.value })} />
                    </div>
                    <div className="mt-4 md:flex gap-10">
                        <div className="w-full">
                            <label>Number of People</label>
                            <input className="border w-full px-4 py-2 rounded-md" type="number" value={catering.numberOfPeople} onChange={(e) => setCatering({ ...catering, numberOfPeople: e.target.value })} />
                        </div>
                        <div className="w-full mt-4 md:mt-0">
                            <label>Date</label>
                            <input className="border w-full px-4 py-2 rounded-md" type="datetime-local" value={catering.date} onChange={(e) => setCatering({ ...catering, dateTime: e.target.value })} />
                        </div>
                    </div>
                    <div className="mt-4 flex gap-10">
                        <div className="w-full">
                            <label>Occasion</label>
                            <select defaultValue={"Birthday"} className="w-full border px-4 py-2 rounded-md" value={catering.occasion} onChange={(e) => setCatering({ ...catering, occasion: e.target.value })}>
                                <option value="Birthday">Birthday</option>
                                <option value="Graduation">Graduation</option>
                                <option value="Holiday Party">Holiday Party</option>
                                <option value="Baby Shower">Baby Shower</option>
                                <option value="Bridal Shower">Bridal Shower</option>
                                <option value="Rehearsal Dinner">Rehearsal Dinner</option>
                                <option value="Retirement">Retirement</option>
                                <option value="Bachelor/Bachelorette">Bachelor/Bachelorette</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label>Budget</label>
                            <input className="w-full border rounded-md p-1.5" type="number" inputMode="decimal" value={catering.budget} onChange={(e) => setCatering({ ...catering, budget: e.target.value })} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label>Addition Comments</label>
                        <textarea className="border w-full p-2 rounded-md" rows={4} value={catering.additionalComments} onChange={(e) => setCatering({ ...catering, additionalComments: e.target.value })} />
                    </div>

                    {error != "" &&
                    <div className="mt-4 text-red">
                        {error}
                    </div>}
                    <div className="mt-4 text-center">
                        <button className="text-white bg-primary-color font-semibold px-4 py-2 rounded-md" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        )
    )
}
export default ContactPage;