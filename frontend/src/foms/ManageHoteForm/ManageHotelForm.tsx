import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"

export type HotelFormData = {
    name: string,
    city: string,
    country: string,
    description: string,
    type: string,
    pricePerNight: number,
    starRating: number,
    facilities: string[],
    imageFiles: FileList,
    adultCount: number,
    childCount: number,
}

export default function ManageHoteForm() {
    const formMethods = useForm<HotelFormData>()
    return (
        <FormProvider {...formMethods}>
            <form action="">
                <DetailsSection />
            </form>
        </FormProvider>
    )
}