"use client"
import { useParams, useRouter } from "next/navigation"
import {useEffect, useState, useRef } from "react"
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";

const CreateUpdateproduct = () => {
    const [product, setProduct] = useState({
        id: 0,
        name: '',
        description: '',
        price: '',
        image: '',
        amount: '',
        status: 1,
        product_productOptions: [],
        product_productCustomizations: []
    })
    const [oldImageUrl, setOldImageUrl] = useState('')
    const route = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [productOptions, setProductOptions] = useState(null)
    const [productCustomization, setProductCustomization] = useState(null)
    const productOptionRef = useRef(null)
    const productCustomizationRef = useRef(null)
    const POContainerRef = useRef(null)
    const PCContainerRef = useRef(null)
    const newElement = (ref, containerRef) => {
        const element = ref.current;
        const container = containerRef.current;
        if (element) {
            const copy = element.cloneNode(true)
            copy.classList.add("mt-3")
            const image = copy.querySelector("img")
            image.src = "/images/icon/remove.svg" 
            image.width = '26' 
            image.height = '26'
            image.classList.add("me-1")
            container.appendChild(copy)
            image.onclick = () => {
                copy.remove()
            }
        }
    }
    useEffect( () => {
        const getProduct = async () => {
            setLoading(true)
            const response = await fetch('/api/product/' + params.id[1])
            if (response.ok) {
                const existProduct = await response.json();
                setProduct(existProduct)
            }
            else {
                route.push('/admin/product/products/create')
            }
        }

        const getProductOptions = async () => {
            const response = await fetch('/api/productoption/all')
            if (response.ok) {
                const data = await response.json()
                setProductOptions(data)
            }
        }

        const getProductCustomization = async () => {
            const response = await fetch('/api/productcustomization/all')
            if (response.ok) {
                const data = await response.json()
                setProductCustomization(data)
            }
        }

        if (params.id[1]) {
            getProduct()
            getProductOptions()
            getProductCustomization()
        }
        else {
            getProductOptions()
            getProductCustomization()
        }
    }, [params.id[1], params.id[0]])

    useEffect(() => {
        if (productCustomization && productOptions) { 
            setLoading(false)
        }
    }, [productCustomization, productOptions])
    
    const [errorAlert, setErrorAlert] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productOptionsDiv = POContainerRef.current
        const selectsPO = productOptionsDiv.querySelectorAll("select")
        const newProductOptions = []
        selectsPO.forEach(select => {
            if (select.value != 0) {
                newProductOptions.push(select.value)
            }
        })
        const productCustomizationDiv = PCContainerRef.current
        const selectsPC = productCustomizationDiv.querySelectorAll("select")
        const newProductCustomizations = []
        selectsPC.forEach(select => {
            if (select.value != 0) {
                newProductCustomizations.push(select.value)
            }
        })
        setSubmitting(true)
        const formData = new FormData();
        formData.append('id', product.id)
        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('image', product.image)
        formData.append('amount', product.amount)
        formData.append('status', product.status)
        formData.append('productOptions', JSON.stringify(newProductOptions))
        formData.append('productCustomizations', JSON.stringify(newProductCustomizations))
        
        const response = await fetch('/api/product/createOrUpdate', {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            setErrorAlert(null)
            route.push("/admin/product/products")
        }
        else {
            response.text().then(text => {
                setErrorAlert(text)
            })
        }
        setSubmitting(false)
        
    }

    const handleSuccess = async (results) => {
        const newImage = results.info.secure_url
        setProduct(prevProduct => ({...prevProduct, image: newImage}))
    };

    useEffect(() => {
        const updateImage = async () => {
            const formData = new FormData();
            const publicId = oldImageUrl.substring(oldImageUrl.lastIndexOf('/') + 1, oldImageUrl.lastIndexOf('.'))
            formData.append('publicId', publicId)
            const response = await fetch('/api/cloudinary/delete', {
                method: "POST",
                body: formData
            })
            if (response.ok) {
                setOldImageUrl(product.image)
                }
        }
        if (oldImageUrl) {
            updateImage()
        }
        else {
            setOldImageUrl(product.image)
        }
    }, [product.image])

    return (
        <section class="py-1">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                    <div class="rounded-t dark:bg-bodydark bg-white dark:text-black mb-0 px-6 py-3">
                        <div class="text-center flex justify-between">
                            <h6 class="text-xl font-bold">
                            {params.id[0] == 'create' ? 'Add' : 'Update'} Product
                            </h6>
                        </div>
                    </div>
                    {!loading ? (
                        <div class="px-4 lg:px-10 py-10 w-full ">
                        <form onSubmit={handleSubmit}>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Name of Product
                                </label>
                                <input value={product.name} type="text" placeholder="Input name of product" onChange={(e) => setProduct({...product, name: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2" >
                                    Description of Product
                                </label>
                                <textarea rows={3} value={product.description} placeholder="Input description of product" type="text" onChange={(e) => setProduct({ ...product, description: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Price of Product
                                </label>
                                <input value={product.price} type="number" placeholder="Input price of product" onChange={(e) => setProduct({...product, price: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Amount of Product (Set or Single)
                                </label>
                                <input value={product.amount} type="number" placeholder="Input amount (1 or set of many)" min={1} onChange={(e) => setProduct({...product, amount: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div className="text-center">
                                <CldUploadWidget signatureEndpoint="/api/cloudinary" onSuccess={handleSuccess}>
                                    {({ open }) => {
                                        return (
                                        <button className="cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" onClick={(e) => {e.preventDefault(); open()}}>
                                            Upload an Image
                                        </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>
                            <div>
                                {product.image ? (
                                    <div className="w-6/12 mx-auto mt-3">
                                        <Image src={product.image} className="w-32 h-32 mx-auto" width={100} height={100} alt="product image"/>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Product Options
                                    </label>
                                    <div ref={POContainerRef}>
                                        {product.product_productOptions.length == 0 ? (
                                            <div className="flex" ref={productOptionRef}>
                                                <select required className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                    <option value={0}>None</option> 
                                                    {productOptions.map(po => (
                                                        <option key={po.id} value={po.id}>{po.name}</option>
                                                    ))}
                                                </select>
                                                <Image className="cursor-pointer ms-7" onClick={() => {newElement(productOptionRef, POContainerRef)}} src={"/images/icon/add.svg"} width={35} height={35}></Image>
                                            </div>
                                        ) : (
                                            product.product_productOptions.map((ppo, index) => (
                                                index == 0 ? (
                                                    <div key={index} className="flex" ref={productOptionRef}>
                                                        <select defaultValue={ppo.idProductOption} required className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                            <option value={0}>None</option> 
                                                            {productOptions.map(po => (
                                                                <option key={po.id} value={po.id}>{po.name}</option>
                                                            ))}
                                                        </select>
                                                        <Image className="cursor-pointer ms-7" onClick={() => {newElement(productOptionRef, POContainerRef)}} src={"/images/icon/add.svg"} width={35} height={35}></Image>
                                                    </div>
                                                ) : (
                                                    <div key={index} className="flex mt-3" ref={productOptionRef}>
                                                        <select required defaultValue={ppo.idProductOption} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                            <option value={0}>None</option> 
                                                            {productOptions.map(po => (
                                                                <option key={po.id} value={po.id}>{po.name}</option>
                                                            ))}
                                                        </select>
                                                        <Image className="cursor-pointer ms-7" onClick={(e) => {e.currentTarget.parentNode.remove()}} src={"/images/icon/remove.svg"} width={28} height={28}></Image>
                                                    </div>
                                                )
                                                
                                            ))
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Product Customizations
                                    </label>
                                    <div ref={PCContainerRef}>
                                        {product.product_productCustomizations.length == 0 ? (
                                            <div ref={productCustomizationRef}  className="flex">
                                                <select required onChange={(e) => setProduct({...product, status: e.target.value})} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                    <option value={0}>None</option>
                                                    {productCustomization.map(pc => (
                                                        <option key={pc.id} value={pc.id}>{pc.name}</option>
                                                    ))}
                                                </select>
                                                <Image className="cursor-pointer ms-7" onClick={() => {newElement(productCustomizationRef, PCContainerRef)}} src={"/images/icon/add.svg"} width={35} height={35}></Image>
                                            </div> ) : 
                                            product.product_productCustomizations.map((ppc, index) => (
                                                index == 0 ? (
                                                    <div key={index} ref={productCustomizationRef} className="flex">
                                                        <select required defaultValue={ppc.idProductCustomization} onChange={(e) => e.currentTarget.value = e.target.value} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                            <option value={0}>None</option>
                                                            {productCustomization.map(pc => (
                                                                <option key={pc.id} value={pc.id}>{pc.name}</option>
                                                            ))}
                                                        </select>
                                                        <Image className="cursor-pointer ms-7" onClick={() => {newElement(productCustomizationRef, PCContainerRef)}} src={"/images/icon/add.svg"} width={35} height={35}></Image>
                                                    </div>
                                                ) : (
                                                    <div key={index} ref={productCustomizationRef} className="flex mt-4">
                                                        <select required defaultValue={ppc.idProductCustomization} onChange={(e) => e.currentTarget.value = e.target.value} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                            <option value={0}>None</option>
                                                            {productCustomization.map(pc => (
                                                                <option key={pc.id} value={pc.id}>{pc.name}</option>
                                                            ))}
                                                        </select>
                                                        <Image className="cursor-pointer ms-7" onClick={(e) => {e.currentTarget.parentNode.remove()}} src={"/images/icon/remove.svg"} width={28} height={28}></Image>
                                                    </div>
                                                )
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Status
                                    </label>
                                    <select defaultValue={product.status == true ? 1 : 0} required onChange={(e) => setProduct({...product, status: e.target.value})} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                        <option className="dark:text-black" value={1}>Active</option>
                                        <option className="dark:text-black" value={0}>Hidden</option>
                                    </select>
                                </div>
                            </div>
                            {!submitting ? (
                                <div className="text-center">
                                    <input type="submit" role="button" className="mt-10 cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" value={params.id[0] == 'create' ? 'Add' : 'Update'}/>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <button className="mt-10 cursor-pointer bg-black text-white px-7 py-2 rounded-xl">
                                        <div role="status">
                                            <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                            
                        </form>
                        {errorAlert ? (
                            <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                                {errorAlert}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    ) : (
                        <div className="flex-center mt-2 mx-auto" role="status">
                            <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CreateUpdateproduct
