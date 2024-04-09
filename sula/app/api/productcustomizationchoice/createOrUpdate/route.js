import prisma from "@/app/db/prismaClient";

export const POST = async (req) => {
    let pcc = {
        name: '',
        idProductCustomization: 0
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    pcc.name = formData.get('name');
    pcc.idProductCustomization = parseInt(formData.get('idParent'));
    try {
        let newPCC;
        if (id && !isNaN(id)) {
            newPCC  = await prisma.ProductCustomizationChoice.update({ where: { id: id }, data: pcc});
        }
        else {
            newPCC = await prisma.ProductCustomizationChoice.create({ data: pcc });
        }
        return new Response(JSON.stringify(newPCC), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}