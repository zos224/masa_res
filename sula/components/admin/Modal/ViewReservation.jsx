import moment from "moment-timezone"
const ViewReservation = ({isOpen, onClose, data, type}) => {
    return ( isOpen && (
        <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative m-auto mt-20 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-md dark:bg-bodydark">
                    <button onClick={onClose} type="button" className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center text-black">
                        <div className="uppercase font-semibold">
                            {type} Reservation    
                        </div> 
                        <div className="mt-5">
                            <div>
                                <span>Name: </span>
                                <span className="font-semibold">{data.name}</span>
                            </div>
                            <div className="mt-2">
                                <span>Phone: </span>
                                <span className="font-semibold">{data.phone}</span>
                            </div>
                            <div className="mt-2">
                                <span>Email: </span>
                                <span className="font-semibold">{data.email}</span>
                            </div>
                            <div className="mt-2">
                                <span>Number of guests: </span>
                                <span className="font-semibold">{data.numberOfGuests}</span>
                            </div>
                            <div className="mt-2">
                                <span>Date: </span>
                                <span className="font-semibold">{moment(data.dateTime).format('YYYY-MM-DD hh:mm A')}</span>
                            </div>
                            <div className="mt-2">
                                <span>Location: </span>
                                <span className="font-semibold">{data.location}</span>
                            </div>
                            <div className="mt-2">
                                <span>Special Request: </span>
                                <p className="">{data.specialRequest}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
        

    )
}

export default ViewReservation