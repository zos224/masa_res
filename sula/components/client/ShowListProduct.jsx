"use client"
import Product from "./Product";
import { useState } from "react";
const ShowListProduct = ({ subTypeProducts, category }) => {
    const [showing, setShowing] = useState(false)
    return (
        <div>
            <h1 onClick={() => {setShowing((prev) => !prev)}} className={`text-3xl cursor-pointer py-1 border-2 border-white font-bold text-center uppercase text-white ${showing ? "bg-primary-hover" : ""}`}>{category}</h1>
            {showing && 
                <div className="mt-5 px-3 grid gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {subTypeProducts.map((stProduct) => (
                        <Product key={stProduct.product.id} product={stProduct.product} />
                    ))}
                </div>
            }
        </div>
    );
    }
export default ShowListProduct;