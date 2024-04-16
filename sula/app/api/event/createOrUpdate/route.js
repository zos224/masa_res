import prisma from "@/app/db/prismaClient";
import moment from "moment-timezone";
export const POST = async (req) => {
    let event = {
        name: '',
        description: "",
        startDate: '',
        endDate: '',
        image: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    event.name = formData.get('name');
    event.startDate = formData.get('startDate');
    event.endDate = formData.get('endDate');
    event.description = formData.get('description');
    event.image = formData.get('image');
    event.startDate = moment.tz(event.startDate, 'America/Seattle').format();
    event.endDate = moment.tz(event.endDate, 'America/Seattle').format();
    try {
        let newEvent;
        if (id && !isNaN(id)) {
            newEvent  = await prisma.Event.update({ where: { id: id }, data: event});
        }
        else {
            newEvent = await prisma.Event.create({ data: event });
        }
        return new Response(JSON.stringify(newEvent), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}