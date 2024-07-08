import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

export default function MyHotels(){
    const { data: hotelData } = useQuery("fetchMyHotels", apiClient.getMyHotels, {
        onError: () => {

        }
    })

    if (!hotelData) {
        return <span>No Hotels Found</span>
    }

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link className="flex text-white text-xl p-2 hover:bg-blue-500 bg-blue-600" to="/add-hotel">Add Hotel</Link>
            </span>

            <div className="grid grid-cols-1 gap-8">
                {
                    hotelData.map((hotel)=>{
                        return (
                            <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                                <div className="whitespace-pre-line">{hotel.description}</div>
                                <div className="grid grid-cols-5 gap-2">
                                    <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                        <BsMap className="mr-2" />
                                        {hotel.city}, {hotel.country}
                                    </div>
                                    <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                        <BsBuilding className="mr-2" />
                                        {hotel.type}
                                    </div>
                                    <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                        <BiMoney className="mr-2" />
                                        ₹{hotel.pricePerNight} per night
                                    </div>
                                    <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                        <BiHotel className="mr-2" />
                                        {hotel.adultCount} adult, {hotel.childCount} child
                                    </div>
                                    <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                        <BiStar className="mr-2" />
                                        {hotel.starRating} Star rating
                                    </div>
                                </div>
                                <span className="flex justify-end ">
                                    <Link className="flex text-white text-xl p-2 hover:bg-blue-500 bg-blue-600" to={`/edit-hotel/${hotel._id}`}>View Details</Link>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}