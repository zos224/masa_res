import prisma from "@/app/db/prismaClient";

export const POST = async (req) => {
    let type = {
        name: '',
        idMenu: 0
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    type.name = formData.get('name');
    type.idMenu = parseInt(formData.get('idMenu'));
    try {
        let newType;
        if (id && !isNaN(id)) {
            newType  = await prisma.Type.update({ where: { id: id }, data: type, include: {subTypes: true}});
        }
        else {
            newType = await prisma.Type.create({ data: type });
        }
        return new Response(JSON.stringify(newType), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}