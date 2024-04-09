"use client";
import Modal from "@/components/admin/Modal/Modal";
import ModalParent from "@/components/admin/Modal/ModalParent";
import ModalChild from "@/components/admin/Modal/ModalChild";
import { useEffect, useState } from "react";

const MenuPage = () => {
    const [openModalDeletePO, setOpenModalDeletePO] = useState(false)
    const [openModalDeletePOC, setOpenModalDeletePOC] = useState(false)
    const [openModalPO, setOpenModalPO] = useState(false)
    const [openModalPOC, setOpenModalPOC] = useState(false)
    const [deleteLink, setDeleteLink] = useState('')
    const [currentProductOption, setCurrentProductOption] = useState({
        id: 0,
        name: '',
        idMenu: 0
    })
    const [action, setAction] = useState('')
    const [productOptions, setProductOptions] = useState([])
    const [pocs, setPOCS] = useState([])
    const [currentPOC, setCurrentPOC] = useState({
        id: 0,
        name: '',
        idParent: 0
    })

    useEffect(() => {
        const fetchProductOption = async () => {
            const res = await fetch('/api/productoption/all')
            if (res.ok) {
                const data = await res.json()
                setProductOptions(data)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        fetchProductOption()
    }, [])

    
    const onDeletedPO = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newPOs = productOptions.filter((po) => po.id != id)
            setProductOptions(newPOs)
        }
    }

    const updateOrInsertPO = (po) => {
        if (action == "create") {
            setProductOptions([...productOptions, po])
        }
        else {
            const newPOs = productOptions.map((p) => {
                if (p.id == po.id) {
                    return po
                }
                return p
            })
            setProductOptions(newPOs)
        }
    }

    useEffect(() => {
        if (productOptions.length > 0) {
            let newPOCS = []
            productOptions.forEach((po) => {
                if (po.productOptionChoices && po.productOptionChoices.length > 0)
                {
                    po.productOptionChoices.forEach((poc) => {
                        poc.productOption = po.name
                        newPOCS.push(poc)
                    })
                }
            })
            setPOCS(newPOCS)
        }
    }, [productOptions])


    const updateOrInsertPOC = (poc) => {
        if (action == "create") {
            productOptions.forEach((po) => {
                if (po.id == poc.idProductOption) {
                    poc.productOption = po.name
                }
            })
            setPOCS([...pocs, poc])
        }
        else {
            const newPOCS = pocs.map((p) => {
                if (p.id == poc.id) {
                    productOptions.forEach((po) => {
                        if (po.id == poc.idProductOption) {
                            poc.productOption = po.name
                        }
                    })
                    return poc
                }
                return p
            })
            setPOCS(newPOCS)
        }
    }

    const onDeletePOC = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newPOCS = pocs.filter((poc) => poc.id != id)
            setPOCS(newPOCS)
        }
    }
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Product Option Management</h2>
            </div>
            <div>
                {/* table of product option */}
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <div className="flex justify-between mx-4">
                        <h3 className="font-bold text-md">Product Option</h3>
                        <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setCurrentProductOption({id: null, name: '', idMenu: null}); setAction("create"); setOpenModalPO(true)}}>Add Product Option</button>
                    </div>
                    <table className="mt-5 w-full text-sm text-center text-gray-500 dark:text-white">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">#</th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Name
                                </th>
                                <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productOptions.map((po, index) => (
                                <tr key={po.id} className={`bg-white ${index == productOptions.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {po.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => {setCurrentProductOption(po); setAction("update"); setOpenModalPO(true)}}>Update</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => {setOpenModalDeletePO(!openModalDeletePO); setDeleteLink("/api/productoption/" + po.id)}} className="hover:text-boxdark-2 hover:font-bold">Delete</button>
                                    </td>
                                </tr>
                                                        
                            ))}
                        </tbody>
                    </table>
                    <Modal onDeleted={onDeletedPO} deleteLink={deleteLink} isOpen={openModalDeletePO} onClose={() => setOpenModalDeletePO(false)}></Modal>
                    <ModalParent name={"product option"} isOpen={openModalPO} onClose={(po) => {setOpenModalPO(false); if (po) updateOrInsertPO(po)}} action={action} data={currentProductOption}></ModalParent>
                </div>
                {/* table of option for each product option */}
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                <div className="flex justify-between mx-4">
                        <h3 className="font-bold text-md">Option Choices</h3>
                        <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setCurrentPOC({id: null, name: '', idParent: productOptions[0].id}); setAction("create"); setOpenModalPOC(true)}}>Add Option Choice</button>
                    </div>
                    <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">#</th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Product Option
                                </th>
                                <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pocs.map((poc, index) => (
                                <tr key={poc.id} className={`bg-white ${index == pocs.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {poc.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {poc.productOption}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => {setCurrentPOC({id: poc.id, name: poc.name, idParent: poc.idProductOption}); setAction("update"); setOpenModalPOC(true)}}>Update</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => {setOpenModalDeletePOC(!openModalDeletePOC); setDeleteLink("/api/productoptionchoice/" + poc.id)}} className="hover:text-boxdark-2 hover:font-bold">Delete</button>
                                    </td>
                                </tr>
                                                        
                            ))}
                        </tbody>
                    </table>
                    <Modal onDeleted={onDeletePOC} deleteLink={deleteLink} isOpen={openModalDeletePOC} onClose={() => setOpenModalDeletePOC(false)}></Modal>
                    <ModalChild parent={"Product Option"} isOpen={openModalPOC} onClose={(poc) => {setOpenModalPOC(false); if (poc) updateOrInsertPOC(poc)}} action={action} childData={currentPOC} listParent={productOptions} name={"product option choice"}></ModalChild>
                </div>
            </div>
        </div>
        
        
    )
}

export default MenuPage


