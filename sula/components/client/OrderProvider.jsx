"use client"
import { createContext, useState } from "react";

export const OrderContext = createContext({
    orderDetails: {},
    updateOrderDetails: () => {}
})

export const OrderProvider = ({children}) => {
    const [orderDetails, setOrderDetails] = useState({
        date: "",
        time: "",
        type: "",
        address: "",
        fullDate: ""
    })

    const updateOrderDetails = (newOrder) => {
        setOrderDetails(newOrder)
    }

    return (
        <OrderContext.Provider value={{orderDetails, updateOrderDetails}}>
            {children}
        </OrderContext.Provider>
    )
}