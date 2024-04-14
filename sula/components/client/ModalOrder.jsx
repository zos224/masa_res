import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { CardContext } from './CardProvider';
const ModalOrder = ({ idProduct, openModal, onClose }) => {
    const [currentProduct, setCurrentProduct] = useState(null)
    const [selectOptions, setSelectOptions] = useState(null)
    const [selectCustomizations, setSelectCustomizations] = useState(null)
    const [loading, setLoading] = useState(false)
    const [orderProduct, setOrderProduct] = useState({
        idProduct: idProduct,
        name: "",
        image: "",
        price: 0,
        options: [],
        customizations: [],
        quantity: 0,
        total: 0
    })
    const [alertOption, setAlertOption] = useState(false)
    const [alertCustomization, setAlertCustomization] = useState(false)
    const {card, updateCard} = useContext(CardContext)
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const res = await fetch('/api/product/' + idProduct)
            if (res.ok) {
                const data = await res.json()
                if (data.product_productOptions.length > 0) {
                    setSelectOptions(true)
                    if (data.product_productCustomizations.length > 0) {
                        setSelectCustomizations(false)
                    }
                }
                else if (data.product_productCustomizations.length > 0) {
                    setSelectCustomizations(true)
                }
                setCurrentProduct(data)
                if (card.map(item => item.idProduct).includes(idProduct)) {
                    const product = card.find(item => item.idProduct === idProduct)
                    setOrderProduct({...orderProduct, idProduct: idProduct, total: product.total, quantity: product.quantity, price: product.price , name: product.name, image: product.image, options: product.options, customizations: product.customizations})
                }
                else {
                    const options = data.product_productOptions.map(option => {
                        return {
                            id: option.productOption.id,
                            name: option.productOption.name,
                            optionSelected: []
                        }})
                    const customizations = data.product_productCustomizations.map(customization => {
                        return {
                            id: customization.productCustomization.id,
                            name: customization.productCustomization.name,
                            customizationSelected: []
                        }})
                    setOrderProduct({...orderProduct, idProduct: idProduct, total: data.price, quantity: 1, price: data.price, name: data.name, image: data.image, options: options, customizations: customizations})
                } 
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }
        if (idProduct != 0) {
            fetchProduct()
        }
    
    }, [idProduct])

    useEffect(() => {
        if (currentProduct != null && orderProduct.quantity != 0) {
            setLoading(false)
        }
    }, [orderProduct.quantity, currentProduct])


    const closeModal = () => {
        onClose()
        setSelectOptions(null)
        setSelectCustomizations(null)
    }

    const onChooseOption = (option) => {
        const newOptionSelected = orderProduct.options.map(item => {
            if (item.id === option.idProductOption) {
                if (item.optionSelected.includes(option)) {
                    const optionSelected = item.optionSelected.filter(item => item.id !== option.id)
                    return optionSelected
                }
                return [...item.optionSelected, option]
            }
            return item.optionSelected
        })
        const newOrderProductOption = []
        for (let i = 0; i < newOptionSelected.length; i++) {
            const options = orderProduct.options[i]
            options.optionSelected = newOptionSelected[i]
            newOrderProductOption.push(options)
        }
        setOrderProduct({...orderProduct, options: newOrderProductOption})
    }

    const onChooseCustomization = (customization) => {
        const newCustomizationSelected = orderProduct.customizations.map(item => {
            if (item.id === customization.idProductCustomization) {
                if (item.customizationSelected.includes(customization)) {
                    const customizationSelected = item.customizationSelected.filter(item => item.id !== customization.id)
                    return customizationSelected
                }
                return [...item.customizationSelected, customization]
            }
            return item.customizationSelected
        })
        const newOrderProductCustomization = []
        for (let i = 0; i < newCustomizationSelected.length; i++) {
            const customizations = orderProduct.customizations[i]
            customizations.customizationSelected = newCustomizationSelected[i]
            newOrderProductCustomization.push(customizations)
        }
        setOrderProduct({...orderProduct, customizations: newOrderProductCustomization})
    }

    useEffect(() => {
        if (orderProduct.quantity != 0 && currentProduct != null) {
            setOrderProduct({...orderProduct, total: orderProduct.quantity * currentProduct.price})
        }
    }, [orderProduct.quantity])

    const addProductToCard = () => {
        if (orderProduct.quantity != 0) {
            if (orderProduct.options.length > 0 && orderProduct.options.some(option => option.optionSelected.length == 0)) {
                setAlertOption(true)
                setSelectCustomizations(false)
                setSelectOptions(true)
                return
            }
            if (orderProduct.customizations.length > 0 && orderProduct.customizations.some(customization => customization.customizationSelected.length == 0)) {
                setAlertCustomization(true)
                setSelectCustomizations(true)
                setSelectOptions(false)
                return
            }
            const orderProductIndex = card.findIndex(item => item.idProduct === orderProduct.idProduct)
            if (orderProductIndex != -1) {
                const newCard = card.map((item, index) => {
                    if (index === orderProductIndex) {
                        return orderProduct
                    }
                    return item
                })
                updateCard(newCard)
            }
            else {
                updateCard([...card, orderProduct])
            }
            closeModal()
        }
    }

    useEffect(() => {
        if (orderProduct.options.length > 0) {
            for (let i = 0; i < orderProduct.options.length; i++) {
                if (orderProduct.options[i].optionSelected.length <= 0) {
                    setAlertOption(true)
                    return
                }
            }
            setAlertOption(false)
        }
    }, [orderProduct.options])

    useEffect(() => {
        if (orderProduct.customizations.length > 0) {
            for (let i = 0; i < orderProduct.customizations.length; i++) {
                if (orderProduct.customizations[i].customizationSelected.length <= 0) {
                    setAlertCustomization(true)
                    return
                }
            }
            setAlertCustomization(false)
        }
    }, [orderProduct.customizations])
    return (
            openModal && !loading && (
                <div tabindex="-1" className="fixed top-0 left-0 right-0 z-99 bg-dark-custom md:p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full">
                    <div className="relative m-auto md:mt-5 w-full md:max-w-2xl h-full md:h-[calc(90%)]">
                        <div className="relative bg-white rounded-lg h-full ">
                            <button onClick={closeModal} type="button" className="absolute top-3 z-30 bg-white right-5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className='overflow-auto bg-white md:h-[calc(90%)]'>
                                <div className='relative rounded-lg aspect-4/3'>
                                    <Image className='object-cover' src={currentProduct.image} layout='fill' alt={currentProduct.name}></Image>
                                </div>
                                <div className='p-7'>
                                    <h2 className="font-bold text-2xl text-black">{currentProduct.name}</h2>
                                    <p className='mt-3 text-black text-base'>{currentProduct.description}</p>
                                </div>
                                <div className='md:flex'>
                                    {selectOptions != null && (
                                        <h2 onClick={() => {setSelectOptions(true); setSelectCustomizations(false)}} className={`md:flex-1 w-full cursor-pointer font-bold text-center ${selectOptions ? "text-primary-color border-b-2 border-primary-color" : "border-b-2 border-black text-black"} px-3`}>Select Options</h2>
                                    )}
                                    {selectCustomizations != null && (
                                        <h2 onClick={() => {setSelectCustomizations(true); setSelectOptions(false)}} className={`md:flex-1 w-full cursor-pointer md:mt-0 mt-5 font-bold text-center ${selectCustomizations ? "text-primary-color border-b-2 border-primary-color" : "border-b-2 border-black text-black"} px-3`}>Select Customizations</h2>
                                    )}
                                </div>
                                <div className=''>
                                    {selectOptions && (
                                        <div className=''>
                                            {currentProduct.product_productOptions.map((option, index) => (
                                                <div key={index} className=''>
                                                    <h2 className='w-full bg-slate-200 px-10 py-1 text-black font-semibold'>{option.productOption.name}<i className='mx-4 font-normal text-black text-sm'>Select at least 1</i></h2>
                                                    {alertOption && (
                                                        <p className='bg-red text-white px-10'>Please select at least 1 option!</p>
                                                    )}
                                                    {option.productOption.productOptionChoices.map((choice, index) => (
                                                        <div className='mx-10 my-3 text-black font-medium flex items-center gap-3 cursor-pointer' key={index}>
                                                            <input onChange={() => onChooseOption(choice)} checked={orderProduct.options.some(option => option.optionSelected.map(c => c.id).includes(choice.id) ? true : false)} className='peer relative appearance-none w-5 h-5 border-2 border-primary-color  checked:bg-primary-color' type='checkbox' value={choice.id} />
                                                            <label className=''>{choice.name}</label>
                                                        </div>
                                                    ))} 
                                                </div>
                                            ))}
                                        </div>
                                    )}         
                                    {selectCustomizations && (
                                        <div className=''>
                                            {currentProduct.product_productCustomizations.map((customization, index) => (
                                                <div key={index} className=''>
                                                    <h2 className='w-full bg-slate-200 px-10 py-1 text-black font-semibold'>{customization.productCustomization.name}<i className='mx-4 font-normal text-black text-sm'>Select at least 1</i></h2>
                                                    {alertCustomization && (
                                                        <p className='bg-red text-white px-10'>Please select at least 1 customization!</p>
                                                    )}
                                                    {customization.productCustomization.productCustomizationChoices.map((choice, index) => (
                                                        <div className='mx-10 my-3 text-black font-medium flex items-center gap-3 cursor-pointer' key={index}>
                                                            <input onChange={() => onChooseCustomization(choice)} checked={orderProduct.customizations.some(option => option.customizationSelected.map(c => c.id).includes(choice.id) ? true : false)} className='peer relative appearance-none w-5 h-5 border-2 border-primary-color  checked:bg-primary-color' type='checkbox' id={choice.name} value={choice.id} />
                                                            <label className='' htmlFor={choice.name}>{choice.name}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='md:flex text-center items-center bg-white p-5 border-t border-black'>
                               <div className='flex items-center m-auto w-2/5 gap-5'>
                                    <h2 className='text-black font-semibold text-lg py-1'>Quantity</h2>
                                    <div className='flex gap-2 items-center'>
                                        <Image onClick={() => {orderProduct.quantity == 1 ? setOrderProduct({...orderProduct, quantity: 1}) : setOrderProduct({...orderProduct, quantity: orderProduct.quantity -= 1})}} className='cursor-pointer' src={"/images/icon/remove_color.svg"} width={25} height={25} />
                                        <span className='text-xl text-black ms-1'>{orderProduct.quantity}</span>
                                        <Image onClick={() => {setOrderProduct({...orderProduct, quantity: orderProduct.quantity += 1})}} className='cursor-pointer' src={"/images/icon/add_color.svg"} width={35}  height={35}/>
                                    </div>
                               </div>
                                <button onClick={addProductToCard} className='w-3/5 rounded-full bg-primary-color text-white py-3 font-bold me-3 md:mt-0 mt-3'>Add to Cart ${orderProduct.total}</button>
                            </div>
                        </div>
                    </div>
                </div>  
            )
    );
}
export default ModalOrder;