import prisma from "@/app/db/prismaClient";

export const POST = async (req) => {
    let subType = {
        name: '',
        idType: null
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    subType.name = formData.get('name');
    subType.idType = formData.get('idParent') ? parseInt(formData.get('idParent')) : null;
    try {
        let newSubType;
        if (id && !isNaN(id)) {
            newSubType  = await prisma.SubType.update({ where: { id: id }, data: subType, include: {subTypeProducts: true}});
        }
        else {
            newSubType = await prisma.SubType.create({ data: subType });
        }
        return new Response(JSON.stringify(newSubType), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}