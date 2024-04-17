import prisma from "@/app/db/prismaClient";
import moment from "moment-timezone";
export const POST = async (req) => {
    const formData = await req.formData();
    const catering = {
        name: "",
        email: "",
        phone: "",
        numberOfPeople: 0,
        dateTime: "",
        occasion: "",
        budget: "",
        additionalComments: ""
    }
    catering.name = formData.get('name');
    catering.email = formData.get('email');
    catering.phone = formData.get('phone');
    catering.numberOfPeople = parseInt(formData.get('numberOfPeople'));
    catering.dateTime = moment.tz(formData.get('dateTime'), 'America/Los_Angeles').format();;
    catering.occasion = formData.get('occasion');
    catering.budget = parseFloat(formData.get('budget'));
    catering.additionalComments = formData.get('additionalComments');
    try {
        const newCatering = await prisma.Catering.create({ data: catering });
        return new Response("Done", { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response(error, { status: 500 })
    }
}