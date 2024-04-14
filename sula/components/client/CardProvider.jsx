"use client"
import { createContext, useEffect, useState } from "react";

export const CardContext = createContext({
    card: [],
    updateCard: () => {}
})

export const CardProvider = ({children}) => {
    const [card, setCard] = useState([])

    const updateCard = (newCard) => {
        setCard(newCard)
        localStorage.setItem("card", JSON.stringify(newCard))
    }

    useEffect(() => {
        if (localStorage.getItem("card")) {
            setCard(JSON.parse(localStorage.getItem("card")))
        }
    }, [])

    return (
        <CardContext.Provider value={{card, updateCard}}>
            {children}
        </CardContext.Provider>
    )
}