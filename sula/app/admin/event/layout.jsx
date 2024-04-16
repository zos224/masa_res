import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const metadata = {
    title: "Event | Admin Masala",
  };

  const EventLayout = ({children}) => {
    return (
      <DefaultLayout>
        {children}
      </DefaultLayout>
    );
  };

  export default EventLayout;