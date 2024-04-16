import prisma from "@/app/db/prismaClient";
import slugify from 'slugify';
export const POST = async (req) => {
    let restaurant = {
        name: '',
        phoneNumber: '',
        address: '',
        operationTimeIndoor: '',
        operationTimeTakeAway: '',
        status: false,
        diningArea: 0,
        capacity: '',
        seatingOption: false,
        image: ''
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    restaurant.name = formData.get('name');
    restaurant.phoneNumber = formData.get('phoneNumber');
    restaurant.address = formData.get('address');
    restaurant.operationTimeIndoor = formData.get('operationTimeIndoor');
    restaurant.operationTimeTakeAway = formData.get('operationTimeTakeAway');
    restaurant.status = parseInt(formData.get('status')) === 1 ? true : false;
    restaurant.diningArea = formData.get('diningArea');
    restaurant.capacity = formData.get('capacity');
    restaurant.image = formData.get('image');
    try {
        let newRestaurant;
        if (id && !isNaN(id)) {
            newRestaurant  = await prisma.Restaurant.update({ where: { id: id }, data: restaurant});
        }
        else {
            restaurant.slug = slugify(restaurant.name, {lower: true});
            newRestaurant = await prisma.Restaurant.create({ data: restaurant });
            const menu = await prisma.Menu.create({data: {idRestaurant: newRestaurant.id}});
        }
        return new Response(JSON.stringify(newRestaurant), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}