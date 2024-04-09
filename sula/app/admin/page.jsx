import ECommerce from "@/components/admin/E-commerce.jsx";
import DefaultLayout from "@/components/admin/Layouts/DefaultLayout.jsx";

export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
