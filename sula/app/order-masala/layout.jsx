import { CardProvider } from "@/components/client/CardProvider";
import NavOrder from "@/components/client/NavOrder";
import { OrderProvider } from "@/components/client/OrderProvider";
import Provider from "@/components/client/Provider";
export const metadata = {
    title: "Order Online | Masala Of India - Indian Cuisine in Seattle, WA",
    description:
      "Masala Of India offers a wide variety of Indian cuisine in Seattle, WA. Visit our website to view our menu and order online today!",
};
const OrderMaSalaLayout = ({children}) => {
    return (
        <Provider>
           
            <CardProvider>
                <OrderProvider>
                    <NavOrder></NavOrder>
                    <div>
                        {children}
                    </div>
                </OrderProvider>
            </CardProvider>
        </Provider>
    );
    }
export default OrderMaSalaLayout;