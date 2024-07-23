import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { hotelFacilities } from "../../config/hotel-options-config"

export default function FacilitiesSection() {
    const { register, formState: {errors}} = useFormContext<HotelFormData>()
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-3">
                {hotelFacilities.map((facility,index)=>(
                    <label key={index} className="flex  gap-1 text-sm">
                        <input type="checkbox" value={facility} {...register('facilities',{
                            validate: (facilities)=>{
                                if (facilities && facilities.length>0) {
                                    return true
                                } else {
                                    return "Atleast one facility must be selected"
                                }
                            }
                        })} />
                        <span>{facility}</span>
                    </label>
                ))}
            </div>
            {errors.facilities && <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>}
        </div>
    )
}