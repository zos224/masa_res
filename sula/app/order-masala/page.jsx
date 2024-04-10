"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import ProductOrder from "@/components/client/ProductOrder";
const OrderMaSalaPage = () => {
    const [pickup, setPickup] = useState(true)
    const [delivery, setDelivery] = useState(false)
    const [listRestaurant, setListRestaurant] = useState([]);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedDate, setSelectedDate] = useState(0);
    const [orderDisplay, setOrderDisplay] = useState(true);
    const [menu, setMenu] = useState();
    const [selectedCategory, setSelectedCategory] = useState(0);
    const menuRef = useRef(null);
    useEffect(() => {
        const getRestaurant = async () => {
          let response = await fetch('/api/restaurant/all'); 
          if (response.ok) {
            let data = await response.json();
            setListRestaurant(data);
          }
          else {
            throw new Error("Error fetching data");
          }
        }
        getRestaurant();
      }, []);

    useEffect(() => {
        const getMenu = async () => {
            let response = await fetch('/api/menu/' + listRestaurant[0].id );
            if (response.ok) {
                let data = await response.json();
                const listSubType = []
                data.types.map((type) => {
                    type.subTypes.map((subType) => {
                        if (subType.subTypeProducts.length > 0) {
                            listSubType.push({
                                name: subType.name,
                                items: subType.subTypeProducts
                            })
                        }
                    });
                });
                setMenu(listSubType);
            }
            else {  
                throw new Error("Error fetching data");
            }
        }
        if (listRestaurant.length > 0) {
            getMenu();
        }
    }, [listRestaurant]);

    const phoneNumber = (number) => {
        var areaCode = number.substring(0, 3);
        var middle = number.substring(3, 6);
        var last = number.substring(6, 10);

        return areaCode + '-' + middle + '-' + last;
    }

    function getDayName(dateIndex) {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dayNames[dateIndex];
    }

    const datesAndDays = []
    const date = new Date();
    for (let i = 0; i < 7; i++) {
        const dateInTimeZone = date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles'});
        const dateObject = new Date(dateInTimeZone);
        date.setDate(dateObject.getDate());
        if (i ==  0) {
            datesAndDays.push({
                date: dateObject.getDate(),
                day: "Today"
            })
        }
        else {
            datesAndDays.push({
                date: dateObject.getDate(),
                day: getDayName(date.getDay())
            })
        }
        date.setDate(date.getDate() + 1);
    }

    const [selectedTime, setSelectedTime] = useState(0);
    function createTimeSlots(startHour, startMinute, endHour, endMinute, interval) {
        let slots = [];
        let date = new Date(); 
        date.setHours(startHour, startMinute, 0, 0);
    
        let endDate = new Date();
        endDate.setHours(endHour, endMinute, 0, 0);
    
        while (date <= endDate) {
            let time = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            slots.push(time);

            date.setMinutes(date.getMinutes() + interval);
        }
    
        return slots;
    }

    let times = createTimeSlots(10, 30, 21, 30, 15);
    const [isScrolledToStart, setIsScrolledToStart] = useState(true);
    const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
    const checkScrollPosition = () => {
        if (menuRef.current) {
          const isAtStart = menuRef.current.scrollLeft === 0;
          const isAtEnd = menuRef.current.scrollWidth === menuRef.current.scrollLeft + menuRef.current.offsetWidth;
          setIsScrolledToStart(isAtStart);
          setIsScrolledToEnd(isAtEnd);
        }
      };
    
      useEffect(() => {
        const menuElement = menuRef.current;
        menuElement.addEventListener('scroll', checkScrollPosition, { passive: true });
        return () => {
          menuElement.removeEventListener('scroll', checkScrollPosition);
        };
      }, []);

    const scrollLeft = () => {
        if (menuRef.current) {
          menuRef.current.scrollBy({ left: -100, behavior: 'smooth' }); 
        }
      };
      
      const scrollRight = () => {
        if (menuRef.current) {
          menuRef.current.scrollBy({ left: 100, behavior: 'smooth' }); 
        }
      };
    return (
        !orderDisplay ? (
            <div className="relative">
            <div className="bg-white absolute z-10 xsm:max-w-125 w-full px-5 h-screen">
                <div className="flex mt-30 text-center">
                    <span onClick={() => {setPickup(true); setDelivery(false)}} className={`rounded-full py-2 w-1/2 cursor-pointer text-black font-bold ${pickup ? "bg-primary-color text-white" : ""}`}>Pickup</span>
                    <span onClick={() => {setDelivery(true); setPickup(false)}} className={`rounded-full py-2 cursor-pointer w-1/2 text-black font-bold ${delivery ? "bg-primary-color text-white" : ""}`}>Delivery</span>
                </div>
                <hr className="mt-5"></hr>
                {delivery && (
                    <div className="mt-10">
                        <p className="text-black text-lg font-semibold">Where are we delivaring to?</p>
                        <input type="text" className="mt-2 w-full border-b-2 rounded-none focus:border-primary-color outline-none p-1" placeholder="Enter location"></input>
                        <button className="bg-primary-color rounded-full text-sm px-6 py-2 text-white font-semibold mt-4">Save</button>
                    </div>
                )}
                {listRestaurant.map((restaurant, index) => (
                    <div key={index} className={`mt-10 p-5 rounded-lg bg-slate-100 hover:shadow-lg ${showOrderDetails ? "border-4 border-primary-color" : ""}`}>
                        <h2 className="text-black text-lg font-semibold">{restaurant.name}</h2>
                        <p className="text-black text-sm">{restaurant.address}</p>
                        {!showOrderDetails ? (
                            <div>
                                <Image className="mt-5 w-full aspect-4/3 object-cover" alt={restaurant.name} src={restaurant.image} width={400} height={300}></Image>
                                <p className="mt-3">
                                    <span className="text-black font-semibold">Opening Time: </span>
                                    <span className="text-black">{restaurant.operationTimeIndoor}</span>
                                </p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-black text-lg">{phoneNumber(restaurant.phoneNumber)}</p>
                                    <button onClick={() => {setShowOrderDetails(true)}} className="bg-primary-color rounded-full px-6 py-2 text-white font-semibold">Order</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <button onClick={() => {setShowOrderDetails(false)}} className='flex gap-2 items-center font-bold text-black mt-5'>
                                    <Image src={"/images/icon/back.svg"} width={25} height={30}></Image>
                                    Back
                                </button>
                                <p className="text-sm mt-5 text-black">Please select a day + time for {pickup ? "Pickup" : "Delivery"}</p>
                                <div className="grid grid-cols-7 gap-1 mt-5 bg-zinc-300 rounded-md text-base mb-3">
                                    {datesAndDays.map((date, index) => (
                                        <div onClick={() => {setSelectedDate(index)}} key={index} className={`cursor-pointer rounded-md p-2 text-center ${selectedDate == index ? "bg-primary-color text-white" : "text-black"}`}>
                                            <p className="font-semibold">{date.day}</p>
                                            <p className="text-center">{date.date}</p>
                                        </div>
                                    ))}
                                </div>
                                <i className="text-sm text-black">All dates and times displayed in America/Los_Angeles</i>
                                <div className="max-h-70 overflow-auto">
                                    {times.map((time, index) => (
                                        <div>
                                            <div onClick={() => {setSelectedTime(index)}} key={index} className={`cursor-pointer mt-4 rounded-full p-2 text-center ${selectedTime == index ? "bg-primary-color text-white" : "text-black border"}`}>
                                                <p className="font-semibold">{time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-end">
                                    <button className="bg-primary-color rounded-full px-6 py-2 text-white font-semibold mt-5">Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
                }
            </div>
            <div className="w-full overflow-auto h-full">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2684.7848425171815!2d-122.32543182315692!3d47.70801458096831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490115703299c53%3A0x140fbebc49128727!2sNorthgate%20Fifth%20Ave%20-%20Super%20Sport%2C%20507%20NE%20Northgate%20Way%2C%20Seattle%2C%20WA%2098125%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1712507635538!5m2!1svi!2s" className="border-none w-full h-screen"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        ) : (
            <div>
                <div className="mt-30 w-fit m-auto text-xl font-bold text-black border-2 border-primary-color px-10 py-2">
                    <div>
                        {pickup ? ( "Pickup" ) : ( "Delivery" )} | {datesAndDays[selectedDate].day} {datesAndDays[selectedDate].date} - {times[selectedTime]} 
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex items-center">
                        <div onClick={scrollLeft} className={`h-full cursor-pointer mx-5 w-20 text-black text-2xl ${!isScrolledToStart ? 'visible' : 'invisible'}`}>&lt;</div>
                        <div onScroll={checkScrollPosition} ref={menuRef} className="overflow-hidden">
                            <div className="flex flex-shrink-0 gap-10">
                                {menu && menu.map((subType, index) => (
                                <div key={index} >
                                    <div className="text-black text-lg font-semibold mt-5">
                                        <div>
                                        {subType.items.length > 0 && (
                                                <div onClick={() => {setSelectedCategory(index)}} className={`cursor-pointer ${selectedCategory == index ? "border-b-2 border-primary-color " : ""}`}>
                                                    <div className={`mx-auto rounded-full w-30 h-30 relative ${selectedCategory == index ? "border-4 border-primary-color " : "border-4 border-slate-400"}`}>
                                                        <Image className="aspect-square absolute object-cover rounded-full p-1" src={subType.items[0].product.image} layout="fill"></Image>
                                                    </div>
                                                    <div className="my-3 text-center">
                                                        {subType.name}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div onClick={scrollRight} className={`h-full cursor-pointer mx-5 w-20 text-black text-2xl ${!isScrolledToEnd ? 'visible' : 'invisible'}`}>&gt;</div>
                    </div>
                    <hr className="mt-10"></hr>
                    <div className="p-10 grid gap-10 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 bg-bodydark1">
                        {menu && menu[selectedCategory].items.map((item, index) => (
                            <ProductOrder key={index} product={item.product}></ProductOrder>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
};

export default OrderMaSalaPage;