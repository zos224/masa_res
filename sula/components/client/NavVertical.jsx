import Link from "next/link";
import Image from "next/image"
const NavbarVertical = ({openNav, onClose}) => {
    return (
        openNav && (
            <div className="w-full z-9999 absolute top-0 left-0 min-h-screen bg-dark-custom">
                <div className="w-5/6 py-3 flex justify-between mx-auto">
                    <div className="my-auto">
                        <Image className="w-18 h-18" src="/images/logo/logo.png" alt="logo" width={200} height={100} />
                    </div>
                    <div className="lg:hidden block my-auto">
                        {
                            <Image className="w-12 h-12 cursor-pointer my-auto" src="/images/icon/close.svg" alt="close menu" onClick={onClose} width={200} height={100} />
                        }
                    </div>
                </div>
                <div className="pt-10">
                    <ul className="flex flex-col text-center justify-end gap-y-5 w-full list-none uppercase font-semibold font-gambarino text-xl text-primary-color ">
                        <li>
                            <Link className="border-b" href="/location">Locations</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/menu">Menu</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/reservation">Reservation</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/order-online">Order Online</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/catering">Catering</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/gallery">Gallery</Link>
                        </li>
                        <li>
                            <Link className="border-b" href="/contact">Contact & Hours</Link>
                        </li>
                        <li>
                            <Link target="_blank" className="border-b" href="https://www.toasttab.com/masala-of-india-northgate/giftcards">Gift Cards</Link>
                        </li>
                        <li className="before:bg-primary-color relative before:transition-all before:duration-500 before:opacity-0 before:content-[''] before:absolute before:-bottom-0 before:left-0 before:w-0 before:h-1 before:rounded-full hover:before:w-full hover:before:opacity-100">
                            <Link className="border-b" href="/special-offers">Special Offers</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    );
}

export default NavbarVertical;