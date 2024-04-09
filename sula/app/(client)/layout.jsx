import Footer from "@/components/client/Footer";
import NavbarHorizon from "@/components/client/NavHorizon";
export const metadata = {
    title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
    description:
      "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  };

  const ClientLayout = ({children}) => {
    return (
      <div>
        <NavbarHorizon></NavbarHorizon>
        <div className="bg-image">
          {children}
        </div>
        <Footer></Footer>
      </div>
    );
  };

  export default ClientLayout;