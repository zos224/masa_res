"use client"
import { CardContext } from "@/components/client/CardProvider";
import { useEffect, useContext, useState } from "react";

const ProcessingOrder = () => {
    const {card, updateCard} = useContext(CardContext)
    const [currentOrder, setCurrentOrder] = useState(null)
    useEffect(() => {
        if (sessionStorage.getItem("currentOrder")) {
            setCurrentOrder(JSON.parse(sessionStorage.getItem("currentOrder")))
        }
    }, [])
    useEffect(() => {
        const postOrder = async () => {
            const formData = new FormData();
            formData.append("idRestaurant", currentOrder.idRestaurant);
            formData.append("idCustomerAccount", currentOrder.idCustomerAccount);
            formData.append("firstName", currentOrder.firstName);
            formData.append("lastName", currentOrder.lastName);
            formData.append("email", currentOrder.email);
            formData.append("phone", currentOrder.phone);
            formData.append("address", currentOrder.address);
            formData.append("type", currentOrder.type);
            formData.append("dateTime", currentOrder.dateTime);
            formData.append("paymentMethod", currentOrder.paymentMethod);
            formData.append("paymentStatus", true);
            formData.append("subTotal", currentOrder.subTotal);
            formData.append("gst", currentOrder.gst);
            formData.append("tip", currentOrder.tip);
            formData.append("discount", currentOrder.discount);
            formData.append("total", currentOrder.total);
            formData.append("status", currentOrder.status);
            formData.append("products", JSON.stringify(card));
            const response = await fetch("/api/order/create", {
                method: "POST",
                body: formData
            })
            if (response.ok) {
                window.location.href = "/order-masala/order-success"
            }
        }
        if (card && currentOrder) {
            postOrder()
        }
    }, [card, currentOrder])
    return (
        <div className="text-center text-2xl  mt-40 text-black">
            Processing....
        </div>
    );
}
export default ProcessingOrder;