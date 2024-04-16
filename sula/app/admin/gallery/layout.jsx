import DefaultLayout from "@/components/admin/Layouts/DefaultLayout";
export const metadata = {
    title: "Gallery | Admin Masala", 
  };

  const GalleryLayout = ({children}) => {
    return (
      <DefaultLayout>
        {children}
      </DefaultLayout>
    );
  };

  export default GalleryLayout;