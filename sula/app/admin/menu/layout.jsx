import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const metadata = {
    title: "Menu | Admin Masala",
  };

const MenuLayout = ({children}) => {
return (
        <DefaultLayout>
        {children}
        </DefaultLayout>
    );
};

export default MenuLayout;