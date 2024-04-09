import prisma from "@/app/db/prismaClient";

export const POST = async (req) => {
    let productoption = {
        name: '',
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    productoption.name = formData.get('name');
    try {
        let newProductOption;
        if (id && !isNaN(id)) {
            newProductOption  = await prisma.ProductOption.update({ where: { id: id }, data: productoption, include: {productOptionChoices: true}});
        }
        else {
            newProductOption = await prisma.ProductOption.create({ data: productoption });
        }
        return new Response(JSON.stringify(newProductOption), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}