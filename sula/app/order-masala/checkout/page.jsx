"use client"
import { CardContext } from "@/components/client/CardProvider";
import LoginForm from "@/components/client/LoginForm";
import ModalOrder from "@/components/client/ModalOrder";
import { OrderContext } from "@/components/client/OrderProvider";
import SignUpForm from "@/components/client/SingupForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
const CheckOutPage = () => {
    const {card, updateCard} = useContext(CardContext)
    const [order, setOrder] = useState({
        idRestaurant: 0,
        idCustomerAccount: 0,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        type: "",
        dateTime: "",
        paymentMethod: "stripe",
        paymentStatus: false,
        subTotal: 0,
        gst: 0,
        tip: 0,
        discount: 0,
        total: 0,
        status: false
    })
    const [loginForm, setLoginForm] = useState(false)
    const [signUpForm, setSignUpForm] = useState(false)
    const [guest, setGuest] = useState(false)
    const {data: session} = useSession()
    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
        setOrder({...order, idCustomerAccount: session?.user?.id})
    }, [session?.user])

    useEffect(() => {
        fetch("/api/restaurant/all")
        .then(res => res.json())
        .then(data => {
            setRestaurant(data[0])
            setOrder({...order, idRestaurant: data[0].id})
        })
    }, [])

    const checkGuest = () => {
        if (order.firstName == "" || order.lastName == "" || order.email == "" || order.phone == "") {
            return
        }
        setGuest(false)
    }

    const {orderDetails, updateOrderDetails} = useContext(OrderContext)

    const [idProduct, setIdProduct] = useState(0)
    const [openModalOrder, setOpenModalOrder] = useState(false)
    const deleteProduct = (idProduct) => {
        const newCard = card.filter(product => product.idProduct != idProduct)
        updateCard(newCard)
    }
    useEffect(() => {
        if (idProduct != 0) {
            setOpenModalOrder(true)
        }
    }, [idProduct])

    const updateQuantity = (idProduct, quantity) => {
        const newCard = card.map(product => {
            if (product.idProduct == idProduct) {
                const total = product.price * quantity
                return {...product, quantity: quantity, total: total}
            }
            return product
        })
        updateCard(newCard)
    }
     
    const [showInputTip, setShowInputTip] = useState(false)
    const [showInputDiscount, setShowInputDiscount] = useState(false)
    const [errorTime, setErrorTime] = useState(false)
    useEffect(() => {
        const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        if (date.getDate() > parseInt(orderDetails.date.split(" ")[1]) || (date.getDate() == parseInt(orderDetails.date.split(" ")[1]) && date.getHours() > parseInt(orderDetails.time.split(":")[0]))) {
            setErrorTime(true)
        }
        else {
            setErrorTime(false)
        }
    }, [orderDetails])

    const handleOrder = async () => {
        const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
        if ( orderDetails.date == "" || date.getDate() > parseInt(orderDetails.date.split(" ")[1]) || (date.getDate() == parseInt(orderDetails.date.split(" ")[1]) && date.getHours() > parseInt(orderDetails.time.split(":")[0]))) {
            setErrorTime(true)
            return
        }

        if (!session?.user?.id && (order.firstName == "" || order.lastName == "" || order.email == "" || order.phone == "")) {
            return
        }

        if (order.paymentMethod == "stripe") {
            const dataOrder = {
                idRestaurant: order.idRestaurant,
                idCustomerAccount: session?.user?.id ? session.user.id : 0,
                firstName: order.firstName,
                lastName: order.lastName,
                email: order.email,
                phone: order.phone,
                address: orderDetails.type != "Delivery" ? orderDetails.address : restaurant.address,
                type: orderDetails.type,
                dateTime: orderDetails.fullDate + " " + orderDetails.time,
                paymentMethod: order.paymentMethod,
                paymentStatus: order.paymentStatus,
                subTotal: card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0),
                gst: card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 0.101,
                tip: order.tip,
                discount: order.discount,
                total: (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 + parseFloat(order.tip) - order.discount).toFixed(2),
                status: order.status
            }
            sessionStorage.setItem("currentOrder", JSON.stringify(dataOrder))
            const formData = new FormData();
            formData.append("products", JSON.stringify(card));
            const res = await fetch('/api/order/stripe', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                const data = await res.json()
                window.location.href = data.url
            }
        }
        else {
            const formData = new FormData();
            formData.append("idRestaurant", order.idRestaurant);
            formData.append("idCustomerAccount", session?.user?.id ? session.user.id : 0);
            formData.append("firstName", order.firstName);
            formData.append("lastName", order.lastName);
            formData.append("email", order.email);
            formData.append("phone", order.phone);
            formData.append("address", orderDetails.type != "Delivery" ? orderDetails.address : restaurant.address);
            formData.append("type", orderDetails.type);
            formData.append("dateTime", orderDetails.fullDate + " " + orderDetails.time);
            formData.append("paymentMethod", order.paymentMethod);
            formData.append("paymentStatus", order.paymentStatus);
            formData.append("subTotal", card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0));
            formData.append("gst", card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 0.101);
            formData.append("tip", order.tip);
            formData.append("discount", order.discount);
            formData.append("total", (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 + parseFloat(order.tip) - order.discount).toFixed(2));
            formData.append("status", order.status);
            formData.append("products", JSON.stringify(card));
            const res = await fetch('/api/order/create', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                useRouter().push("/order-masala/order-success")
            }
        }
        
    }
    return (
        restaurant && <div className="mt-40">
            <div className="lg:flex justify-evenly gap-10 mb-10">
                <div className="2xl:w-1/3 lg:w-1/2 w-full">
                    <div className="bg-white flex gap-4 rounded-md">
                        <Image className="object-cover rounded-l-md" src={restaurant.image} width={70} height={70}></Image>
                        <div className="text-black my-auto">
                            <h1 className="font-bold text-lg underline">{restaurant.name}</h1>
                            <p>{restaurant.address.split("|").map((a, i) => (
                                <span key={i}>{a}<br></br></span>
                            ))}</p>
                        </div>
                    </div>
                    <div className="bg-white mt-10 rounded-md p-6">
                        <div className="flex justify-between items-center">
                            <div className="uppercase text-xl font-bold text-black">Contact Info</div>
                            {(order.firstName != "" && order.lastName != "" && order.phone != "" && order.email != "" && !guest) ? (
                                <span className="text-primary-color font-bold text-base cursor-pointer" onClick={() => setGuest(true)}>Change</span>
                            ) : (<></>)}
                        </div>
                        {session?.user || (order.firstName != "" && order.lastName != "" && order.phone != "" && order.email != "" && !guest) ? (
                            <div className="text-black mt-5">
                                <div className="font-bold text-lg">{session?.user ? session.user.firstName + " " + session.user.lastName : order.firstName + " " + order.lastName}</div>
                                <div className="flex gap-10 mt-2">
                                    <div className="flex items-center gap-3">
                                        <Image src={"/images/icon/phone.svg"} width={25} height={25}></Image>
                                        <span>{session?.user ? session.user.phone : order.phone}</span>
                                    </div>
                                    <div className="flex gap-3"> 
                                        <Image src={"/images/icon/email.svg"} width={25} height={25}></Image>
                                        <span>{session?.user ? session.user.email : order.email}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {loginForm || signUpForm || guest ? (
                                    <></> ) : (
                                        <div className="flex flex-col gap-5 mt-5">
                                        <button onClick={() => setSignUpForm(true)} className="bg-primary-color rounded-full text-white py-2 font-semibold">Sign Up</button>
                                        <button onClick={() => setLoginForm(true)} className="border border-primary-color text-primary-color py-2 rounded-full font-semibold">Login</button>
                                        <button onClick={() => setGuest(true)} className="border border-black text-black font-semibold py-2 rounded-full">Continue As Guest</button>
                                    </div>
                                    )}
                                {loginForm && (
                                    <LoginForm back={() => setLoginForm(false)} changeToSignup={() => {setLoginForm(false); setSignUpForm(true)}} closeModal={null}></LoginForm>
                                )}
                                {signUpForm && (
                                    <SignUpForm back={() => setSignUpForm(false)} changeToLogin={() => {setLoginForm(true); setSignUpForm(false)}}></SignUpForm>
                                )}
                                {guest && (
                                    <div>
                                        <button onClick={() => {setGuest(false)}} className='flex gap-2 items-center text-black font-bold mt-3'>
                                            <Image src={"/images/icon/back.svg"} width={25} height={30}></Image>
                                            Back
                                        </button>
                                        <div className="mt-5">
                                            <label htmlFor="fname" className='block text-md font-medium'>First Name *</label>
                                            <input value={order.firstName} onChange={(e) => {setOrder({...order, firstName: e.target.value})}} type="text" id="fname" name="email" placeholder='First name' className={`w-full border-b-2 ${order.firstName == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                            {order.firstName == "" && <i className='text-red text-sm '>You must enter your first name</i>}
                                        </div>
                                        <div className='mt-5'>
                                            <label htmlFor="lname" className='block text-md font-medium'>Last Name *</label>
                                            <input value={order.lastName} onChange={(e) => {setOrder({...order, lastName: e.target.value})}} type="text" id="lname" name="email" placeholder='Last name' className={`w-full border-b-2 ${order.lastName == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                            {order.lastName == "" && <i className='text-red text-sm '>You must enter your last name</i>}
                                        </div>
                                        <div className='mt-5'>
                                            <label htmlFor="email" className='block text-md font-medium'>Email *</label>
                                            <input value={order.email} onChange={(e) => {setOrder({...order, email: e.target.value})}} type="email" id="email" name="email" placeholder='your@email.com' className={`w-full border-b-2 ${order.email == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                            {order.email == "" && <i className='text-red text-sm '>You must enter your email</i>}
                                        </div>
                                        <div className='mt-5'>
                                            <label htmlFor="fname" className='block text-md font-medium'>Phone *</label>
                                            <input value={order.phone} onChange={(e) => {setOrder({...order, phone: e.target.value})}} type="text" id="fname" name="email" placeholder='XXX-XXX-XXXX' className={`w-full border-b-2 ${order.phone == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                            {order.phone == "" && <i className='text-red text-sm '>You must enter your phone number</i>}
                                        </div>
                                        <button onClick={checkGuest} className="bg-primary-color w-full mt-5 rounded-full text-white py-2 font-semibold">Continue</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="bg-white mt-10 rounded-md p-6">
                        <div className="flex justify-between items-center">
                            <div className="uppercase text-xl font-bold text-black">ORDER DETAILS</div>
                        </div>
                        <div className="text-black mt-5">
                            <div className="flex gap-6 border-b py-5 border-bodydark2 items-start">
                                <Image src={"/images/icon/handbag.svg"} width={30} height={30}></Image>
                                <span className="font-bold text-lg">{orderDetails.type}</span>
                            </div>
                            <div className="flex gap-6 border-b py-5 border-bodydark2 items-center">
                                <Image src={"/images/icon/location.svg"} width={30} height={30}></Image>
                                <span className="font-bold text-lg">{orderDetails.address}</span>
                            </div>
                            <div className="flex gap-6 py-5 items-center">
                                <Image src={"/images/icon/time.svg"} width={30} height={30}></Image>
                                <span className="font-bold text-lg">{orderDetails.date + " - " + orderDetails.time}</span>
                            </div>
                            {errorTime && <i className='text-red text-sm'>You must choose a time in the future</i>}
                        </div>
                    </div>
                    <div className="bg-white mt-10 rounded-md p-6">
                        <div className="flex justify-between items-center">
                            <div className="uppercase text-xl font-bold text-black">PAYMENT</div>
                        </div>
                        <div className="flex gap-5 mt-5">
                            <div onClick={() => setOrder({...order, paymentMethod: "stripe"})} className={`flex cursor-pointer w-1/2 py-2 gap-6 px-4 ${order.paymentMethod == "stripe" ? "bg-primary-color text-white" : "border border-bodydark2 text-black"} items-center rounded-md`}>
                                {
                                    order.paymentMethod == "stripe" ? (
                                        <Image src={"/images/icon/stripe_white.svg"} width={30} height={30}></Image>
                                    ) : (
                                        <Image src={"/images/icon/stripe_dark.svg"} width={30} height={30}></Image>
                                    )
                                }
                                <span className="font-bold text-lg">Stripe</span>
                            </div>
                            <div onClick={() => setOrder({...order, paymentMethod: "pay-later"})} className={`flex cursor-pointer w-1/2 py-2 gap-6 px-4 ${order.paymentMethod == "pay-later" ? "bg-primary-color text-white" : "border border-bodydark2 text-black"} items-center rounded-md`}>
                                {
                                    order.paymentMethod == "pay-later" ? (
                                        <Image src={"/images/icon/time_white.svg"} width={30} height={30}></Image>
                                    ) : (
                                        <Image src={"/images/icon/time_dark.svg"} width={30} height={30}></Image>
                                    )
                                }
                                <span className="font-bold text-lg">Pay Later</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white mt-10 rounded-md p-6">
                        <div className="flex justify-between items-center">
                            <div className="uppercase text-xl font-bold text-black">ITEMS</div>
                        </div>
                        <div className="text-black mt-5">
                            {card.map((item, index) => (
                                <div key={index} className={`flex gap-5 py-5 ${index != card.length - 1 ? "border-b border-bodydark2" : ""}`}>
                                    <div className="relative w-2/12">
                                        <Image className="object-cover aspect-square absolute" src={item.image} layout="fill"></Image>
                                    </div>
                                    <div className="w-9/12">
                                        <div className="text-lg">
                                            <span className="font-bold">{item.name}</span>
                                            <span className="mx-5 font-medium">${item.total}</span>
                                        </div>
                                        <div className="text-xs">
                                            {item.options.map((option, index) => (
                                                <div className='mx-3' key={index}>
                                                    <span>{option.name}: 
                                                    {option.optionSelected.map((value, index) => (
                                                        <span key={index}> {(index != 0 || index != (option.optionSelected.length - 1)) ? " | " : ""} {value.name}</span>
                                                    ))}
                                                    </span>
                                                </div>
                                            ))}
                                            {item.customizations.map((customization, index) => (
                                                <div className='mx-3' key={index}>
                                                    <span>{customization.name}: 
                                                    {customization.customizationSelected.map((value, index) => (
                                                        <span key={index}> {(index != 0 || index != (customization.customizationSelected.length - 1)) ? " | " : ""} {value.name}</span>
                                                    ))}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-xs font-bold mt-2">
                                            <button onClick={() => setIdProduct(item.idProduct)} className="text-primary-color">Update</button>
                                            <button onClick={() => deleteProduct(item.idProduct)} className="text-primary-color mx-4">Remove</button>
                                        </div>
                                    </div>
                                    <div className="w-1/12 flex m-auto text-center flex-col">
                                        <button onClick={() => {item.quantity += 1; updateQuantity(item.idProduct, item.quantity); item.total = item.quantity * item.price}} className="font-bold text-3xl text-primary-color">+</button>
                                        <span className="font-bold">{item.quantity}</span>
                                        <button onClick={() => {item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1; updateQuantity(item.idProduct, item.quantity); item.total = item.quantity * item.price}} className="font-bold text-3xl text-primary-color">-</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ModalOrder idProduct={idProduct} openModal={openModalOrder} onClose={() => {setOpenModalOrder(false); setIdProduct(0)}}></ModalOrder>
                    </div>
                </div>
                <div className="2xl:w-1/3 xl:w-2/5 lg:w-3/5 w-full rounded-md" >
                    <div className="bg-white p-6">
                        <div className="flex justify-between items-center">
                            <div className="uppercase text-xl font-bold text-black">Order Summary</div>
                        </div>
                        <div className="text-black-2">
                            <div className="flex justify-between mt-5">
                                <span>Subtotal</span>
                                <span className="font-bold">${card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>10,1% GST</span>
                                <span className="font-bold">${(card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 0.101).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-2 border-b  pb-3">
                                <span>Discounts</span>
                                <div className="text-end">
                                    {session?.user ? (
                                        <div>
                                            <span className="font-bold">${order.discount}</span>
                                            <div onClick={() => setShowInputDiscount((prev) => !prev)} className="text-primary-color cursor-pointer">{!showInputDiscount ? "Add" : "Close"} Promo Code</div>
                                            {showInputDiscount && (
                                                <div className="">
                                                    <input type="text" className="border-b outline-none p-2 focus:border-primary-color focus:border-b-2 focus:" />
                                                    <br></br>
                                                    <button className="bg-primary-color px-2 py-1 mt-3 rounded-md text-white font-semibold">Apply</button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <span>Please login to use discounts</span>
                                    )}
                                </div>
                            </div>
                            <div className="mt-2 border-b pb-10">
                                <div className="flex justify-between">
                                    <span>Tip</span>
                                    <span className="font-bold">${order.tip}</span>
                                </div>
                                <div className="flex cursor-pointer rounded-md justify-between mx-5 text-center bg-bodydark1 text-black">
                                    <div onClick={() => {setOrder({...order, tip: 0}); setShowInputTip(false)}} className={`px-3 w-full ${order.tip == 0 && !showInputTip ? "bg-primary-color text-white rounded-l-md" : ""}`}>
                                        <p>0%</p>
                                        <p className="font-semibold">$0</p>
                                    </div>
                                    <div onClick={() => {setOrder({...order, tip: (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.05).toFixed(2)}); setShowInputTip(false)}} className={`w-full px-3 ${order.tip == (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.05).toFixed(2) && !showInputTip ? "bg-primary-color text-white" : ""}`}>
                                        <p>5%</p>
                                        <p className="font-semibold">${(card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.05).toFixed(2)}</p>
                                    </div>
                                    <div onClick={() => {setOrder({...order, tip: (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.1).toFixed(2)}); setShowInputTip(false)}} className={`w-full px-3 ${order.tip == (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.1).toFixed(2) && !showInputTip ? "bg-primary-color text-white" : ""}`}>
                                        <p>10%</p>
                                        <p className="font-semibold">${(card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.1).toFixed(2)}</p>
                                    </div>
                                    <div onClick={() => {setOrder({...order, tip: (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.15).toFixed(2)}); setShowInputTip(false)}} className={`w-full px-3 ${order.tip == (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.15).toFixed(2) && !showInputTip ? "bg-primary-color text-white" : ""}`}>
                                        <p>15%</p>
                                        <p className="font-semibold">${(card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.15).toFixed(2)}</p>
                                    </div>
                                    <div onClick={() => {setOrder({...order, tip: (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.2).toFixed(2)}); setShowInputTip(false)}} className={`w-full px-3 ${order.tip == (card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.2).toFixed(2) && !showInputTip ? "bg-primary-color text-white" : ""}`}>
                                        <p>20%</p>
                                        <p className="font-semibold">${(card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 * 0.2).toFixed(2)}</p>
                                    </div>
                                    <div className={`w-full flex px-3 items-center ${showInputTip ? "bg-primary-color text-white rounded-r-md" : ""}`}>
                                        <p className="" onClick={() => {setShowInputTip(true)}}>Other</p>
                                    </div>
                                </div>
                                {showInputTip && (
                                    <div className="flex justify-end mx-5">
                                        <div className="relative">
                                            <input onChange={(e) => {setOrder({...order, tip: e.target.value})}} type="number" min={0} inputMode="decimal" className="mx-auto border-b outline-none p-2  focus:border-primary-color focus:border-b-2 focus:" />
                                            <span className="absolute right-0 top-3">$</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between mt-5">
                                <span>Total</span>
                                <span>${(card.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0) * 1.101 + parseFloat(order.tip) - order.discount).toFixed(2)}</span>
                            </div>
                            <div className="mt-10">
                                <button onClick={handleOrder} className="bg-primary-color w-full py-2 text-white font-semibold rounded-full">Place Order ({orderDetails.time})</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CheckOutPage;