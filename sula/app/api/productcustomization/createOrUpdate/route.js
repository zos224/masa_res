import prisma from "@/app/db/prismaClient";

export const POST = async (req) => {
    let productCustomization = {
        name: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    productCustomization.name = formData.get('name');
    try {
        let newProductCustomization;
        if (id && !isNaN(id)) {
            newProductCustomization  = await prisma.productCustomization.update({ where: { id: id }, data: productCustomization, include: {productCustomizationChoices: true}});
        }
        else {
            newProductCustomization = await prisma.productCustomization.create({ data: productCustomization });
        }
        return new Response(JSON.stringify(newProductCustomization), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}