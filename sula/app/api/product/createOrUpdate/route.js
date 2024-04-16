import prisma from "@/app/db/prismaClient";

export const POST = async (req) => {
    let product = {
        name: '',
        description: '',
        price: '',
        image: '',
        status: false
    }
    const formData = await req.formData();
    const idValue = formData.get('id');
    const id = idValue ? parseInt(idValue, 10) : null;
    product.name = formData.get('name');
    product.description = formData.get('description');
    product.price = parseFloat(formData.get('price'));
    product.image = formData.get('image');
    product.status = formData.get('status') === '1';
    const productOptions = formData.get('productOptions');
    const productCustomizations = formData.get('productCustomizations');
    const productOptionsArray = productOptions ? JSON.parse(productOptions) : [];
    const productCustomizationsArray = productCustomizations ? JSON.parse(productCustomizations) : [];
    try {
        let newProduct;
        if (id && !isNaN(id)) {
            newProduct = await prisma.Product.update({ where: { id: id }, data: product });
        }
        else {
            newProduct = await prisma.Product.create({ data: product });
        }
        if (productOptionsArray.length > 0) {
            const existProductOptions = await prisma.Product_ProductOption.findMany({ where: { idProduct: parseInt(newProduct.id) } });
            for (let i = 0; i < existProductOptions.length; i++) {
                if (!productOptionsArray.includes(existProductOptions[i].idProductOption)) {
                    await prisma.Product_ProductOption.delete({ where: { id: existProductOptions[i].id } });
                }
            }
            for (let i = 0; i < productOptionsArray.length; i++) {
                const productOption = await prisma.Product_ProductOption.findFirst({ where: { idProduct: parseInt(newProduct.id) , idProductOption: parseInt(productOptionsArray[i]) } });
                if (!productOption) {
                    await prisma.Product_ProductOption.create({ data: { idProduct: parseInt(newProduct.id), idProductOption: parseInt(productOptionsArray[i]) } });
                }
            }
        }
        else {
            await prisma.Product_ProductOption.deleteMany({ where: { idProduct: parseInt(newProduct.id) } });
        }
        if (productCustomizationsArray.length > 0) {
            const existProductCustomizations = await prisma.Product_ProductCustomization.findMany({ where: { idProduct: parseInt(newProduct.id) } });
            for (let i = 0; i < existProductCustomizations.length; i++) {
                if (!productCustomizationsArray.includes(existProductCustomizations[i].idProductCustomization)) {
                    await prisma.Product_ProductCustomization.delete({ where: { id: existProductCustomizations[i].id } });
                }
            }
            for (let i = 0; i < productCustomizationsArray.length; i++) {
                const productCustomization = await prisma.Product_ProductCustomization.findFirst({ where: { idProduct: parseInt(newProduct.id), idProductCustomization: parseInt(productCustomizationsArray[i]) } });
                if (!productCustomization) {
                    await prisma.Product_ProductCustomization.create({ data: { idProduct: parseInt(newProduct.id), idProductCustomization: parseInt(productCustomizationsArray[i]) } });
                }
            }
        }
        else {
            await prisma.Product_ProductCustomization.deleteMany({ where: { idProduct: parseInt(newProduct.id) } });
        }
        return new Response(JSON.stringify(newProduct), { status: 200 })
    }
    catch (error) {
        return new Response(error, { status: 500 })
    }

}