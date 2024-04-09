import prisma from "@/app/db/prismaClient";

export const POST = async (req) => {
    let stp = {
        idSubType: 0,
        idProduct: 0
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    stp.idSubType = parseInt(formData.get('idParent1'));
    stp.idProduct = parseInt(formData.get('idParent2'));
    try {
        let newSTP;
        if (id && !isNaN(id)) {
            newSTP  = await prisma.SubTypeProduct.update({ where: { id: id }, data: stp, include: {product: true}});
        }
        else {
            newSTP = await prisma.SubTypeProduct.create({ data: stp, include: {product: true}});
        }
        return new Response(JSON.stringify(newSTP), { status: 200 })
    }
    catch (error) {
        return new Response(error, {status: 500})
    }
}