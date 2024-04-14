"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image"
const NavbarVertical = ({openNav, onClose}) => {
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
    return (
        openNav && (
            <div className="w-full z-9999 absolute top-0 left-0 min-h-screen bg-dark-custom">
                <div className="w-5/6 py-3 flex justify-between mx-auto">
                    <div className="my-auto">
                        <Image className="w-18 h-18" src="/images/logo/logo.png" alt="logo" width={200} height={100} />
                    </div>
                    <div className="lg:hidden block my-auto">
                        {
                            <Image className="w-12 h-12 cursor-pointer my-auto" src="/images/icon/close.svg" alt="close menu" onClick={onClose} width={200} height={100} />
                        }
                    </div>
                </div>
                <div className="pt-10">
                    <ul className="flex flex-col text-center justify-end gap-y-5 w-full list-none uppercase font-semibold font-cambria text-xl text-primary-color ">
                        <li>
                            <Link className="border-b" href="/">Locations</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/menu">Menu</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/reservation">Reservation</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/takeout-delivery">Takeout & Delivery</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/order-online">Order Online</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/catering">Catering</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/gallary">Gallary</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/contact">Contact & Hours</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/gift">Gift Cards & Loyalty</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/product">Products</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/award">Awards & Accolades</Link>
                        </li>
                        {events.map((event) => (
                            <li>
                                <Link className="border-b" href={`/event/${event.name}`} >{event.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    );
}

export default NavbarVertical;