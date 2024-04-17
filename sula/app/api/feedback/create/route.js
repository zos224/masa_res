import prisma from "@/app/db/prismaClient";
import moment from "moment-timezone";
export const POST = async (req) => {
    let feedback = {
        idRestaurant: 0,
        name: "",
        email: "",
        phone: "",
        orderType: "",
        date: "",
        idOrder: "",
        orderIssues: "",
        image: ""
    }
    const formData = await req.formData();
    feedback.idRestaurant = parseInt(formData.get('idRestaurant'), 10); 
    feedback.name = formData.get('name');
    feedback.email = formData.get('email');
    feedback.phone = formData.get('phone');
    feedback.orderType = formData.get('orderType');
    feedback.date = moment.tz(formData.get('date'), 'America/Los_Angeles').format();
    feedback.idOrder = formData.get('idOrder') === '' ? null : parseInt(formData.get('idOrder'), 10);
    feedback.orderIssues = formData.get('orderIssues');
    feedback.image = formData.get('image');
    feedback.status = false;
    try {
        let newFeedback = await prisma.Feedback.create({ data: feedback });
        return new Response(JSON.stringify(newFeedback), { status: 200 })
    }
    catch (error) {
        console.log(error)
        return new Response(error, {status: 500})
    }
}