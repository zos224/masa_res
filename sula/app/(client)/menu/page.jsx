import ShowListProduct from "@/components/client/ShowListProduct";
import Image from "next/image";
export const metadata = {
    title: "Menu | Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
  };
async function getMenu() {
  const res = await fetch(process.env.APP_URL + '/api/restaurant/all')
  if (res.ok) {
      const data = await res.json()
      const id = data[0].id
      const resMenu = await fetch(process.env.APP_URL + `/api/menu/${id}`)
      if (resMenu.ok) {
          const dataMenu = await resMenu.json()
          return dataMenu
      }
  }
}
const MenuPage =  async () => {
  const data = await getMenu()
  return (
    data && (
    <div>
        <div className="relative">
            <Image className="max-h-100 object-cover" src={"/images/bg/bg_menu.webp"} width={1920} height={1280}></Image>
            <span className="absolute text-4xl text-center font-italianno bg-dark-custom lg:px-20 py-2 px-5 font-bold text-white top-1/2 sm:left-1/2 sm:-translate-x-1/2">
              MENU'S MASALA OF INDIA
            </span>
        </div>
        <div className="pt-10 bg-image4"> 
          <div className="lg:w-3/5 m-auto w-full px-10 flex flex-wrap justify-between">
            <div className="flex relative w-fit px-3 py-2 m-auto">
              <span className="w-1/2 border cursor-pointer text-primary-color font-semibold border-primary-color px-10 py-2 hover:text-white button-slide-ltr ">Order Online</span>
              <div className="rounded-full p-2 bg-primary-color absolute left-1/2 -translate-x-1/2">
                <Image className="" src={"/images/icon/choice.svg"} width={25} height={25}></Image>
              </div>
              <span className="w-1/2 border cursor-pointer font-semibold text-primary-color border-primary-color px-10 py-2 button-slide-rtl hover:text-white">Reservations</span>
            </div>
            <div className="flex relative w-fit px-3 py-2 m-auto">
              <span className="w-1/2 border cursor-pointer text-primary-color font-semibold border-primary-color px-10 py-2 hover:text-white button-slide-ltr ">E-Gift</span>
              <div className="rounded-full p-2 bg-primary-color absolute left-1/2 -translate-x-1/2">
                <Image className="" src={"/images/icon/choice.svg"} width={25} height={25}></Image>
              </div>
              <span className="w-1/2 border cursor-pointer font-semibold text-primary-color border-primary-color px-10 py-2 button-slide-rtl hover:text-white">Catering</span>
            </div>
          </div>
          <div>
            {data.types.map((type, index) => (
              <div key={index} className="lg:w-4/5 m-auto w-full px-10 py-10">
                <h1 className="text-5xl text-center font-gambarino font-bold text-primary-color uppercase">{type.name}</h1>
                <div className="">
                  {type.subTypes.map((subType, index) => (
                    <div  key={index} className="mt-10">
                      <ShowListProduct category={subType.name} subTypeProducts={subType.subTypeProducts}></ShowListProduct>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
       
    </div>
	)
  );
};

export default MenuPage;