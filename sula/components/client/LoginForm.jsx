import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
const LoginForm = ({changeToSignup, back, closeModal}) => {
    const [loginInfo, setLoginInfo] = useState({email: "", password: "", remember: false})
    const [errorAlert, setErrorAlert] = useState("")
    const [showingPassword, setShowingPassword] = useState(false)
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
            if (closeModal) closeModal()
        }
    }
    return (
        <div className='text-black'>
            <p className='mt-7 font-medium text-xl'>Login</p>
            <button onClick={back} className='flex gap-2 items-center font-bold mt-3'>
                <Image src={"/images/icon/back.svg"} width={25} height={30}></Image>
                Back
            </button>
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
                        <span onClick={changeToSignup} className='underline cursor-pointer'>Create Account</span>
                    </div>
                </form>
                {errorAlert != "" && (
                    <div className='mt-5 text-red p-2 rounded-lg'>
                        <i className='text-sm'>{errorAlert}</i>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoginForm;