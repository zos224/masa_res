"use client"
import Image from 'next/image';
import { useRef, useState, useEffect, useContext } from 'react';
import {signIn, signOut, useSession} from 'next-auth/react'
import { CardContext } from './CardProvider';
import ModalOrder from './ModalOrder';
import Link from 'next/link';
import LoginForm from './LoginForm';
import SignUpForm from './SingupForm';
import { OrderContext } from './OrderProvider';
import OrderDetails from './OrderDetails';

const NavOrder = () => {
    const [openModalLogin, setOpenModalLogin] = useState(false)
    const [openModalCard, setOpenModalCard] = useState(false)
    const [loginForm, setLoginForm] = useState(false)
    const [signUpForm, setSignUpForm] = useState(false)
    const {data: session} = useSession();
    const modalLoginRef = useRef(null);
    const modalCardRef = useRef(null);
    const [showModalOrder, setShowModalOrder] = useState(false)
    const closeModal = () => {
        if (modalLoginRef.current) {
            modalLoginRef.current.classList.remove("animate-right-to-left");
            modalLoginRef.current.classList.add("animate-left-to-right");
        }
        if (modalCardRef.current) {
            modalCardRef.current.classList.remove("animate-right-to-left");
            modalCardRef.current.classList.add("animate-left-to-right");
        }
        
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalLoginRef.current && !modalLoginRef.current.contains(event.target)) {
                closeModal();
            }
            if (modalCardRef.current && !modalCardRef.current.contains(event.target)) {
                if (!showModalOrder) {
                    closeModal();
                }
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showModalOrder, closeModal, modalLoginRef, modalCardRef]);

    const handleAnimationEnd = () => {
        // Kiểm tra xem hiệu ứng "biến mất" đã hoàn tất hay chưa
        if (modalLoginRef.current != null && modalLoginRef.current.classList.contains("animate-left-to-right")) {
            setOpenModalLogin(false); // Nếu có, thì ẩn modal
            modalLoginRef.current.classList.remove("animate-left-to-right");
            modalLoginRef.current.classList.add("animate-right-to-left");
        }
        if (modalCardRef.current != null && modalCardRef.current.classList.contains("animate-left-to-right")) {
            setOpenModalCard(false); // Nếu có, thì ẩn modal
            modalCardRef.current.classList.remove("animate-left-to-right");
            modalCardRef.current.classList.add("animate-right-to-left");
        }
    };

    const {card, updateCard} = useContext(CardContext)
    const [showDetails, setShowDetails] = useState(false)
    const [idProduct, setIdProduct] = useState(0)

    useEffect(() => {
        if (idProduct != 0) {
            setShowModalOrder(true)
        }
    }, [idProduct])

    const deleteProduct = (idProduct) => {
        const newCard = card.filter(product => product.idProduct != idProduct)
        updateCard(newCard)
    }

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

    const {orderDetails, updateOrderDetails} = useContext(OrderContext)
    const [openOrderDetails, setOpenOrderDetails] = useState(false)
    const [showAcc, setShowAcc] = useState(false)
    return (
        <div className='bg-primary-color md:px-15 px-2 py-3 fixed top-0 left-0 w-full flex justify-between z-99'>
            <div className='flex md:gap-10 gap-3 items-center'>
                <Link href='/order-masala'><Image src={"/images/logo/logo.png"} width={50} height={50} alt='logo'></Image></Link>
                {orderDetails.type != "" && orderDetails.date != "" && orderDetails.time != "" && (
                    <div className='flex gap-4 cursor-pointer px-4 py-2 hover:bg-primary-hover rounded-full' onClick={() => setOpenOrderDetails(true)}>
                        <div className='text-white text-sm md:text-lg font-medium'>{orderDetails.type}</div>
                        <div  className='text-white text-sm md:text-lg font-medium'>{orderDetails.date} - {orderDetails.time}</div>
                    </div>
                )}
                <OrderDetails open={openOrderDetails} onClose={() => setOpenOrderDetails(false)}></OrderDetails>
            </div>
            <div className='flex md:gap-5 gap-2'>
                {session?.user ? (
                    <div className='relative flex items-center'>
                        <p onClick={() => setShowAcc(prev => !prev)} className='text-white cursor-pointer md:text-lg text-sm my-auto font-medium'>Welcome, {session.user.firstName}</p>
                        {showAcc && (
                             <div className='absolute top-12 right-0 bg-primary-color'>
                             <button onClick={() => signOut()} className='mt-1 px-3 text-white py-2 rounded-full'>Sign Out</button>
                         </div>
                        )}
                    </div>
                ) : (
                    <div onClick={() => {setOpenModalLogin(true); setOpenModalCard(false)}} className='flex items-center gap-2 py-1 px-3 hover:bg-primary-hover rounded-full cursor-pointer'>
                        <Image src={"/images/icon/user.svg"} width={35} height={35} alt='user'></Image>
                        <span className='font-bold md:block hidden text-lg text-white'>Login</span>
                    </div> 
                )}
                <div onClick={() => {setOpenModalCard(true); setOpenModalLogin(false)}} className='flex items-center gap-2 py-1 px-3 hover:bg-primary-hover rounded-full cursor-pointer relative'>
                    <Image src={"/images/icon/cart.svg"} width={35} height={35} alt='cart'></Image>
                    <span className='font-bold md:block hidden text-lg text-white'>Cart</span>
                    {card.length > 0 && (
                        <div className='bg-white text-black rounded-full text-center top-0 w-6 h-6 absolute left-8'>{card.length}</div>
                    )}
                </div>

                {openModalLogin && (
                        <div className="fixed bg-dark-custom top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto inset-0 min-h-full">
                            <div ref={modalLoginRef} onAnimationEnd={handleAnimationEnd} className={`absolute right-0 w-full sm:max-w-md min-h-full animate-right-to-left ${loginForm || signUpForm ? "bg-white" : "bg-primary-color"}`}>
                                <div className="relative pt-10 h-full">
                                    <div className='flex items-center justify-between px-10'>
                                        <Image className="" src={"/images/logo/logo.png"} width={50} height={50}></Image>
                                        <button onClick={closeModal} type="button" className={`${loginForm || signUpForm ? "text-black" : "text-white"} bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600`}>
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="px-6 mt-6">
                                            {loginForm ? (
                                                <LoginForm back={() => {setLoginForm(false)}} changeToSignup={() => {setLoginForm(false); setSignUpForm(true)}} closeModal={() => setOpenModalLogin(false)}></LoginForm>
                                            ) : (
                                                signUpForm ? (
                                                    <SignUpForm back={() => {setSignUpForm(false)}} changeToLogin={() => {setLoginForm(true); setSignUpForm(false)}}></SignUpForm>
                                                ) : (
                                                    <div>
                                                        <p className='text-white text-lg font-medium'>Sign up or Log in</p>
                                                        <button onClick={() => setSignUpForm(true)} className='mt-6 w-full border font-bold text-md border-white text-white py-2 rounded-full'>Sign Up</button>
                                                        <button onClick={() => {setLoginForm(true)}} className='mt-5 w-full font-bold text-md bg-white text-black py-2 rounded-full'>Log In</button>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                {openModalCard && (
                    <div className="fixed bg-dark-custom top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto inset-0 min-h-full">
                        <div ref={modalCardRef} onAnimationEnd={handleAnimationEnd} className={`absolute right-0 w-full sm:max-w-md min-h-full animate-right-to-left bg-white`}>
                            <div className="relative pt-10">
                                <div className='flex items-center justify-between px-10'>
                                    <Image className="" src={"/images/logo/logo.png"} width={50} height={50}></Image>
                                    <button onClick={closeModal} type="button" className={`text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600`}>
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="px-6 mt-6 ">
                                    <p className='my-7 font-medium text-xl text-black'>My Card</p>
                                    <div>
                                        {card.length > 0 ? (
                                            <div className='flex flex-col justify-between h-full'>
                                                <div className='flex-grow'>
                                                    {card.map((product, index) => (
                                                        <div key={index} className={`my-3 ${index != card.length - 1 ? "border-b border-bodydark pb-3" : ""}`}>
                                                            <div className='flex gap-4'>
                                                                <div className='w-1/5 max-h-20 relative'>
                                                                    <Image className='object-cover absolute' src={product.image} layout='fill'></Image>
                                                                </div>
                                                                <div className='font-bold w-3/5'>
                                                                    <p className='text-black ' style={{ minHeight: "2em", maxHeight: "3em", fontSize: "14px"}}>
                                                                        <p className='max-two-lines'>{product.name}</p>
                                                                    </p>
                                                                    <p className=' text-lg text-primary-color'>${product.total}</p>
                                                                    {product.options.length > 0 || product.customizations.length > 0 ? (
                                                                        <div className='text-xs mt-1'>
                                                                            <button onClick={() => setShowDetails((prev) => !prev)} className='text-black underline'>{showDetails ? "- Hide Details" : "+ Show Details"}</button>
                                                                            {showDetails && (
                                                                                <div>
                                                                                    <div>
                                                                                        <p className='font-bold'>Options</p>
                                                                                        {product.options.map((option, index) => (
                                                                                            <div className='mx-3' key={index}>
                                                                                                <span>{option.name}: 
                                                                                                {option.optionSelected.map((value, index) => (
                                                                                                    <span key={index}> {(index != 0 || index != (option.optionSelected.length - 1)) ? " | " : ""} {value.name}</span>
                                                                                                ))}
                                                                                                </span>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className='font-bold'>Customizations</p>
                                                                                        {product.customizations.map((customization, index) => (
                                                                                            <div className='mx-3' key={index}>
                                                                                                <span>{customization.name}: 
                                                                                                {customization.customizationSelected.map((value, index) => (
                                                                                                    <span key={index}> {(index != 0 || index != (customization.customizationSelected.length - 1)) ? " | " : ""} {value.name}</span>
                                                                                                ))}
                                                                                                </span>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>    
                                                                    ) : (<div></div>)}
                                                                </div>
                                                                <div className='w-1/5 flex justify-between'>
                                                                    <div className='text-center'>
                                                                        <Image onClick={() => {setIdProduct(product.idProduct)}} className='cursor-pointer' src={"/images/icon/edit.svg"} width={30} height={30}></Image>
                                                                        <Image onClick={() => deleteProduct(product.idProduct)} className='cursor-pointer mt-3' src={"/images/icon/remove_item.svg"} width={30} height={30}></Image>
                                                                    </div>
                                                                    <div className='text-center'>
                                                                        <div onClick={() => {product.quantity += 1; updateQuantity(product.idProduct, product.quantity); product.total = product.quantity * product.price}} className='text-3xl h-7 cursor-pointer text-primary-color'>+</div>
                                                                        <div className='text-xl h-5 text-black'>{product.quantity}</div>
                                                                        <div onClick={() => {product.quantity === 1 ? product.quantity = 1 : product.quantity -= 1; updateQuantity(product.idProduct, product.quantity); product.total = product.quantity * product.price}} className='text-3xl h-7 cursor-pointer text-primary-color'>-</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className='my-5 pt-5 border-t border-bodydark text-black text-lg font-semibold '>
                                                    <div className='flex justify-between'>
                                                        <p>Subtotal</p>
                                                        <p>${card.map(item => item.total).reduce((a, c) => parseFloat(a) + parseFloat(c), 0).toFixed(2)}</p>
                                                    </div>
                                                    <div className='flex justify-between mt-1'>
                                                        <p>5% GST </p>
                                                        <p>${(card.map(item => item.total).reduce((a, c) => parseFloat(a) + parseFloat(c), 0) * 0.05).toFixed(2)}</p>
                                                    </div>
                                                    <div className='w-full flex text-center'>
                                                        <Link onClick={closeModal} href={"/order-masala/checkout"} className='w-full mt-4 bg-primary-color text-white py-2 rounded-full'>({card.length}) Check Out - ${(card.map(item => item.total).reduce((a, c) => parseFloat(a) + parseFloat(c), 0) + card.map(item => item.total).reduce((a, c) => parseFloat(a) + parseFloat(c), 0) * 0.05).toFixed(2)}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className='text-center'>Your card is empty</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ModalOrder idProduct={idProduct} openModal={showModalOrder} onClose={() => {setShowModalOrder(false); setIdProduct(0)}}></ModalOrder>
        </div>
    );
    }
export default NavOrder;