import { useState, useEffect } from 'react';
import Image from 'next/image';
const SignUpForm = ({changeToLogin, back}) => {
    const [showingPassword, setShowingPassword] = useState(false)
    const [showingConfirmPassword, setShowingConfirmPassword] = useState(false)
    const [checkPass, setCheckPass] = useState(false)
    const [checkPassConfirm, setCheckPassConfirm] = useState(false)
    const [errorAlert, setErrorAlert] = useState("")
    const [signUpInfo, setSignUpInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: ""
    });
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
            changeToLogin()
            setErrorAlert("");
        }
        else {
            res.text().then(text => {
                setErrorAlert(text)
            })
        }
    }

    return (
        <div className='text-black'>
            <p className='mt-7 font-medium text-xl'>Sign Up</p>
            <button onClick={back} className='flex gap-2 items-center font-bold mt-3'>
                <Image src={"/images/icon/back.svg"} width={25} height={30}></Image>
                Back
            </button>
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
    )
}
export default SignUpForm