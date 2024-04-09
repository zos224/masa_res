import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const metadata = {
    title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
    description:
      "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  };

const ProductLayout = ({children}) => {
return (
        <DefaultLayout>
        {children}
        </DefaultLayout>
    );
};

export default ProductLayout;