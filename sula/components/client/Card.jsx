import Image from "next/image";
const Card = ({ title, subtitle, description, image, imagebg, buttonText, reverse}) => (
        <div className={`md:flex ${reverse ? "flex-row-reverse" : ""}`}>
            <Image className="md:w-1/2 w-full aspect-video object-cover" src={image} alt={title} width={1000} height={700} />
            <div className="md:w-1/2 w-full min-h-180 bg-black-2 relative">
                <Image className="w-full h-full min-h-180 opacity-20 -z-1 object-cover blur-sm" src={imagebg} alt={title} width={1000} height={700}></Image>
                <div className="top-0 left-0 right-0 bottom-0 absolute z-10 border border-primary-color m-5 text-center ">
                    <div className="absolute top-1/2 -translate-y-1/2 ">
                        <div className="font-italianno text-7xl  text-primary-color">{title}</div>
                        <div className="font-gambarino lg:text-4xl text-2xl  uppercase font-normal text-white text-center lg:mt-10 mt-5">{subtitle}</div>
                        <Image className="text-primary-color m-auto mt-7 lg:w-50 w-30" src="/images/bg/decor_color.svg" alt="line" width={200} height={50} />
                        <div className="font-jost lg:text-2xl text-xl text-white text-center xl:px-20 px-3 mt-5">{description}</div>
                        <button className="border-2 border-white text-white uppercase hover:border-none hover:text-primary-color hover:font-bold px-5 py-3 mt-10">{buttonText} &nbsp; &nbsp; &nbsp;&gt; </button>
                    </div>
                </div>
            </div>
        </div>
    );
export default Card;