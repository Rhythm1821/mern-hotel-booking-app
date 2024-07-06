import { useMutation } from "react-query";
import ManageHoteForm from "../foms/ManageHoteForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

export default function AddHotel(){
    const { showToast } = useAppContext()
    const { mutate, isLoading } = useMutation(apiClient.addHotel, {
        onSuccess: () => {
            showToast({message: "Hotel added successfully", type:"SUCCESS"})
        },
        onError: () => {
            showToast({message: "Failed to add hotel", type:"ERROR"})
        }
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }

    return (
        <ManageHoteForm onSave={handleSave} isLoading={isLoading} />
    )
}