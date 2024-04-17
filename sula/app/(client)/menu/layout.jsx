export const metadata = {
    title: "Menu | Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
  };

  const MenuLayout = ({children}) => {
    return (
      <section className="min-h-screen">
        {children}
      </section>
    );
  };

  export default MenuLayout;