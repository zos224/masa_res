"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
const OrderPage = () => {
    const [images, setImages] = useState(null)
    useEffect(() => {
        const fetchGallery = async () => {
            const res = await fetch('/api/cloudinary/gallery')
            if (res.ok) {
                const data = await res.json()
                setImages(data)
            }
        }
        fetchGallery()
        AOS.init({
            duration: 1100,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            delay: 100,
            offset: 200
          });
    }, [])
    return (
        <div className="min-h-screen pt-10 bg-image">
            <div className="text-center md:text-10xl text-7xl text-white font-mrdehaviland tracking-widest">
                Photo Gallery
            </div>
            <div className="grid lg:grid-cols-3 xsm:grid-cols-2 grid-cols-1 gap-5 mx-10 py-10 min-h-screen">
                {images && images.map((image, index) => (
                    <div data-aos="zoom-in" key={index} className="overflow-hidden">
                        <Image className="h-132.5 object-cover hover:scale-125 duration-300" src={image.secure_url} width={1000} height={500}></Image>
                    </div>))
                }
            </div>
        </div>
    );
};

export default OrderPage;