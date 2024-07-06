import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function ImageSection() {
    const { register, formState: { errors }} = useFormContext<HotelFormData>()

    return (
        <div>
            <h2>Image Files</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                <input type="file" 
                    accept="image/*"
                    multiple 
                    className="text-gray-700 w-full font-normal"
                    {...register('imageFiles',{
                    validate: (imageFiles)=>{
                        const totalLength = imageFiles.length

                        if (totalLength===0) {
                            return "Atleast one image must be selected"
                        }

                        if (totalLength>6) {
                            return "Max 6 images allowed"
                        }

                        return true
                    }
                })} />
            </div>
            {errors.imageFiles?.message && <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>}
        </div>
    )
}