import { useMapsLibrary } from "@vis.gl/react-google-maps"
import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { OrderContext } from "./OrderProvider";
const SearchLocation = ({error}) => {
    const placesLibrary = useMapsLibrary("places")
    const geoLibrary = useMapsLibrary("geocoding")
    const [service, setService] = useState(null)
    const [geoService, setGeoService] = useState(null)
    const distanceMatrixService = new google.maps.DistanceMatrixService()
    const [results, setResults] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [errorAddress, setErrorAddress] = useState("")
    const positionRes = {"lat":47.7084394664091,"lng":-122.3227907590838}
    const [saved, setSaved] = useState(false)
    useEffect(() => {
        if (placesLibrary) setService(new placesLibrary.AutocompleteService())
        return () => setService(null)
    }, [placesLibrary])

    useEffect(() => {
        if (geoLibrary) setGeoService(new geoLibrary.Geocoder())
        return () => setGeoService(null)
    }, [geoLibrary])

    const updateResults = inputValue => {
        if (!service || inputValue.length === 0) {
        setResults([])
        return
        }
        const request = { input: inputValue }
        service.getQueryPredictions(request, res => {
            setResults(res)
        })
    }

    const onInputChange = ev => {
        const value = ev.target.value
        setInputValue(value)
        updateResults(value)
    }

    const handleSelectedPlace = place => {
        setInputValue(place.description)
        geoService.geocode({ placeId: place.place_id }, (res, status) => {
            distanceMatrixService.getDistanceMatrix(
                {
                    origins: [positionRes],
                    destinations: [res[0].geometry.location],
                    travelMode: "DRIVING",
                },
                (res, status) => {
                    if (res.rows[0].elements[0].distance?.value > 50000) {
                        setErrorAddress("Sorry, we do not deliver to this location. Please select a location within 50km from our restaurant.")
                    }
                    else {
                        setErrorAddress("")
                    }
                }
            )
        })
        setResults([])
    }

    const {orderDetails, updateOrderDetails} = useContext(OrderContext)

    useEffect(() => {
        if (error) {
            setErrorAddress("Please enter your address.")
        }
    }, [error])
    
    const saveAddress = () => {
        if (inputValue == "" || errorAddress != "") {
            setErrorAddress("Please enter your address.")
            return
        }
        updateOrderDetails({
            ...orderDetails,
            address: inputValue
        })
        setSaved(true)
        setTimeout(() => {
            setSaved(false)
        }, 5000)
        setErrorAddress("")
    }
    return (
        <div className="">
            <div className="autocomplete-container relative">
                <input value={inputValue} onChange={onInputChange} type="text" className=" w-full border-b-2 rounded-none focus:border-primary-color outline-none p-1" placeholder="Enter location"></input>
                {results && results.length > 0 && (
                    <ul className="bg-bodydark1 shadow-md rounded-md absolute w-full">
                    {results.map(place => (
                        <li
                        className="cursor-pointer flex gap-2 items-center whitespace-nowrap p-2 hover:bg-slate-100 overflow-hidden"
                        key={place.place_id}
                        onClick={() => handleSelectedPlace(place)}
                        >
                        <Image src={"/images/icon/location.svg"} width={30} height={30}></Image>
                        {place.description}
                        </li>
                    ))}
                    </ul>
                )}
                <br></br>
                {errorAddress != "" && (
                <i className="text-red">{errorAddress}</i>)}
                <br></br>
                <button onClick={saveAddress} className="bg-primary-color rounded-full text-sm px-6 py-2 text-white font-semibold mt-4">Save</button> 
                {saved && <i className="text-black mx-2">Saved</i>}
            </div>
            
        </div>
    )
}

export default SearchLocation;