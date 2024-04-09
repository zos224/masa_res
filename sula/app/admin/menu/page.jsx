"use client";
import Modal from "@/components/admin/Modal/Modal";
import ModalParent from "@/components/admin/Modal/ModalParent";
import ModalChild from "@/components/admin/Modal/ModalChild";
import { useEffect, useState } from "react";
import ModalManyToMany from "@/components/admin/Modal/ModalManyToMany";

const MenuPage = () => {
    const [openModalDeleteType, setOpenModalDeleteType] = useState(false)
    const [openModalDeleteCategory, setOpenModalDeleteCategory] = useState(false)
    const [openModalType, setOpenModalType] = useState(false)
    const [openModalCategory, setOpenModalCategory] = useState(false)
    const [deleteLink, setDeleteLink] = useState('')
    const [restaurants, setRestaurants] = useState([])
    const [currentRestaurant, setCurrentRestaurant] = useState(0)
    const [currentMenu, setCurrentMenu] = useState(0)
    const [currentType, setCurrentType] = useState({
        id: 0,
        name: '',
        idMenu: 0
    })
    const [action, setAction] = useState('')
    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState({
        id: 0,
        name: '',
        idParent: 0
    })
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])    
    const [subTypeProducts, setSubTypeProducts] = useState([])
    const [currentSTP, setCurrentSTP] = useState({
        id: 0,
        idParent1: 0,
        idParent2: 0
    })
    const [openModalSTP, setOpenModalSTP] = useState(false)
    const [openModalDeleteSTP, setOpenModalDeleteSTP] = useState(false)
    useEffect(() => {
        const fetchRestaurant = async () => {
            const res = await fetch('/api/restaurant/all')
            if (res.ok) {
                const data = await res.json()
                setRestaurants(data)
                setCurrentRestaurant(data[0].id)
                setLoading(false)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        const fetchProduct = async () => {
            const res = await fetch("/api/product/all")
            if (res.ok) {
                const data = await res.json()
                setProducts(data)
            }
        }
        fetchRestaurant()
        fetchProduct()
    }, [])

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await fetch('/api/menu/' + currentRestaurant)
            if (res.ok) {
                const data = await res.json()
                setCurrentMenu(data.id)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        if (currentRestaurant != 0) {
            fetchMenu()
        }

    }, [currentRestaurant])

    useEffect(() => {
        const fetchTypeProduct = async () => {
            const res = await fetch('/api/type/' + currentMenu)
            if (res.ok) {
                const data = await res.json()
                setTypes(data)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        if (currentMenu != 0) {
            fetchTypeProduct()
        }
    }, [currentMenu])

    
    const onDeletedType = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newTypes = types.filter((t) => t.id != id)
            setTypes(newTypes)
        }
    }

    const updateOrInsertType = (type) => {
        if (action == "create") {
            setTypes([...types, type])
        }
        else {
            const newTypes = types.map((t) => {
                if (t.id == type.id) {
                    return type
                }
                return t
            })
            setTypes(newTypes)
        }
    }

    useEffect(() => {
        if (types.length > 0) {
            let newCategories = []
            types.forEach((type) => {
                if (type.subTypes && type.subTypes.length > 0)
                {
                    type.subTypes.forEach((subType) => {
                        subType.type = type.name
                        newCategories.push(subType)
                    })
                }
            })
            setCategories(newCategories)
        }
    }, [types])


    const updateOrInsertCategory = (category) => {
        if (action == "create") {
            types.forEach((type) => {
                if (type.id == category.idType) {
                    category.type = type.name
                }
            })
            setCategories([...categories, category])
        }
        else {
            const newCategories = categories.map((c) => {
                if (c.id == category.id) {
                    types.forEach((type) => {
                        if (type.id == category.idType) {
                            category.type = type.name
                        }
                    })
                    return category
                }
                return c
            })
            setCategories(newCategories)
        }
    }

    const onDeleteCategory = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newCategories = categories.filter((c) => c.id != id)
            setCategories(newCategories)
        }
    }

    useEffect(() => {
        const getSubTypeProducts = async () => {
            if (categories.length > 0) {
                const listSTP = []
                for (let i = 0; i < categories.length; i++) {
                    const res = await fetch('/api/subtypeproduct/' + categories[i].id)
                    if (res.ok) {
                        const data = await res.json()
                        data.forEach((d) => {
                            d.subType = categories[i].name
                            listSTP.push(d)
                        })
                    }
                }
                setSubTypeProducts(listSTP)
            }
        }

        getSubTypeProducts()
    }, [categories])

    const updateOrInsertSubTypeProduct = (stp) => {
        if (action == "create") {
            categories.forEach((c) => {
                if (c.id == stp.idSubType) {
                    stp.subType = c.name
                }
            })
            setSubTypeProducts([...subTypeProducts, stp])
        }
        else {
            const newSTPs = subTypeProducts.map((s) => {
                if (s.id == stp.id) {
                    categories.forEach((c) => {
                        if (c.id == stp.idSubType) {
                            stp.subType = c.name
                        }
                    })
                    return stp
                }
                return s
            })
            setSubTypeProducts(newSTPs)
        }
    }

    const onDeleteSTP = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newSTPs = subTypeProducts.filter((s) => s.id != id)
            setSubTypeProducts(newSTPs)
        }
    }
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Menu Management</h2>
                <select className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md">
                    {restaurants.map((restaurant) => (
                        <option value={restaurant.id} onClick={() => {setCurrentRestaurant(restaurant.id)}}>{restaurant.name}</option>
                    ))}
                </select>
            </div>
            {!loading ? (
                <div>
                    {/* table of type product for menu */}
                    <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <div className="flex justify-between mx-4">
                            <h3 className="font-bold text-md">Type of product for menu</h3>
                            <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setCurrentType({id: null, name: '', idMenu: currentMenu}); setAction("create"); setOpenModalType(true)}}>Add Type</button>
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
                                {types.map((type, index) => (
                                    <tr key={type.id} className={`bg-white ${index == types.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {type.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => {setCurrentType(type); setAction("update"); setOpenModalType(true)}}>Update</button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => {setOpenModalDeleteType(!openModalDeleteType); setDeleteLink("/api/type/" + type.id)}} className="hover:text-boxdark-2 hover:font-bold">Delete</button>
                                        </td>
                                    </tr>
                                                            
                                ))}
                            </tbody>
                        </table>
                        <Modal onDeleted={onDeletedType} deleteLink={deleteLink} isOpen={openModalDeleteType} onClose={() => setOpenModalDeleteType(false)}></Modal>
                        <ModalParent name={"type"} isOpen={openModalType} onClose={(type) => {setOpenModalType(false); if (type) updateOrInsertType(type)}} action={action} data={currentType}></ModalParent>
                    </div>
                    {/* table of category of product for each type */}
                    <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <div className="flex justify-between mx-4">
                            <h3 className="font-bold text-md">Category of product</h3>
                            <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setCurrentCategory({id: null, name: '', idParent: types[0].id}); setAction("create"); setOpenModalCategory(true)}}>Add Category</button>
                        </div>
                        <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 font-medium">#</th>
                                    <th scope="col" className="px-6 py-3 font-medium">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium">
                                        Type
                                    </th>
                                    <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category.id} className={`bg-white ${index == categories.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {category.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {category.type}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => {setCurrentCategory({id: category.id, name: category.name, idParent: category.idType}); setAction("update"); setOpenModalCategory(true)}}>Update</button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => {setOpenModalDeleteCategory(!openModalDeleteCategory); setDeleteLink("/api/subtype/" + category.id)}} className="hover:text-boxdark-2 hover:font-bold">Delete</button>
                                        </td>
                                    </tr>
                                                            
                                ))}
                            </tbody>
                        </table>
                        <Modal onDeleted={onDeleteCategory} deleteLink={deleteLink} isOpen={openModalDeleteCategory} onClose={() => setOpenModalDeleteCategory(false)}></Modal>
                        <ModalChild parent={"type"} isOpen={openModalCategory} onClose={(category) => {setOpenModalCategory(false); if (category) updateOrInsertCategory(category)}} action={action} childData={currentCategory} listParent={types} name={"sub type"}></ModalChild>
                    </div>
                    {/* table of product for each categories */}
                    <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <div className="flex justify-between mx-4">
                            <h3 className="font-bold text-md">Products Of Category</h3>
                            <button className="dark:bg-bodydark dark:text-black-2 text-black bg-white rounded-md px-3 py-2 shadow-md" onClick={() => {setCurrentSTP({id: null, idParent1: categories[0].id, idParent2: products[0].id}); setAction("create"); setOpenModalSTP(true)}}>Add Product for Category</button>
                        </div>
                        <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 font-medium">#</th>
                                    <th scope="col" className="px-6 py-3 font-medium">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium">
                                        Product
                                    </th>
                                    <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subTypeProducts.map((stp, index) => (
                                    <tr key={stp.id} className={`bg-white ${index == subTypeProducts.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {stp.subType}
                                        </th>
                                        <td className="px-6 py-4">
                                            {stp.product.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="hover:text-boxdark-2 hover:font-bold" onClick={() => {setCurrentSTP({id: stp.id, idParent1: stp.idSubType, idParent2: stp.idProduct}); setAction("update"); setOpenModalSTP(true)}}>Update</button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => {setOpenModalDeleteSTP(!openModalDeleteSTP); setDeleteLink("/api/subtypeproduct/" + stp.id)}} className="hover:text-boxdark-2 hover:font-bold">Delete</button>
                                        </td>
                                    </tr>
                                                            
                                ))}
                            </tbody>
                        </table>
                        <Modal onDeleted={onDeleteSTP} deleteLink={deleteLink} isOpen={openModalDeleteSTP} onClose={() => setOpenModalDeleteSTP(false)}></Modal>
                        <ModalManyToMany parent1={"category"} parent2={"product"} isOpen={openModalSTP} onClose={(stp) => {setOpenModalSTP(false); if (stp) updateOrInsertSubTypeProduct(stp)}} action={action} childData={currentSTP} listParent1={categories} listParent2={products} name={"sub type product"}></ModalManyToMany>
                    </div>
                </div>
            ) : (
                <div className="flex-center mt-2" role="status">
                    <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            )}
        </div>
        
        
    )
}

export default MenuPage


