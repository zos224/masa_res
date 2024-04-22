import Image from "next/image";
import Link from "next/link";
const Card = ({ title, subtitle, description, image, imagebg, buttonText, reverse, link}) => (
        <div className={`md:flex ${reverse ? "flex-row-reverse" : ""} md:max-h-180`}>
            <Image className="md:w-1/2 w-full aspect-video object-cover" src={image} alt={title} width={1000} height={700} />
            <div className="md:w-1/2 w-full min-h-180 relative">
                <Image className="w-full h-full min-h-180 object-cover " src={imagebg} alt={title} width={1000} height={700}></Image>
                <div className="top-0 left-0 right-0 bottom-0 absolute z-10 border border-white m-5 text-center ">
                    <div className="absolute top-1/2 -translate-y-1/2 ">
                        <div className="font-mrdehaviland lg:text-8xl text-6xl text-white lowercase">{title}</div>
                        <div className="font-gambarino lg:text-4xl text-2xl  uppercase font-normal text-white text-center mt-4">{subtitle}</div>
                        <div className="font-jost lg:text-xl text-lg text-white text-center xl:px-20 px-3 my-10">{description}</div>
                        <Link href={link} className="bg-black-2 text-white shadow-custom uppercase  px-7 py-4 ">{buttonText}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
export default Card;