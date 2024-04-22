"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CldUploadWidget } from 'next-cloudinary';
const ContactPage = () => {
    const [feedback, setFeedback] = useState({
        idRestaurant: 0,
        name: "",
        email: "",
        phone: "",
        orderType: "",
        date: "",
        idOrder: "",
        orderIssues: "",
        image: ""
    })
    useEffect(() => {
        const fetchRestaurant = async () => {
            const res = await fetch('/api/restaurant/all')
            if (res.ok) {
                const data = await res.json()
                setFeedback(prevFeedback => ({...prevFeedback, idRestaurant: data[0].id}))
            }
        }
        fetchRestaurant()
    }, [])

    const [oldImageUrl, setOldImageUrl] = useState('')
    const [success, setSuccess] = useState(false)
    const handleSuccess = async (results) => {
        const newImage = results.info.secure_url
        setFeedback(prevFeedback => ({...prevFeedback, image: newImage}))
    };
    const [error, setError] = useState('')
    useEffect(() => {
        const updateImage = async () => {
            const formData = new FormData();
            const publicId = oldImageUrl.substring(oldImageUrl.lastIndexOf('/') + 1, oldImageUrl.lastIndexOf('.'))
            formData.append('publicId', publicId)
            const response = await fetch('/api/cloudinary/delete', {
                method: "POST",
                body: formData
            })
            if (response.ok) {
                setOldImageUrl(feedback.image)
                }
        }
        if (oldImageUrl) {
            updateImage()
        }
        else {
            setOldImageUrl(feedback.image)
        }
    }, [feedback.image])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!feedback.name || !feedback.email || !feedback.phone || !feedback.orderType || !feedback.date || !feedback.orderIssues || !feedback.image) {
            setError("Please fill all the fields!")
            return
        }
        const formData = new FormData()
        formData.append('idRestaurant', feedback.idRestaurant)
        formData.append('name', feedback.name)
        formData.append('email', feedback.email)
        formData.append('phone', feedback.phone)
        formData.append('orderType', feedback.orderType)
        formData.append('date', feedback.date)
        formData.append('idOrder', feedback.idOrder)
        formData.append('orderIssues', feedback.orderIssues)
        formData.append('image', feedback.image)
        const response = await fetch('/api/feedback/create', {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            setSuccess(true)
        }
        else {
            alert("Something went wrong while submitting feedback!")
        }
    }
    return (
        success ? (
            <div className="h-screen pt-40">
                <div className="text-center">
                    <Image className="mx-auto cursor-pointer" src={"/images/icon/success.gif"} width={50} height={50}></Image>
                    <p className="text-white text-lg font-semibold mt-5">Feedback Sent!</p>
                </div>
                <div className="text-center mt-5">
                    <p className="text-white">Thank you for your feedback</p>
                    <p className="text-white">We will do the best!</p>
                </div>
            </div>
        ) : (
        <div className="min-h-screen">

            <div className="relative">
                <Image className="max-h-100 object-cover" src={"/images/bg/banner_contact.png"} width={1920} height={1280}></Image>
                <span className="absolute md:text-7xl text-5xl uppercase text-center font-gambarino lg:px-20 py-2 px-5 font-bold text-white top-1/3 w-full">
                Feedback / Issues / Complaints
                </span>
            </div>
            <div className="py-10">
                <div className="md:w-1/3 w-full mx-auto text-white px-4 py-2 border rounded-md">
                    <div className="text-lg text-center">Feedback / Issues / Complaints</div>
                    <div className="mt-4">
                        <label>Name</label>
                        <input className="w-full text-black border rounded-md p-1" type="text" value={feedback.name} onChange={(e) => setFeedback({ ...feedback, name: e.target.value })} />
                    </div>
                    <div className="mt-4">
                        <label>Email</label>
                        <input className="w-full text-black border rounded-md p-1" type="email" value={feedback.email} onChange={(e) => setFeedback({ ...feedback, email: e.target.value })} />
                    </div>
                    <div className="mt-4">
                        <label>Phone</label>
                        <input className="w-full text-black border rounded-md p-1" type="text" value={feedback.phone} onChange={(e) => setFeedback({ ...feedback, phone: e.target.value })} />
                    </div>
                    <div className="mt-4">
                        <label>Order Type</label>
                        <select className="mx-5 text-black border px-4 py-2 rounded-md" value={feedback.orderType} onChange={(e) => setFeedback({ ...feedback, orderType: e.target.value })}>
                            <option value="Indoor Dining">Indoor Dining</option>
                            <option value="Take out">Take out</option>
                            <option value="Delivery">Delivery</option>
                            <option value="Catering">Catering</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label>Order ID</label>
                        <input className="w-full text-black border rounded-md p-1" type="text" value={feedback.idOrder} onChange={(e) => setFeedback({ ...feedback, idOrder: e.target.value })} />
                        <i className="text-sm">Don't fill this if you don't have order id</i>
                    </div>
                    <div className="mt-4">
                        <label>Date</label>
                        <input className="mx-5 border text-black px-4 py-2 rounded-md" type="date" value={feedback.date} onChange={(e) => setFeedback({ ...feedback, date: e.target.value })} />
                    </div>
                    <div className="mt-4">
                        <label>Order Feedback</label>
                        <textarea className="border w-full p-2 text-black  rounded-md" rows={4} value={feedback.orderIssues} onChange={(e) => setFeedback({ ...feedback, orderIssues: e.target.value })} />
                    </div>
                    <div className="mt-4 text-center">
                        <CldUploadWidget signatureEndpoint="/api/cloudinary" onSuccess={handleSuccess}>
                            {({ open }) => {
                                return (
                                <button className="cursor-pointer bg-primary-hover font-semibold px-3 py-2 rounded-xl" onClick={(e) => {e.preventDefault(); open()}}>
                                    Upload an Image
                                </button>
                                );
                            }}
                        </CldUploadWidget>
                    </div>
                    {feedback.image && 
                    <div className="mt-4">
                        <Image className="w-full h-60 mx-auto object-cover" src={feedback.image} width={500} height={400}></Image>
                    </div>}
                    {error != "" &&
                    <div className="mt-4 text-red">
                        {error}
                    </div>}
                    <div className="mt-7">
                        <button className="text-white w-full border-white border-2 bg-primary-hover uppercase font-semibold py-2" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        )
    )
}
export default ContactPage;