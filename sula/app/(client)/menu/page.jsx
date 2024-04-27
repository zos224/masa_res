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
            <Image className="object-cover w-full" src={"/images/bg/bg_menu.png"} width={1920} height={1280}></Image>
            <p className="absolute lg:text-8xl md:text-6xl text-4xl text-center font-gambarino font-semibold text-white md:top-1/3 top-1/4 w-full">
              MENU
              <p className="font-mrdehaviland font-normal">
                explore our culinary delights
              </p>
            </p>
        </div>
        <div className="pt-10 bg-image"> 
          <div className="lg:w-3/5 m-auto w-full flex flex-wrap justify-between">
            <div className="flex relative w-fit px-3 py-2 m-auto">
              <Link href={"/order-online"} className="w-1/2 border cursor-pointer text-white font-semibold border-white pe-7 ps-2 py-2 hover:text-black uppercase button-slide-ltr ">Order Online</Link>
              <div className="rounded-full p-2 bg-white absolute left-1/2 -translate-x-1/2">
                <Image className="" src={"/images/icon/choice.svg"} width={25} height={25}></Image>
              </div>
              <Link href={"/reservation"} className="w-1/2 border cursor-pointer font-semibold text-white border-white ps-7 pe-2 py-2 button-slide-rtl hover:text-black uppercase">Reservations</Link>
            </div>
            <div className="flex relative w-fit px-3 items-center py-2 m-auto">
              <Link href={"https://www.toasttab.com/masala-of-india-northgate/giftcards"} target="_blank" className="w-1/2 border cursor-pointer text-white font-semibold border-white px-10 py-2 hover:text-black uppercase button-slide-ltr ">E-Gift</Link>
              <div className="rounded-full  p-2 bg-white absolute left-1/2 -translate-x-1/2">
                <Image className="" src={"/images/icon/choice.svg"} width={25} height={25}></Image>
              </div>
              <Link href={"/catering"} className="w-1/2 border cursor-pointer font-semibold text-white border-white px-10 py-2 button-slide-rtl hover:text-black uppercase">Catering</Link>
            </div>
          </div>
          <div>
            {data.types.map((type, index) => (
              <div key={index} className="lg:w-4/5 m-auto w-full px-10 py-10">
                <h1 className="lg:text-10xl text-6xl text-center font-mrdehaviland text-white">{type.name}</h1>
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