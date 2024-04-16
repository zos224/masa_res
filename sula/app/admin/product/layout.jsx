import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const metadata = {
    title: "Product | Admin Masala",
  };

const ProductLayout = ({children}) => {
return (
        <DefaultLayout>
        {children}
        </DefaultLayout>
    );
};

export default ProductLayout;