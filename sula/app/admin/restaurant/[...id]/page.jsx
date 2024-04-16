"use client"
import { useParams, useRouter } from "next/navigation"
import {useEffect, useState } from "react"
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image"
const CreateUpdateRestaurant = () => {
    const [restaurant, setRestaurant] = useState({
        id: 0,
        name: '',
        phone: '',
        address: '',
        operationTimeIndoor: '',
        operationTimeTakeAway: '',
        status: '',
        diningArea: 0,
        capacity: '',
        image: ''
    })
    const route = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    useEffect( () => {
        const getRestaurant = async () => {
            setLoading(true)
            const response = await fetch('/api/restaurant/' + params.id[1])
            if (response.ok) {
                const existRes = await response.json();
                setRestaurant({
                    id: existRes.id,
                    name: existRes.name,
                    phone: existRes.phoneNumber,
                    address: existRes.address,
                    operationTimeIndoor: existRes.operationTimeIndoor,
                    operationTimeTakeAway: existRes.operationTimeTakeAway,
                    status: existRes.status,
                    diningArea: existRes.diningArea,
                    capacity: existRes.capacity,
                    seatingOption: existRes.seatingOption,
                    image: existRes.image
                })
                setLoading(false)
            }
            else {
                route.push('/admin/restaurant/create')
            }
        }

        if (params.id[1]) {
            getRestaurant()
        }
    }, [params.id[1]])
    const [oldImageUrl, setOldImageUrl] = useState('')
    const [errorAlert, setErrorAlert] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        const formData = new FormData();
        formData.append("id", restaurant.id)
        formData.append("name", restaurant.name)
        formData.append("phoneNumber", restaurant.phone)
        formData.append("address", restaurant.address)
        formData.append("operationTimeIndoor", restaurant.operationTimeIndoor)
        formData.append("operationTimeTakeAway", restaurant.operationTimeTakeAway)
        formData.append("status", restaurant.status)
        formData.append("diningArea", restaurant.diningArea)
        formData.append("capacity", restaurant.capacity)
        formData.append("image", restaurant.image)
        const response = await fetch('/api/restaurant/createOrUpdate', {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            setErrorAlert(null)
            route.push("/admin/restaurant")
        }
        else {
            response.text().then(text => {
                setErrorAlert(text)
            })
        }
        setSubmitting(false)
        
    }

    const handleSuccess = async (results) => {
        const newImage = results.info.secure_url
        setRestaurant(prevRestaurant => ({...prevRestaurant, image: newImage}))
    };

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
                setOldImageUrl(restaurant.image)
                }
        }
        if (oldImageUrl) {
            updateImage()
        }
        else {
            setOldImageUrl(restaurant.image)
        }
    }, [restaurant.image])

    return (
        <section class="py-1">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                    <div class="rounded-t dark:bg-bodydark bg-white dark:text-black mb-0 px-6 py-3">
                        <div class="text-center flex justify-between">
                            <h6 class="text-xl font-bold">
                            {params.id[0] == 'create' ? 'Add' : 'Update'} Restaurant
                            </h6>
                        </div>
                    </div>
                    {!loading ? (
                        <div class="px-4 lg:px-10 py-10 w-full ">
                        <form onSubmit={handleSubmit}>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Name of Restaurant
                                </label>
                                <input value={restaurant.name} type="text" placeholder="Input name of restaurant" onChange={(e) => setRestaurant({...restaurant, name: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Phone Number
                                </label>
                                <input value={restaurant.phone} type="text" placeholder="Input phone number of restaurant" onChange={(e) => setRestaurant({...restaurant, phone: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Address
                                </label>
                                <input value={restaurant.address} type="text" placeholder="Input address of restaurant" onChange={(e) => setRestaurant({...restaurant, address: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Operation Time Indoor
                                </label>
                                <textarea rows={3} value={restaurant.operationTimeIndoor} type="text" placeholder="Input operation time indoor (Ex: 10:00 AM - 10:00 PM From Monday To Sunday)" onChange={(e) => setRestaurant({ ...restaurant, operationTimeIndoor: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2" >
                                    Operation Time Take Away
                                </label>
                                <textarea rows={3} value={restaurant.operationTimeTakeAway} placeholder="Input operation time takeaway (Ex: 10:00 AM - 10:00 PM From Monday To Sunday)" type="text" onChange={(e) => setRestaurant({ ...restaurant, operationTimeTakeAway: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Dining Area (in SQFT)
                                </label>
                                <input value={restaurant.diningArea} type="number" placeholder="Input dining area (in SQFT)" onChange={(e) => setRestaurant({...restaurant, diningArea: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Capacity (X Seated Y Standing)
                                </label>
                                <input value={restaurant.capacity} type="text" placeholder="Input capaticy (Ex: 20 Seated 40 Standing)" onChange={(e) => setRestaurant({...restaurant, capacity: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div className="text-center">
                                <CldUploadWidget signatureEndpoint="/api/cloudinary" onSuccess={handleSuccess}>
                                    {({ open }) => {
                                        return (
                                        <button className="cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" onClick={(e) => {e.preventDefault(); open()}}>
                                            Upload an Image
                                        </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>
                            <div>
                                {restaurant.image ? (
                                    <div className="w-6/12 mx-auto mt-3">
                                        <Image src={restaurant.image} className="w-32 h-32 mx-auto" width={100} height={100} alt="restaurant image"/>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Status
                                    </label>
                                    <select required onChange={(e) => setRestaurant({...restaurant, status: e.target.value})} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                        <option className="dark:text-black" selected={restaurant.status == 1} value={1}>Show</option>
                                        <option className="dark:text-black" selected={restaurant.status == 0} value={0}>Hide</option>
                                    </select>
                                </div>
                            </div>
                            {!submitting ? (
                                <div className="text-center">
                                    <input type="submit" role="button" className="mt-10 cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" value={params.id[0] == 'create' ? 'Add' : 'Update'}/>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <button className="mt-10 cursor-pointer bg-black text-white px-7 py-2 rounded-xl">
                                        <div role="status">
                                            <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                            
                        </form>
                        {errorAlert ? (
                            <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                                {errorAlert}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    ) : (
                        <div className="flex-center mt-2 mx-auto" role="status">
                            <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CreateUpdateRestaurant