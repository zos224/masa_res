import prisma from '@/app/db/prismaClient';
import bcrypt from 'bcrypt';

export const POST = async (request) => {
    let email, firstName, lastName, password, phone, address = '';
    const formData = await request.formData();
    email = formData.get("email")
    firstName = formData.get("firstName")
    lastName = formData.get("lastName")
    password = formData.get("password")
    phone = formData.get("phone")
    address = formData.get("address")
    try {
        const checkEmail = await prisma.CustomerAccount.findUnique({ where: {email: email} })
        if (!checkEmail) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)  
            const user = await prisma.CustomerAccount.create({data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                phone: phone,
                address: address,
                status: true
            }})
            return new Response("Create new account succesfully!", {status: 200})
        }
        else if (checkEmail) {
            return new Response("Email was used!", {status: 500})
        }
        return new Response("OK", {status: 200})
    }
    catch (error) {
        console.log(error)
        return new Response("Error! Please try again", {status: 500})
    }
}
    