"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image"
import NavbarVertical from "./NavVertical";
const NavbarHorizon = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        const fetchEvent = async () => {
            const res = await fetch('/api/event/all')
            if (res.ok) {
                const data = await res.json()
                setEvents(data)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        fetchEvent()
    }, [])
    const [openNav, setOpenNav] = useState(false)
    const [openNavHorizon, setOpenNavHorizon] = useState(true)
    return (
        <nav className="w-full mx-auto bg-dark-custom fixed top-0 left-0 z-50">
            <div className={`w-4/5 py-3 flex gap-24 justify-between mx-auto ${openNavHorizon ? "opacity-110" : "opacity-0"} `}>
                <div className="my-auto w-24">
                    <Image className="w-18 h-18" src="/images/logo/logo.png" alt="logo" width={200} height={100} />
                </div>
                <ul className="hidden lg:flex flex-row flex-wrap justify-end gap-x-8 w-full list-none uppercase font-semibold font-cambria text-lg text-primary-color ">
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/">Location</Link>
                    </li>
                    <li  className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/menu">Menu</Link>
                    </li>
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/reservation">Reservation</Link>
                    </li>
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/takeout-delivery">Takeout & Delivery</Link>
                    </li>
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/order-online">Order Online</Link>
                    </li>
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/catering">Catering</Link>
                    </li>
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/gallary">Gallary</Link>
                    </li>
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/contact">Contact & Hours</Link>
                    </li>
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/gift">Gift Cards & Loyalty</Link>
                    </li>
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/product">Products</Link>
                    </li>
                    <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                        <Link href="/award">Awards & Accolades</Link>
                    </li>
                    {events.map((event) => (
                        <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                            <Link href={`/event/${event.name}`} >{event.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="lg:hidden block my-auto">
                    <Image className="w-12 h-12 cursor-pointer" src="/images/icon/menu_option.svg" alt="menu" onClick={() => {setOpenNavHorizon(false); setOpenNav(true)}} width={200} height={100} />
                </div>
            </div>
            <NavbarVertical openNav={openNav} onClose={() => {setOpenNavHorizon(true); setOpenNav(false)}} />
        </nav>
        
    );
    }

    export default NavbarHorizon;