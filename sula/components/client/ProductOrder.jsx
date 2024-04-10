import Image from 'next/image';
const ProductOrder = ({ product }) => {
    return (
        <div className='rounded-md cursor-pointer bg-white'>
            <div className='overflow-hidden relative aspect-4/3 rounded-md'>
                <Image className='hover:scale-110 hover:duration-500' src={product.image} alt={product.name} layout='fill'/>
            </div>
            <div className='p-3'>
                <div className='flex justify-between'>
                    <h2 className="font-bold text-xl text-black px-3">{product.name}</h2>
                    <h2 className="font-bold text-xl text-black px-3">{product.price}$</h2>
                </div>
                <p className='text-center text-black text-base mt-10'>{product.description}</p>
            </div>
        </div>
    );
}
export default ProductOrder;