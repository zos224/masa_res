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
        <div className="bg-image-home xl:px-50 lg:px-30 w-full mx-auto font-jost lg:text-lg text-base text-center text-white pb-20">
          <div className="pt-50">
            <div className="lg:text-10xl text-6xl font-mrdehaviland">Welcome to<br></br><span className="glow-text">Masala Of India Cuisine</span></div>
          </div>
          <div className="mt-50">
            Using carefully chosen secret ingredients passed down through generations, Mr. Sanjay Sharma, owner of Masala Of India, has set a new standard for Indian cuisine. His expertise in crafting the healthiest and most palatable dishes, along with his respect for centuries-old culinary traditions, earned him a spot as a featured food vendor at the recent Northgate Festival. Our commitment to providing tempting yet wholesome dishes has resulted in the creation of the healthiest Indian cuisine nationwide.
          </div>
          <div className="my-3">
            Since 2000, Masala of India has been delighting Indian food enthusiasts with an array of indulgent dishes that promise to tantalize your taste buds. From our sizzling appetizers to our flavorful main courses, every bite is a journey through the rich tapestry of Indian cuisine.
          </div>
          <div className="mt-15 flex justify-around">
            <Link href={"/reservation"} className="border-white border-2 text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300">Table Reservation</Link>
            <Link href={"/order-online"} className="border-white border-2 text-white uppercase text-base font-medium px-6 py-3 bg-primary-hover duration-300">Order Online</Link> 
          </div>
          <div className="mt-15 font-mrdehaviland text-center text-8xl w-full py-4 text-white">
            location
          </div>
          <div className="flex gap-10 flex-center flex-wrap">
            {listRestaurant.map((restaurant) => (
              <div key={restaurant.id} className="mt-1 text-center lg:w-1/3 mx-auto">
                  <Image className="w-full aspect-video object-cover mt-4 mb-10" src={restaurant.image} width={500} height={300}></Image>
                  <Link href={"/location"} className="mt-7 border-white border-2 text-white uppercase text-base font-medium bg-primary-hover px-6 py-3 duration-300">Details</Link>
              </div>
            ))}
          </div>
          <div className="lg:w-4/5 w-full mx-auto grid md:grid-cols-2 grid-cols-1 gap-x-20 mt-10 px-2">
              <Image data-aos="fade-right" className="w-full aspect-video object-cover mt-4" src={"/images/bg/location2.jpg"} width={500} height={300}></Image>
              <Image data-aos="fade-left" className="w-full aspect-video object-cover mt-4" src={"/images/bg/location3.jpg"} width={500} height={300}></Image>
              <Image data-aos="fade-right" className="w-full aspect-video object-cover mt-4" src={"/images/bg/location4.jpg"} width={500} height={300}></Image>
              <Image data-aos="fade-left" className="w-full aspect-video object-cover mt-4" src={"/images/bg/location5.jpg"} width={500} height={300}></Image>
          </div>
          <div className="xl:px-50 lg:px-30 w-full mx-auto font-jost lg:text-lg text-base text-center mt-20 px-10 text-white">
            At Masala of India, we've created a cozy and welcoming atmosphere to ensure your relaxation while you enjoy our diverse Indian menu inspired by different states and regions. Our extensive menu goes beyond typical Indian restaurant offerings in Vancouver, catering to vegans, vegetarians, meat lovers, spice enthusiasts, and those with dietary restrictions like dairy or gluten intolerance. Join us for an authentic Indian culinary experience!
          </div>
      </div>
      <div data-aos="fade-right" className="">
        <Card title={"Our Place"} subtitle={"INVITING, COMFORTING & UNFORGETTABLE"} buttonText={"View gallery"} description={"Enter our elegantly lit dining room, adorned with plush seating and captivating scenery, promising an unforgettable dining experience for our valued guests."}
            image={"/images/bg/our_space_bg.png"} imagebg={"/images/bg/our_place.png"} link={"/gallery"} reverse={false}></Card>
      </div>
      <div data-aos="fade-up" className="">
        <Card title={"Our Culinary Delights"} subtitle={"AUTHENTIC INDIAN CUISINE"} buttonText={"View menu"} description={"Discover culinary excellence at Masala Of India, led by Mr. Sanjay Sharma, a pioneer with over 30 years of experience. Our dishes redefine tradition with innovation, offering the healthiest and most flavorful Indian cuisine. Experience our renowned flavors, crafted with passion and care for your well-being."}
            image={"/images/bg/our_culi_chef.webp"} imagebg={"/images/bg/our_culinary.png"} link={"/menu"} reverse={true}></Card>
      </div>
      <div data-aos="fade-left" className="">
        <Card title={"Our Beverages"} subtitle={"CRAFTED COCKTAILS & MORE"} buttonText={"View drink"} description={"Sip and unwind with our premium cocktails, featuring local and international beers, wines, spirits, and homemade non-alcoholic options. Join us at our lounge bar for an unforgettable experience."}
            image={"/images/bg/our_beverage_bg.webp"} imagebg={"/images/bg/our_beverage.png"} link={"/menu"} reverse={false}></Card>
      </div>
      <div data-aos="fade-down" className="">
        <Card title={"Our Offerings"} subtitle={"DINE-IN, TAKEOUT & CATERING"} buttonText={"View services"} description={"Experience Seattle's premier catering services at Masala Of India. With two decades of expertise, customize your crowd-friendly dishes and indulge in authentic Indian flavors across Washington. Contact us today!"}
            image={"/images/bg/our_offering_bg.png"} imagebg={"/images/bg/our_offering.png"} link={"/catering"} reverse={true}></Card>
      </div>
      <div className="" data-aos="flip-left">
        <Image className="w-full object-cover" src={"/images/bg/buffet.png"} width={2000} height={1200}></Image>
      </div>
      <div className="">
        <div className="bg-image-home-get-in-touch pt-10">
              <div className="text-8xl text-white font-medium font-mrdehaviland text-center">get in touch</div>
              <div className="flex gap-10">
                {listRestaurant.map((restaurant) => (
                  <div key={restaurant.id} className="mt-2 text-center mx-auto">
                      <div className="font-gambarino text-white uppercase md:text-7xl text-5xl">{restaurant.name}</div>
                      <div className="font-jost md:text-xl text-lg text-white mt-5">{restaurant.address.split('|').map((a, index) => (
                        <div className="uppercase" key={index}>Address {index+1}: {a}</div>
                      ))}</div>
                      <div className="font-jost text-xl text-white mt-5">{phoneNumber(restaurant.phoneNumber)}</div>
                      <button className="bg-primary-hover border border-white text-white px-5 py-3 mt-5 uppercase text-xl">Call {restaurant.name}</button>
                  </div>
                ))}
              </div>
              <div className="text-3xl text-white font-medium uppercase font-jost text-center mt-20">Follow us on Instagram</div>
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
              <div className="py-10 text-center">
                <Link target="_blank" className="bg-black-2 text-white shadow-custom uppercase  px-7 py-4" href={"https://www.instagram.com/masala_of_india"}>Follow us</Link>
              </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;