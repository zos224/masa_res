import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
    return (
        <footer className="bg-black-2 px-30 py-10">
            <div className='flex gap-10'>
                <Link href="https://www.facebook.com/masalaofindiacuisine/" target="_blank" rel="noopener noreferrer">
                    <Image className='w-10' src="/images/icon/facebook.svg" alt="facebook" width={200} height={50} />
                </Link>
                <Link href="https://www.instagram.com/masala_of_india" target="_blank" rel="noopener noreferrer">
                    <Image className='w-10' src="/images/icon/insta_none.svg" alt="instagram" width={200} height={50} />
                </Link>
            </div>
            <div className='flex gap-10 mt-7 flex-wrap'>
                <Link href={"/blog"} className="uppercase text-white hover:text-primary-color font-semibold before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-0.5 before:rounded-full hover:before:w-full hover:before:opacity-100">Blog</Link>
                <Link href={"/contact"} className="uppercase text-white hover:text-primary-color font-semibold before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-0.5 before:rounded-full hover:before:w-full hover:before:opacity-100">Contact us</Link>
                <Link href={"/awards"} className="uppercase text-white hover:text-primary-color font-semibold before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-0.5 before:rounded-full hover:before:w-full hover:before:opacity-100">List of awards</Link>
                <Link href={"/loyalty"} className="uppercase text-white hover:text-primary-color font-semibold before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-0.5 before:rounded-full hover:before:w-full hover:before:opacity-100">E-loyalty</Link>
            </div>
            <p className='mt-5 text-white'>Copyright © 2024 Masala Of India. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;