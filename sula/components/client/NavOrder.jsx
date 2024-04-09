"use client"
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import {signIn, signOut, useSession} from 'next-auth/react'

const NavOrder = () => {
    const [openModalLogin, setOpenModalLogin] = useState(false)
    const [loginForm, setLoginForm] = useState(false)
    const [signUpForm, setSignUpForm] = useState(false)
    const {data: session} = useSession();
    const modalLoginRef = useRef(null);
    const [showingPassword, setShowingPassword] = useState(false)
    const [showingConfirmPassword, setShowingConfirmPassword] = useState(false)
    const [checkPass, setCheckPass] = useState(false)
    const [checkPassConfirm, setCheckPassConfirm] = useState(false)
    const [errorAlert, setErrorAlert] = useState("")
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
        remember: false
    });
    const [signUpInfo, setSignUpInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: ""
    });
    const handleClickOutside = (event) => {
        if (modalLoginRef.current && !modalLoginRef.current.contains(event.target)) {
            closeModal();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const closeModal = () => {
        modalLoginRef.current.classList.remove("animate-right-to-left");
        modalLoginRef.current.classList.add("animate-left-to-right");
    }

    const handleAnimationEnd = () => {
        // Kiểm tra xem hiệu ứng "biến mất" đã hoàn tất hay chưa
        if (modalLoginRef.current.classList.contains("animate-left-to-right")) {
            setOpenModalLogin(false); // Nếu có, thì ẩn modal
            modalLoginRef.current.classList.remove("animate-left-to-right");
            modalLoginRef.current.classList.add("animate-right-to-left");
        }
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const response = await signIn('credentials', {
            redirect: false,
            email: loginInfo.email,
            password: loginInfo.password
        })
        if (response?.error === "CredentialsSignin") {
            setErrorAlert("Email or password is incorrect")
        }
        else {
            closeModal();
        }
    }

    useEffect(() => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!regex.test(signUpInfo.password)) {
            setCheckPass(false)
        }
        else {
            setCheckPass(true)
        }
    }, [signUpInfo.password])

    useEffect(() => {
        if (signUpInfo.password != signUpInfo.confirmPassword) {
            setCheckPassConfirm(false)
        }
        else {
            setCheckPassConfirm(true)
        }
    }, [signUpInfo.confirmPassword, signUpInfo.password])

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", signUpInfo.firstName);
        formData.append("lastName", signUpInfo.lastName);
        formData.append("email", signUpInfo.email);
        formData.append("password", signUpInfo.password);
        formData.append("phone", signUpInfo.phone);
        formData.append("address", signUpInfo.address);
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            setLoginForm(true);
            setSignUpForm(false);
            setErrorAlert("");
        }
        else {
            res.text().then(text => {
                setErrorAlert(text)
            })
        }
    }

    return (
        <div className='bg-primary-color px-15 py-3 fixed top-0 left-0 w-full flex justify-between z-99'>
            <div>
                <Image className="" src={"/images/logo/logo.png"} width={50} height={50}></Image>
            </div>
            <div className='flex gap-5'>
                {session?.user ? (
                    <div>
                        <p className='text-black font-medium'>Welcome, {session.user.firstName}</p>
                        <button onClick={() => signOut()} className='mt-5 bg-primary-color text-white py-2 rounded-full'>Sign Out</button>
                    </div>
                ) : (
                    <div onClick={() => {setOpenModalLogin(true)}} className='flex items-center gap-2 py-1 px-3 hover:bg-primary-hover rounded-full cursor-pointer'>
                        <Image src={"/images/icon/user.svg"} width={35} height={35} alt='user'></Image>
                        <span className='font-bold md:block hidden text-lg text-white'>Login</span>
                    </div> 
                )}
                <div className='flex items-center gap-2 py-1 px-3 hover:bg-primary-hover rounded-full cursor-pointer'>
                    <Image src={"/images/icon/cart.svg"} width={35} height={35} alt='cart'></Image>
                    <span className='font-bold md:block hidden text-lg text-white'>Cart</span>
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
                                                <div className='text-black'>
                                                    <button onClick={() => {setLoginForm(false)}} className='flex gap-2 items-center font-bold '>
                                                        <Image src={"/images/icon/back.svg"} width={25} height={30}></Image>
                                                        Back
                                                    </button>
                                                    <p className='mt-7 font-medium text-xl'>Login</p>
                                                    <div className='mt-7'>
                                                        <form onSubmit={handleSubmitLogin}>
                                                            <div>
                                                                <label htmlFor="email" className='block text-md font-medium'>Email *</label>
                                                                <input onChange={(e) => {setLoginInfo({...loginInfo, email: e.target.value})}} type="email" id="email" name="email" placeholder='your@email.com' className={`w-full border-b-2 ${loginInfo.email == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                                                {loginInfo.email == "" && <i className='text-red text-sm '>You must enter your email</i>}
                                                            </div>
                                                            <div className='mt-5'>
                                                                <label htmlFor="password" className='block text-md font-medium'>Password *</label>
                                                                <div className='relative flex items-center'>
                                                                    <input onChange={(e) => {setLoginInfo({...loginInfo, password: e.target.value})}} type={`${showingPassword ? "text" : "password"}`} id="password" name="password" placeholder='********' className={`w-full border-b-2 ${loginInfo.password == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                                                    {showingPassword ? (
                                                                        <Image className='absolute end-1 cursor-pointer' onClick={() => {setShowingPassword(false)}} src={"/images/icon/hide.svg"} width={25} height={25}></Image>
                                                                    ) : (
                                                                        <Image className='absolute end-1 cursor-pointer' onClick={() => {setShowingPassword(true)}} src={"/images/icon/show.svg"} width={25} height={25}></Image>
                                                                    )}
                                                                </div>
                                                                {loginInfo.password == "" && <i className='text-red text-sm '>You must enter your password</i>}
                                                                <div className='text-end cursor-pointer'>
                                                                    <i href="#" className='text-sm'>Forgot your password?</i>
                                                                </div>
                                                            </div>
                                                            <div className='mt-2 flex items-center gap-3'>
                                                                <div onClick={() => {const newState = !loginInfo.remember; setLoginInfo({...loginInfo, remember: newState})}} className={`w-4 h-4 border-primary-color border-2 cursor-pointer ${loginInfo.remember ? "bg-primary-color" : ""}`}> </div>
                                                                <label>Remember Me</label>
                                                            </div>
                                                            <div className='mt-5'>
                                                                <button type='submit' className='w-full bg-primary-color text-white py-2 rounded-full'>Login</button>
                                                            </div>
                                                            <hr className='mt-7 h-0.5 border-none bg-slate-300'></hr>
                                                            <div className='mt-5 text-sm text-center'>
                                                                <span>Don't have an account? </span> 
                                                                <span onClick={() => {setLoginForm(false); setSignUpForm(true)}} className='underline cursor-pointer'>Create Account</span>
                                                            </div>
                                                        </form>
                                                        {errorAlert != "" && (
                                                            <div className='mt-5 text-red p-2 rounded-lg'>
                                                                <i className='text-sm'>{errorAlert}</i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                signUpForm ? (
                                                    <div className='text-black'>
                                                        <button onClick={() => {setSignUpForm(false)}} className='flex gap-2 items-center font-bold '>
                                                            <Image src={"/images/icon/back.svg"} width={25} height={30}></Image>
                                                            Back
                                                        </button>
                                                        <p className='mt-7 font-medium text-xl'>Sign Up</p>
                                                        <div className='mt-7'>
                                                            <form onSubmit={handleSubmitSignUp} className='text-sm'>
                                                                <div>
                                                                    <label htmlFor="fname" className='block text-md font-medium'>First Name *</label>
                                                                    <input onChange={(e) => {setSignUpInfo({...signUpInfo, firstName: e.target.value})}} type="text" id="fname" name="email" placeholder='First name' className={`w-full border-b-2 ${signUpInfo.firstName == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                                                    {signUpInfo.firstName == "" && <i className='text-red text-sm '>You must enter your first name</i>}
                                                                </div>
                                                                <div className='mt-5'>
                                                                    <label htmlFor="lname" className='block text-md font-medium'>Last Name *</label>
                                                                    <input onChange={(e) => {setSignUpInfo({...signUpInfo, lastName: e.target.value})}} type="text" id="lname" name="email" placeholder='Last name' className={`w-full border-b-2 ${signUpInfo.lastName == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                                                    {signUpInfo.lastName == "" && <i className='text-red text-sm '>You must enter your last name</i>}
                                                                </div>
                                                                <div className='mt-5'>
                                                                    <label htmlFor="email" className='block text-md font-medium'>Email *</label>
                                                                    <input onChange={(e) => {setSignUpInfo({...signUpInfo, email: e.target.value})}} type="email" id="email" name="email" placeholder='your@email.com' className={`w-full border-b-2 ${signUpInfo.email == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                                                    {signUpInfo.email == "" && <i className='text-red text-sm '>You must enter your email</i>}
                                                                </div>
                                                                <div className='mt-5'>
                                                                    <label htmlFor="password" className='block text-md font-medium'>Password *</label>
                                                                    <div className='relative flex items-center'>
                                                                        <input onChange={(e) => {setSignUpInfo({...signUpInfo, password: e.target.value})}} type={`${showingPassword ? "text" : "password"}`} id="password" name="password" placeholder='8+ characters' className={`w-full border-b-2 ${signUpInfo.password == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                                                        {showingPassword ? (
                                                                            <Image className='absolute end-1 cursor-pointer' onClick={() => {setShowingPassword(false)}} src={"/images/icon/hide.svg"} width={25} height={25}></Image>
                                                                        ) : (
                                                                            <Image className='absolute end-1 cursor-pointer' onClick={() => {setShowingPassword(true)}} src={"/images/icon/show.svg"} width={25} height={25}></Image>
                                                                        )}
                                                                    </div>
                                                                    {signUpInfo.password == "" && <i className='text-red text-sm '>You must enter your password (8+ characters: At least 1 uppercase, 1 letter, 1 special character)</i>}
                                                                    {!checkPass && signUpInfo.password != "" && <i className='text-red text-sm '>Your password is not match required (8+ characters: At least 1 uppercase, 1 letter, 1 special character)</i>}
                                                                </div>
                                                                <div className='mt-5'>
                                                                    <label htmlFor="password" className='block text-md font-medium'>Confirm Password *</label>
                                                                    <div className='relative flex items-center'>
                                                                        <input onChange={(e) => {setSignUpInfo({...signUpInfo, confirmPassword: e.target.value})}} type={`${showingConfirmPassword ? "text" : "password"}`} id="password" name="password" placeholder='8+ characters' className={`w-full border-b-2 ${signUpInfo.confirmPassword == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                                                        {showingConfirmPassword ? (
                                                                            <Image className='absolute end-1 cursor-pointer' onClick={() => {setShowingConfirmPassword(false)}} src={"/images/icon/hide.svg"} width={25} height={25}></Image>
                                                                        ) : (
                                                                            <Image className='absolute end-1 cursor-pointer' onClick={() => {setShowingConfirmPassword(true)}} src={"/images/icon/show.svg"} width={25} height={25}></Image>
                                                                        )}
                                                                    </div>
                                                                    {signUpInfo.confirmPassword == "" && <i className='text-red text-sm'>You must enter your confirm password</i>}
                                                                    {!checkPassConfirm && signUpInfo.confirmPassword != "" && <i className='text-red text-sm'>Your confirm password is not match</i>}
                                                                </div>
                                                                <div className='mt-5'>
                                                                    <label htmlFor="fname" className='block text-md font-medium'>Phone *</label>
                                                                    <input onChange={(e) => {setSignUpInfo({...signUpInfo, phone: e.target.value})}} type="text" id="fname" name="email" placeholder='XXX-XXX-XXXX' className={`w-full border-b-2 ${signUpInfo.phone == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                                                    {signUpInfo.phone == "" && <i className='text-red text-sm '>You must enter your phone number</i>}
                                                                </div>
                                                                <div className='mt-5'>
                                                                    <label htmlFor="fname" className='block text-md font-medium'>Address *</label>
                                                                    <input onChange={(e) => {setSignUpInfo({...signUpInfo, address: e.target.value})}} type="text" id="fname" name="email" placeholder='Address' className={`w-full border-b-2 ${signUpInfo.address == "" ? "border-b-red" : ""} outline-none py-2 px-3 mt-1`} required/>
                                                                    {signUpInfo.address == "" && <i className='text-red text-sm '>You must enter your address</i>}
                                                                </div>
                                                                <div className='mt-5 mb-10'>
                                                                    <button type='submit' className='w-full bg-primary-color text-white py-2 rounded-full'>Sign Up</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        {errorAlert != "" && (
                                                            <div className='mt-5 text-red p-2 rounded-lg'>
                                                                <i className='text-sm'>{errorAlert}</i>
                                                            </div>
                                                        )}
                                                    </div>
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
            </div>
        </div>
    );
    }
export default NavOrder;