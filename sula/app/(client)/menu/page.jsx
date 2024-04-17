"use client"
import ShowListProduct from "@/components/client/ShowListProduct";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
const MenuPage = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/restaurant/all')
        if (res.ok) {
            const data = await res.json()
            const id = data[0].id
            const resMenu = await fetch(`/api/menu/${id}`)
            if (resMenu.ok) {
                const dataMenu = await resMenu.json()
                setData(dataMenu)
            }
        }
    }
    fetchData()
  }, [])
  return (
    data != null && <div>
        <div className="relative">
            <Image className="max-h-100 object-cover" src={"/images/bg/bg_menu.webp"} width={1920} height={1280}></Image>
            <span className="absolute text-4xl text-center font-gambarino bg-dark-custom lg:px-20 py-2 px-5 font-bold text-white top-1/2 sm:left-1/2 sm:-translate-x-1/2">
              MENU'S MASALA OF INDIA
            </span>
        </div>
        <div className="pt-10 bg-image4"> 
          <div className="lg:w-3/5 m-auto w-full px-10 flex flex-wrap justify-between">
            <div className="flex relative w-fit px-3 py-2 m-auto">
              <Link href={"/order-online"} className="w-1/2 border cursor-pointer text-primary-color font-semibold border-primary-color px-10 py-2 hover:text-white button-slide-ltr ">Order Online</Link>
              <div className="rounded-full p-2 bg-primary-color absolute left-1/2 -translate-x-1/2">
                <Image className="" src={"/images/icon/choice.svg"} width={25} height={25}></Image>
              </div>
              <Link href={"/reservation"} className="w-1/2 border cursor-pointer font-semibold text-primary-color border-primary-color px-10 py-2 button-slide-rtl hover:text-white">Reservations</Link>
            </div>
            <div className="flex relative w-fit px-3 py-2 m-auto">
              <Link href={"https://www.toasttab.com/masala-of-india-northgate/giftcards"} target="_blank" className="w-1/2 border cursor-pointer text-primary-color font-semibold border-primary-color px-10 py-2 hover:text-white button-slide-ltr ">E-Gift</Link>
              <div className="rounded-full p-2 bg-primary-color absolute left-1/2 -translate-x-1/2">
                <Image className="" src={"/images/icon/choice.svg"} width={25} height={25}></Image>
              </div>
              <Link href={"/catering"} className="w-1/2 border cursor-pointer font-semibold text-primary-color border-primary-color px-10 py-2 button-slide-rtl hover:text-white">Catering</Link>
            </div>
          </div>
          <div>
            {data.types.map((type, index) => (
              <div key={index} className="lg:w-4/5 m-auto w-full px-10 py-10">
                <h1 className="text-5xl text-center font-gambarino font-bold text-primary-color uppercase">{type.name}</h1>
                <div className="">
                  {type.subTypes.map((subType, index) => (
                    <div  key={index} className="mt-10">
                      <ShowListProduct category={subType.name} subTypeProducts={subType.subTypeProducts}></ShowListProduct>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
       
    </div>
  );
};

export default MenuPage;