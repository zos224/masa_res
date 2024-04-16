import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const metadata = {
    title: "Order | Admin Masala",
  };

const OrderLayout = ({children}) => {
    return (
            <DefaultLayout>
                {children}
            </DefaultLayout>
        );
    };

export default OrderLayout;