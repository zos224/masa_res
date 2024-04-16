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
        Using carefully chosen secret ingredients passed down through generations, Mr. Sanjay Sharma, owner of Masala Of India, has set a new standard for Indian cuisine. His expertise in crafting the healthiest and most palatable dishes, along with his respect for centuries-old culinary traditions, earned him a spot as a featured food vendor at the recent Northgate Festival. Our commitment to providing tempting yet wholesome dishes has resulted in the creation of the healthiest Indian cuisine nationwide.
        <div className="my-3">
          Since 2000, Masala of India has been delighting Indian food enthusiasts with an array of indulgent dishes that promise to tantalize your taste buds. From our sizzling appetizers to our flavorful main courses, every bite is a journey through the rich tapestry of Indian cuisine.
        </div>
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
        At Masala of India, we've created a cozy and welcoming atmosphere to ensure your relaxation while you enjoy our diverse Indian menu inspired by different states and regions. Our extensive menu goes beyond typical Indian restaurant offerings in Vancouver, catering to vegans, vegetarians, meat lovers, spice enthusiasts, and those with dietary restrictions like dairy or gluten intolerance. Join us for an authentic Indian culinary experience!
      </div>
      <div data-aos="fade-right" className="mt-10 ">
        <Card title={"Our Place"} subtitle={"INVITING, COMFORTING & UNFORGETTABLE"} buttonText={"View gallery"} description={"Enter our elegantly lit dining room, adorned with plush seating and captivating scenery, promising an unforgettable dining experience for our valued guests."}
            image={"/images/gallary/our_space.webp"} imagebg={"/images/gallary/pic5.jpg"} link={"/gallery"} reverse={false}></Card>
      </div>
      <div data-aos="fade-up" className="">
        <Card title={"Our Culinary Delights"} subtitle={"AUTHENTIC INDIAN CUISINE"} buttonText={"View menu"} description={"Discover the vibrant flavors of our traditional Indian dishes, crafted with fresh herbs and house-made garam masalas, infused with the aromatic richness of ginger and garlic. Indulge in staple Indian curries from diverse regions, alongside Mughal-inspired rice preparations and freshly baked tandoori breads from our Jaipuri tandoor oven."}
            image={"/images/gallary/our_food.webp"} imagebg={"/images/gallary/pic6.webp"} link={"/menu"} reverse={true}></Card>
      </div>
      <div data-aos="fade-left" className="">
        <Card title={"Our Beverages"} subtitle={"CRAFTED COCKTAILS & MORE"} buttonText={"View drink"} description={"Sip and unwind with our premium cocktails, featuring local and international beers, wines, spirits, and homemade non-alcoholic options. Join us at our lounge bar for an unforgettable experience."}
            image={"/images/gallary/our_baverage.webp"} imagebg={"/images/gallary/pic8.webp"} link={"/menu"} reverse={false}></Card>
      </div>
      <div data-aos="fade-down" className="">
        <Card title={"Our Offerings"} subtitle={"DINE-IN, TAKEOUT & CATERING"} buttonText={"View services"} description={"Experience Seattle's premier catering services at Masala Of India. With two decades of expertise, customize your crowd-friendly dishes and indulge in authentic Indian flavors across Washington. Contact us today!"}
            image={"/images/gallary/our_service.webp"} imagebg={"/images/gallary/pic11.webp"} link={"/catering"} reverse={true}></Card>
      </div>
      <div className="mt-20 relative" data-aos="flip-left">
        <Image className="w-full max-h-132.5 object-cover" src={"/images/gallary/pic9.webp"} width={1000} height={500}></Image>
        <div className="absolute top-0 left-0 w-full bg-dark-custom h-full">
          <div className="absolute lg:top-1/3 top-1/4 md:left-1/2 md:-translate-x-1/2 w-full md:w-auto text-center">
            <div className="text-gray tracking-widest text-3xl">Indulge Daily Lunch Buffet Bliss Awaits You</div>
            <div className="text-white font-bold tracking-wide text-6xl mt-2">All you can eat for $22.99 only</div>
            <div className="text-gray mt-2 text-lg">Vegetarians and Non Veg Dishes <br></br> 7 Days a Week <br></br> 11:00 AM to 03:00 PM</div>
          </div>
        </div>
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