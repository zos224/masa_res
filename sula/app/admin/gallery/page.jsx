"use client"
import {useEffect, useState } from "react"
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";

const Gallery = () => {
    const [images, setImages] = useState(null)
    const [currentPublicId, setCurrentPublicId] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(false)
    useEffect(() => {
        const fetchImages = async () => {
            const res = await fetch('/api/cloudinary/gallery')
            if (res.ok) {
                const data = await res.json()
                setImages(data)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }
        fetchImages()
    }, [])

    const handleSuccess = async (results) => {
        const newImage = results.info
        setImages([...images, newImage])
    };

    const deleteHandle = async () => {
        const formData = new FormData();
        formData.append('publicId', currentPublicId)
        const response = await fetch('/api/cloudinary/delete', {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            const newImages = images.filter((image) => image.public_id != currentPublicId)
            setImages(newImages)
            setCurrentPublicId("")
            setConfirmDelete(false)
        }
    }

    useEffect(() => {
        if (currentPublicId != "") {
            setConfirmDelete(true)
        }
        else {
            setConfirmDelete(false)
        }
    }, [currentPublicId])

    return (
        images != null && <section class="py-1">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-2">
                <div className="text-black dark:text-white flex justify-between items-center">
                    <div className="text-2xl">
                        Gallery 
                    </div>
                    <CldUploadWidget signatureEndpoint="/api/cloudinary" onSuccess={handleSuccess} uploadPreset="gallery">
                        {({ open }) => {
                            return (
                            <button className="cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" onClick={(e) => {e.preventDefault(); open()}}>
                                Upload an Image
                            </button>
                            );
                        }}
                    </CldUploadWidget>
                </div>
                {images.length > 0 ? (
                    <div className="mt-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                            {images.map((image, index) => (
                                <div key={index} class="relative group">
                                    <Image src={image.secure_url} width={500} height={300} class="rounded-md max-h-50 object-cover" />
                                    <div class="absolute inset-0 bg-black bg-opacity-50 hidden group-hover:flex justify-center items-center">
                                        <button onClick={() => {setCurrentPublicId(image.public_id)}} class="text-white bg-primary-600 px-3 py-1 rounded-md">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {confirmDelete && (
                        <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative m-auto mt-20 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow-md dark:bg-bodydark">
                                    <button onClick={() => {setCurrentPublicId("")}} type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">
                                        <h3 className="mb-5 text-lg font-normal text-black">Confirm?</h3>
                                        <div className="flex justify-around">
                                            <button onClick={deleteHandle} type="button" className="text-white bg-red hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                Delete
                                            </button>
                                            <button onClick={() => {setCurrentPublicId("")}} type="button" className=" dark:bg-bodydark1 text-black focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 ">No</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                ) : (
                    <h1 class="text-2xl mt-6 font-semibold text-center">No images in gallery</h1>
                )}
            </div>
        </section>
    )
}

export default Gallery