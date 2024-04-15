import Image from "next/image";
import Link from "next/link";
export const metadata = {
    title: "Catering | Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
  };

const CateringPage = async () => {


    return (
        <div className="min-h-screen">
            <div className="pt-40 text-center text-black text-2xl font-semibold">
                Sorry! Catering is not available at this time.
                <br></br>
                We will update you soon.
            </div>
        </div>
    )
}
export default CateringPage;