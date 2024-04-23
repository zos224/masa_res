"use client"
import { CardContext } from "@/components/client/CardProvider"
import { useContext, useState, useEffect } from "react"
import io from "socket.io-client"
const OrderSuccess = () => {
    const {card, updateCard} = useContext(CardContext)
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const socketInitialize = async () => {  
            const socket = io(undefined, {
                path: '/api/socket',
            })
            setSocket(socket)
        }

        socketInitialize()

        const handleBeforeUnload = (event) => {
            if (socket) {
                socket.disconnect();
            }
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
        updateCard([])
        sessionStorage.removeItem("currentOrder")
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (socket) {
                socket.disconnect();
            }
        };
    }, [])
    useEffect(() => {
        if (socket) {
            socket.emit('new order', null)
        }
    }, [socket])

    return (
        <div className="pt-40 text-white min-h-screen text-center w-full bg-image">
            <h1>Order Success</h1>
            <p>Your order has been placed successfully</p>
        </div>
    )
}

export default OrderSuccess