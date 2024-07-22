import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import ManageHoteForm from "../foms/ManageHoteForm/ManageHotelForm"

export default function EditHotel(){
    const { hotelId } = useParams()

    const { data: hotel } = useQuery("getHotel", 
                                    () => apiClient.getHotel(hotelId || ""), 
                                    {enabled: !!hotelId})

    return <ManageHoteForm hotel={hotel} />
}