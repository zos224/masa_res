import Footer from "@/components/client/Footer";
import NavbarHorizon from "@/components/client/NavHorizon";
export const metadata = {
    title: "Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
  };

  const ClientLayout = ({children}) => {
    return (
      <div>
        <NavbarHorizon></NavbarHorizon>
        <div className="">
          <div className="h-24 bg-black">

          </div>
          {children}
        </div>
        <Footer></Footer>
      </div>
    );
  };

  export default ClientLayout;