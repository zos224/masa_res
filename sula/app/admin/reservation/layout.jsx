import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const metadata = {
    title: "Reservation | Admin Masala",
  };

const ReservationLayout = ({children}) => {
    return (
            <DefaultLayout>
                {children}
            </DefaultLayout>
        );
    };

export default ReservationLayout;