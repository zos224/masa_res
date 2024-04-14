import prisma from "@/app/db/prismaClient";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const getActiveProduct = async () => {
    const checkProducts = await stripe.products.list();
    const avaiableProducts = checkProducts.data.filter(product => product.active === true);
    return avaiableProducts
}

export const POST = async (req) => {
    const formData = await req.formData();
    const products = JSON.parse(formData.get('products'))
    try {
        let avaiableProducts = await getActiveProduct();
        try {
            for (let i = 0; i < products.length; i++) {
                const product = avaiableProducts.find(product => product.name.toLowerCase() === products[i].name.toLowerCase());
                if (product === undefined) {
                    const prod = await stripe.products.create({
                        name: products[i].name,
                        default_price_data: {
                            unit_amount: products[i].price * 100,
                            currency: 'usd',
                        }
                    })
                }
            }

            avaiableProducts = await getActiveProduct();
            let StripeProducts = []
            for (const product of products) {
                const stripeProduct = avaiableProducts.find(stripeProduct => stripeProduct.name.toLowerCase() === product.name.toLowerCase());
                if (stripeProduct !== undefined) {
                    StripeProducts.push({
                        price: stripeProduct.default_price,
                        quantity: product.quantity
                    })
                }
            }

            const session = await stripe.checkout.sessions.create({
                line_items: StripeProducts,
                mode: 'payment',
                success_url: process.env.APP_URL + '/order-masala/checkout/processing',
                cancel_url: process.env.APP_URL + '/order-masala',
            });
            return new Response(JSON.stringify({url: session.url}), { status: 200 })
        }
        catch (error) {
            return new Response(error, { status: 500 })
        }
    }
    catch (error) {
        return new Response(error, { status: 500 })
    }
}
    
