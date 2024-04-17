"use client";
import Modal from "@/components/admin/Modal/Modal";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import ViewFeedback from "@/components/admin/Modal/ViewFeedback";
const FeedbackPage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [deleteLink, setDeleteLink] = useState('')
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(false)
    const [viewModal, setViewModal] = useState(false)
    const [currentFeedback, setCurrentFeedBack] = useState(-1)
    useEffect(() => {
        const fetchFeedback = async () => {
            const res = await fetch('/api/feedback/all')
            if (res.ok) {
                const data = await res.json()
                setFeedbacks(data)
                setLoading(false)
            }
            else {
                alert("Something went wrong while fetching data!")
            }
        }

        fetchFeedback()
    }, [])

    const onDeleted = (deleted) => {
        if (deleted) {
            const lastSlash = deleteLink.lastIndexOf('/')
            const id = deleteLink.substring(lastSlash+1)
            const newFeedbacks = feedbacks.filter((e) => e.id != id)
            setFeedbacks(newFeedbacks)
        }
    }

    useEffect(() => {
        if (currentFeedback != -1) {
            setViewModal(true)
        }
    }, [currentFeedback])

    const updateFeedbacks = (data) => {
        if (data) {
            let newFeedbacks = feedbacks
            newFeedbacks[currentFeedback] = data
            setFeedbacks(newFeedbacks)
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Feedback Management</h2>
            </div>
            {!loading ? (
                <div className="mt-10 w-full relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-center text-gray-500 dark:text-white">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">#</th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Order Type
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Date
                            </th>
                            <th scope="col" colSpan={2} className="px-6 py-3 font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback, index) => (
                            <tr key={feedback.id} className={`bg-white ${index == feedbacks.length - 1 ? "" : "border-b"} dark:bg-bodydark text-black border-body`}>
                                <td className="px-6 py-4">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {feedback.name}
                                </th>
                                
                                <td className="px-6 py-4 overflow-hidden">
                                    {feedback.orderType}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(feedback.date).format('YYYY-MM-DD')}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => setCurrentFeedBack(index)} className="hover:text-boxdark-2 hover:font-bold">View</button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => {setOpenModal(!openModal); setDeleteLink("/api/feedback/" + reservation.id)}} className="hover:text-boxdark-2 hover:font-bold">Delete</button>
                                </td>
                            </tr>
                                                    
                        ))}
                    </tbody>
                </table>
                <Modal onDeleted={onDeleted} deleteLink={deleteLink} isOpen={openModal} onClose={() => setOpenModal(false)}></Modal>
                <ViewFeedback data={feedbacks[currentFeedback]} isOpen={viewModal} onClose={(data) => {setViewModal(false); setCurrentFeedBack(-1); updateFeedbacks(data)}}></ViewFeedback>
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

export default FeedbackPage


