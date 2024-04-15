"use client"
import Card from "@/components/client/Card";
import Image from "next/image"
import AOS from "aos";
import Link from "next/link";
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
const HomePage = () => {
  const [listRestaurant, setListRestaurant] = useState([]);
  useEffect(() => {
    const getRestaurant = async () => {
      let response = await fetch('/api/restaurant/all'); 
      if (response.ok) {
        let data = await response.json();
        setListRestaurant(data);
      }
      else {
        throw new Error("Error fetching data");
      }
    }
    getRestaurant();
    AOS.init({
      duration: 1100,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      delay: 100,
      offset: 200
    });
  }, []);

  const phoneNumber = (number) => {
    var areaCode = number.substring(0, 3);
    var middle = number.substring(3, 6);
    var last = number.substring(6, 10);

    return areaCode + '-' + middle + '-' + last;
  }
  return (
    <div className="overflow-hidden">
      <div className="bg-image-1 relative">
        <Image className="h-203 object-cover" src={"/images/bg/bg1.webp"} width={1920} height={1080}></Image>
        <div className="absolute left-1/2 -translate-x-1/2 top-60 text-center">
          <div className=" font-italianno font-thin italic text-4xl lg:text-7xl text-white">
            Taste Tradition
          </div>
          <div className="font-gambarino tracking-widest lg:text-7xl text-4xl font-medium text-white mt-4">
            SERVING EXOTIC <br></br> INDIAN DELICACIES
          </div>
          <div className="font-italianno font-extralight italic text-4xl lg:text-7xl text-white mt-4">
            Savor the Splendor
          </div>
        </div>
      </div>
      <div className="lg:w-4/5 w-full mx-auto font-jost lg:text-xl text-base text-black text-center mt-10 px-2">
        Using freshly chosen secret ingredients passed down through generations,
        Mr. Sanjay Sharma, the owner of Masala Of India has set a new taste standard for Indian food. His fine skills to cater food lovers with the most palatable healthiest Indian food and his respect for more than 100-year-old Indian culinary tradition led him to become one of the featured food vendors at the recent Northgate Festival. The passion to provide tempting food along with the concern for the well-being of the consumers gave birth to the healthiest Indian food cuisine one can find in the whole country.
        <br></br> Since 2000, Masala of India has been catering Indian indulgences to Indian food lovers giving your taste buds a treat like never before. The sizzling spicy flavours of our appetizers directly from the spice capital of the world will leave you licking your fingers and lips.
      </div>
      <div className="mt-15 flex justify-around">
        <button className="border-primary-color border-2 text-primary-color uppercase text-base font-medium px-6 py-3 hover:bg-primary-color hover:text-white duration-300">Table Reservation</button>
        <button className="border-primary-color border-2 text-primary-color uppercase text-base font-medium px-6 py-3 hover:bg-primary-color hover:text-white duration-300">Order Online</button> 
      </div>
      <div className="mt-15 text-center font-semibold text-2xl w-full bg-dark-custom py-4 text-white">
        LOCATIONS
      </div>
      <div className="flex gap-10 flex-center mx-10 flex-wrap">
        {listRestaurant.map((restaurant) => (
          <div key={restaurant.id} className="mt-10 text-center lg:w-1/3 mx-auto">
              <h2 className="font-bold text-xl text-center text-black">{restaurant.name}</h2>
              <Image className="w-full aspect-video object-cover mt-4" src={restaurant.image} width={500} height={300}></Image>
              <button className="mt-4 border-primary-color border-2 text-primary-color uppercase text-base font-medium px-6 py-3 hover:bg-primary-color hover:text-white duration-300">Details</button>
          </div>
        ))}
      </div>
      <div className="lg:w-4/5 w-full mx-auto grid md:grid-cols-2 grid-cols-1 gap-x-20 mt-10 px-2">
          <Image data-aos="fade-right" className="w-full aspect-video object-cover mt-4" src={"/images/gallary/pic0.png"} width={500} height={300}></Image>
          <Image data-aos="fade-left" className="w-full aspect-video object-cover mt-4" src={"/images/gallary/pic1.webp"} width={500} height={300}></Image>
          <Image data-aos="fade-right" className="w-full aspect-video object-cover mt-4" src={"/images/gallary/pic2.webp"} width={500} height={300}></Image>
          <Image data-aos="fade-left" className="w-full aspect-video object-cover mt-4" src={"/images/gallary/pic3.webp"} width={500} height={300}></Image>
      </div>
      <div className="lg:w-4/5 w-full mx-auto font-jost lg:text-xl text-base  text-black text-center mt-10 px-2">
        We have created a wonderful warm setting filled with elements to relax you to the core, our well thought Indian menu is
        created to transport you on a culinary journey to different states and regions of India. We have included a wide variety of
        dishes which go beyond standard offerings from any other Indian restaurant in Vancouver. We are about food for
        everyone vegan, vegetarian, meat eaters, spicy & non spicy eaters and even for guests who prefer not to eat dairy and
        or gluten.
      </div>
      <div data-aos="fade-right" className="mt-10 ">
        <Card title={"Our Space"} subtitle={"Cozy, warm & memorable"} buttonText={"View gallery"} description={"We have a gorgeous candle lit dining room with several water features, plants and colorful fish to ensure a memorable dining experience for our guests."}
            image={"/images/gallary/our_space.webp"} imagebg={"/images/gallary/pic5.jpg"} link={"/gallery"} reverse={false}></Card>
      </div>
      <div data-aos="fade-up" className="">
        <Card title={"Our Food"} subtitle={"Traditional Indian menu"} buttonText={"View menu"} description={"We serve fresh, tasty and spicy Indian food prepared using fresh herbs, garam masalas which are roasted and made in-house combined with rich flavors from ginger and garlic. We are about staple Indian curries from different regions of India, mughal inspired rice preparations and tadoori breads, baked fresh in our Jaipuri tandoori oven."}
            image={"/images/gallary/our_food.webp"} imagebg={"/images/gallary/pic6.webp"} link={"/menu"} reverse={true}></Card>
      </div>
      <div data-aos="fade-left" className="">
        <Card title={"Our Beverages"} subtitle={"Premium Cocktails"} buttonText={"View drink"} description={"We serve refreshing cocktails, draft, local, international & Indian beers, local and international wines, spirits and home made non-alcoholic drinks."}
            image={"/images/gallary/our_baverage.webp"} imagebg={"/images/gallary/pic8.webp"} link={"/menu"} reverse={false}></Card>
      </div>
      <div data-aos="fade-down" className="">
        <Card title={"Our Services"} subtitle={"Home delivery, takeout & catering"} buttonText={"View services"} description={"Experience the rich flavors of India with Masala of India's exquisite catering services, available throughout Washington. Delight your guests with authentic cuisine that will transport them to the vibrant streets of India."}
            image={"/images/gallary/our_service.webp"} imagebg={"/images/gallary/pic11.webp"} link={"/catering"} reverse={true}></Card>
      </div>
      <div className="bg-image4 pt-20">
        <div className="">
              <div className="text-3xl text-black font-medium font-jost text-center">Get In Touch</div>
              <Image className="text-primary-color m-auto mt-7" src="/images/bg/decor_color.svg" alt="line" width={200} height={50} />
              <div className="flex gap-10">
                {listRestaurant.map((restaurant) => (
                  <div key={restaurant.id} className="mt-10 w-1/3 text-center mx-auto">
                      <div className="font-gambarino text-2xl text-primary-color">{restaurant.name}</div>
                      <div className="font-gambarino text-xl text-black mt-5">{restaurant.address}</div>
                      <div className="font-gambarino text-xl text-black mt-5">{phoneNumber(restaurant.phoneNumber)}</div>
                      <button className="bg-primary-color text-white px-5 py-3 mt-5 font-semibold text-xl">Call {restaurant.name}</button>
                  </div>
                ))}
              </div>
              <div className="text-3xl text-black font-medium font-jost text-center mt-20">Follow us on Instagram</div>
              <Image className="text-primary-color m-auto mt-7" src="/images/bg/decor_color.svg" alt="line" width={200} height={50} />
              <div className="grid mx-20 mt-10 gap-10 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                <div className="overflow-hidden hover:cursor-pointer">
                  <Image className="aspect-square object-cover hover:scale-110 duration-500 transition-transform" src={"/images/instagram/insta1.jpg"} width={1000} height={500}></Image>
                </div>
                <div className="overflow-hidden hover:cursor-pointer">
                  <Image className="aspect-square object-cover hover:scale-110 duration-500 transition-transform" src={"/images/instagram/insta2.jpg"} width={1000} height={500}></Image>
                </div>
                <div className="overflow-hidden hover:cursor-pointer">
                  <Image className="aspect-square object-cover hover:scale-110 duration-500 transition-transform" src={"/images/instagram/insta3.jpg"} width={1000} height={500}></Image>
                </div>
                <div className="overflow-hidden hover:cursor-pointer">
                  <Image className="aspect-square object-cover hover:scale-110 duration-500 transition-transform" src={"/images/instagram/insta4.jpg"} width={1000} height={500}></Image>
                </div>
              </div>
              <div className="mt-10 pb-10 w-fit m-auto cursor-pointer group">
                  <div className="bg-black-2 px-1 py-1 hover:bg-white group-hover:border-primary-color group-hover:border"> 
                      <div className="flex gap-10 border border-primary-color px-5 py-2 group-hover:border-none ">
                        <Image src={"/images/icon/insta.svg"} width={30} height={30}></Image>
                        <Link target="_blank" className="text-white group-hover:text-black  font-semibold text-xl" href={"https://www.instagram.com/masala_of_india"}>Follow us</Link>
                      </div>  
                  </div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;