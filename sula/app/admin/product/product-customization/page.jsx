"use client";
import Modal from "@/components/admin/Modal/Modal";
import ModalParent from "@/components/admin/Modal/ModalParent";
import ModalChild from "@/components/admin/Modal/ModalChild";
import { useEffect, useState } from "react";

const MenuPage = () => {
    const [openModalDeletePC, setOpenModalDeletePC] = useState(false)
    const [openModalDeletePCC, setOpenModalDeletePCC] = useState(false)
    const [openModalPC, setOpenModalPC] = useState(false)
    const [openModalPCC, setOpenModalPCC] = useState(false)
    const [deleteLink, setDeleteLink] = useState('')
    const [currentPC, setCurrentPC] = useState({
        id: 0,
        name: '',
        idMenu: 0
    })
    const [action, setAction] = useState('')
    const [productCustomizations, setProductCustomizations] = useState([])
    const [pccs, setPCCS] = useState([])
    const [currentPCC, setCurrentPCC] = useState({
        id: 0,
        name: '',
        idParent: 0
    })

    useEffect(() => {
        const fetchProductCustomization = async () => {
            const res = await fetch('/api/productcustomization/all')
            if (res.ok) {
                const data = await res.json()
                setProductCustomizations(data)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        fetchProductCustomization()
    }, [])

    
    const onDeletedPC = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newPCs = productCustomizations.filter((pc) => pc.id != id)
            setProductCustomizations(newPCs)
        }
    }

    const updateOrInsertPC = (pc) => {
        if (action == "create") {
            setProductCustomizations([...productCustomizations, pc])
        }
        else {
            const newPCs = productCustomizations.map((p) => {
                if (p.id == pc.id) {
                    return pc
                }
                return p
            })
            setProductCustomizations(newPCs)
        }
    }

    useEffect(() => {
        if (productCustomizations.length > 0) {
            let newPCCS = []
            productCustomizations.forEach((pc) => {
                console.log(pc)
                if (pc.productCustomizationChoices && pc.productCustomizationChoices.length > 0)
                {
                    console.log("vcl")
                    pc.productCustomizationChoices.forEach((pcc) => {
                        pcc.productCustomization = pc.name
                        newPCCS.push(pcc)
                        console.log("e")
                    })
                }
            })
            setPCCS(newPCCS)
        }
    }, [productCustomizations])


    const updateOrInsertPCC = (pcc) => {
        if (action == "create") {
            productCustomizations.forEach((pc) => {
                if (pc.id == pcc.idProductCustomization) {
                    pcc.productCustomization = pc.name
                }
            })
            setPCCS([...pccs, pcc])
        }
        else {
            const newPCCs = pccs.map((p) => {
                if (p.id == pcc.id) {
                    productCustomizations.forEach((pc) => {
                        if (pc.id == pcc.idProductCustomization) {
                            pcc.productCustomization = pc.name
                        }
                    })
                    return pcc
                }
                return p
            })
            setPCCS(newPCCs)
        }
    }

    const onDeletePCC = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newPCCs = pccs.filter((pcc) => pcc.id != id)
            setPCCS(newPCCs)
        }
    }
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Product Customization Management</h2>
            </div>
            <div>
                {/* table of product option */}
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <div className="flex justify-between mx-4">
                        <h3 className="font-bold text-md">Product Customization</h3>
                        <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setCurrentPC({id: null, name: '', idMenu: null}); setAction("create"); setOpenModalPC(true)}}>Add Product Customization</button>
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
                            {productCustomizations.map((pc, index) => (
                                <tr key={pc.id} className={`bg-white ${index == productCustomizations.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {pc.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => {setCurrentPC(pc); setAction("update"); setOpenModalPC(true)}}>Update</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => {setOpenModalDeletePC(!openModalDeletePC); setDeleteLink("/api/productcustomization/" + pc.id)}} className="hover:text-boxdark-2 hover:font-bold">Delete</button>
                                    </td>
                                </tr>
                                                        
                            ))}
                        </tbody>
                    </table>
                    <Modal onDeleted={onDeletedPC} deleteLink={deleteLink} isOpen={openModalDeletePC} onClose={() => setOpenModalDeletePC(false)}></Modal>
                    <ModalParent name={"product customization"} isOpen={openModalPC} onClose={(pc) => {setOpenModalPC(false); if (pc) updateOrInsertPC(pc)}} action={action} data={currentPC}></ModalParent>
                </div>
                {/* table of option for each product option */}
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                <div className="flex justify-between mx-4">
                        <h3 className="font-bold text-md">Customization Choices</h3>
                        <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setCurrentPCC({id: null, name: '', idParent: productCustomizations[0].id}); setAction("create"); setOpenModalPCC(true)}}>Add Customization Choice</button>
                    </div>
                    <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">#</th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Product Customization
                                </th>
                                <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pccs.map((pcc, index) => (
                                <tr key={pcc.id} className={`bg-white ${index == pccs.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {pcc.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {pcc.productCustomization}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => {setCurrentPCC({id: pcc.id, name: pcc.name, idParent: pcc.idProductCustomization}); setAction("update"); setOpenModalPCC(true)}}>Update</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => {setOpenModalDeletePCC(!openModalDeletePCC); setDeleteLink("/api/productcustomizationchoice/" + pcc.id)}} className="hover:text-boxdark-2 hover:font-bold">Delete</button>
                                    </td>
                                </tr>
                                                        
                            ))}
                        </tbody>
                    </table>
                    <Modal onDeleted={onDeletePCC} deleteLink={deleteLink} isOpen={openModalDeletePCC} onClose={() => setOpenModalDeletePCC(false)}></Modal>
                    <ModalChild parent={"Product Customization"} isOpen={openModalPCC} onClose={(pcc) => {setOpenModalPCC(false); if (pcc) updateOrInsertPCC(pcc)}} action={action} childData={currentPCC} listParent={productCustomizations} name={"product customization choice"}></ModalChild>
                </div>
            </div>
        </div>
        
        
    )
}

export default MenuPage


