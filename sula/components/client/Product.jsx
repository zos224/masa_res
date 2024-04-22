import Image from 'next/image';
const Product = ({ product }) => {
    return (
        <div>
            <div className='overflow-hidden relative aspect-4/3'>
                <Image className='hover:scale-110 hover:duration-500 ' src={product.image} alt={product.name} layout='fill'/>
            </div>
            <div className='mt-2'>
                <div className='flex items-center'>
                    <div className='flex-grow h-0.5 bg-white '></div>
                    <h2 className="font-bold text-xl text-white px-3">{product.name} {product.price != 0 ? product.price + "$" : ""}</h2>
                    <div className='flex-grow h-0.5 bg-white'></div>
                </div>
                <p className='text-center text-white text-lg'>{product.description}</p>
            </div>
        </div>
    );
}
export default Product;