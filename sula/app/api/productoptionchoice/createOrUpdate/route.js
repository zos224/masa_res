import prisma from "@/app/db/prismaClient";

export const POST = async (req) => {
    let poc = {
        name: '',
        idProductOption: 0
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    poc.name = formData.get('name');
    poc.idProductOption = parseInt(formData.get('idParent'));
    try {
        let newPOC;
        if (id && !isNaN(id)) {
            newPOC  = await prisma.ProductOptionChoice.update({ where: { id: id }, data: poc});
        }
        else {
            newPOC = await prisma.ProductOptionChoice.create({ data: poc });
        }
        return new Response(JSON.stringify(newPOC), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}