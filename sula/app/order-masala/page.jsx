"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useContext } from "react";
import ProductOrder from "@/components/client/ProductOrder";
import ModalOrder from "@/components/client/ModalOrder";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { OrderContext } from "@/components/client/OrderProvider";
import SearchLocation from "@/components/client/SearchLocation";
const OrderMaSalaPage = () => {
    const [pickup, setPickup] = useState(true)
    const [delivery, setDelivery] = useState(false)
    const [listRestaurant, setListRestaurant] = useState([]);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedDate, setSelectedDate] = useState(0);
    const [orderDisplay, setOrderDisplay] = useState(false);
    const [menu, setMenu] = useState();
    const [selectedCategory, setSelectedCategory] = useState(0);
    const menuRef = useRef(null);
    const [openModalOrder, setOpenModalOrder] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(0);
    const [error, setError] = useState(false);
    const {orderDetails, updateOrderDetails} = useContext(OrderContext)
    const [addressPickup, setAddressPickup] = useState("");
    useEffect(() => {
        const getRestaurant = async () => {
          let response = await fetch('/api/restaurant/all'); 
          if (response.ok) {
            let data = await response.json();
            setListRestaurant(data);
            setAddressPickup(data[0].address.split("|")[0]);
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

    function getDayName(date) {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dayNames[date.getDay()];
    }
    
    const datesAndDays = [];
    let date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    
    for (let i = 0; i < 7; i++) {
        let newDate = new Date(date);
        newDate.setDate(date.getDate() + i);
    
        if (i === 0) {
            let day = newDate.getDate();
            let month = newDate.getMonth() + 1; 
            let year = newDate.getFullYear();
            let formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;
            datesAndDays.push({
                date: newDate.getDate(),
                day: "Today",
                fullDate: formattedDate
            });
        } else {
            let day = newDate.getDate();
            let month = newDate.getMonth() + 1; 
            let year = newDate.getFullYear();
            let formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;
            datesAndDays.push({
                date: newDate.getDate(),
                day: getDayName(newDate),
                fullDate: formattedDate
            });
        }
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
        if (menuElement) {
            menuElement.addEventListener('scroll', checkScrollPosition, { passive: true });
            return () => {
                menuElement.removeEventListener('scroll', checkScrollPosition);
            };
        }
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

    useEffect(() => {
        if (currentProduct != 0) {
            setOpenModalOrder(true);
        }
    }, [currentProduct])
    // map
    const positionRes = {"lat":47.7084394664091,"lng":-122.3227907590838}
    const positionRes2 = {"lat": 47.6906201, "lng": -122.2909153}
    const midPoint = {"lat": 47.69952978320455, "lng": -122.3068530295419};

    useEffect(() => {
        updateOrderDetails({...orderDetails, type: pickup ? "Pickup" : "Delivery", date: datesAndDays[selectedDate].day + " " + datesAndDays[selectedDate].date, time: times[selectedTime], fullDate: datesAndDays[selectedDate].fullDate, address: addressPickup})
    }, [pickup, selectedDate, selectedTime, addressPickup])

    const checkNext = () => {
        if (pickup) {
            setOrderDisplay(true);
        }
        else {
            if (orderDetails.address == "") {
                setError(true)
                return
            }
            setOrderDisplay(true);
        }
    }
    return (
        !orderDisplay ? (
            <div className="w-full overflow-auto h-screen relative">
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <Map defaultCenter={midPoint} zoom={14} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
                        <AdvancedMarker position={positionRes} >
                            <Pin scale={1.4} background="green" borderColor="green" glyphColor="white"></Pin>
                        </AdvancedMarker>
                        <AdvancedMarker position={positionRes2} >
                            <Pin scale={1.4} background="green" borderColor="green" glyphColor="white"></Pin>
                        </AdvancedMarker>
                    </Map>
                    <div className="bg-white absolute z-10 top-0 left-0 xsm:max-w-125 w-full px-5 min-h-screen">
                        <div className="flex mt-30 text-center">
                            <span onClick={() => {setPickup(true); setDelivery(false)}} className={`rounded-full py-2 w-1/2 cursor-pointer text-black font-bold ${pickup ? "bg-primary-color text-white" : ""}`}>Pickup</span>
                            <span onClick={() => {setDelivery(true); setPickup(false)}} className={`rounded-full py-2 cursor-pointer w-1/2 text-black font-bold ${delivery ? "bg-primary-color text-white" : ""}`}>Delivery</span>
                        </div>
                        <hr className="mt-5"></hr>
                        {delivery && (
                            <div className="mt-10">
                                <p className="text-black text-lg font-semibold">Where are we delivering to?</p>
                                <SearchLocation error={error}></SearchLocation>
                            </div>
                        )}
                        {listRestaurant.map((restaurant, index) => (
                            <div key={index} className={`mt-10 mb-10 p-5 rounded-lg bg-slate-100 hover:shadow-lg ${showOrderDetails ? "border-4 border-primary-color" : ""}`}>
                                <h2 className="text-black text-lg font-semibold">{restaurant.name}</h2>
                                <p className="text-black text-sm">{restaurant.address.split("|").map((a, index) => (
                                    <div key={index}>{a}</div>
                                ))}</p>
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
                                            <Image src={"/images/icon/back_dark.svg"} width={25} height={30}></Image>
                                            Back
                                        </button>
                                        <p className="text-sm mt-5 text-black">{pickup ? "Please select a location + day + time for Pickup" : "Please select a day + time for Delivery"}</p>
                                        {pickup && (
                                            <div className="mt-2">
                                                <label className="text-black">Address</label>
                                                <select onChange={(e) => {setAddressPickup(e.target.value)}} className="w-full border rounded-md p-2 text-black-2">
                                                    {restaurant.address.split("|").map((a, index) => (
                                                        <option value={a} key={index}>{a}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
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
                                            <button onClick={checkNext} className="bg-primary-color rounded-full px-6 py-2 text-white font-semibold mt-5">Next</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                        }
                    </div>
                </APIProvider>
            </div>   
        ) : (
            <div>
                <div className="mt-30">
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
                    <div className="p-10 grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-bodydark1">
                        {menu && menu[selectedCategory].items.map((item, index) => (
                            <div onClick={() => {setCurrentProduct(item.product.id)}}>
                                <ProductOrder key={index} product={item.product}></ProductOrder>
                            </div>
                        ))}
                    </div>
                </div>
                <ModalOrder openModal={openModalOrder} idProduct={currentProduct} onClose={() => {setOpenModalOrder(false); setCurrentProduct(0)}}></ModalOrder>
            </div>
        )
    );
};

export default OrderMaSalaPage;