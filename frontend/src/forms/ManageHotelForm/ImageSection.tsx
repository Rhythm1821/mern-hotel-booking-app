import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function ImageSection() {
    const { register, formState: { errors }, watch, setValue} = useFormContext<HotelFormData>()

    const existingImageUrls = watch('imageUrls')

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,imageUrl:string) => {
        e.preventDefault()
        setValue("imageUrls", existingImageUrls.filter((url)=>url!==imageUrl))
    }

    return (
        <div>
            <h2>Image Files</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url,index) => (
                            <div key={index} className="relative group">
                                <img key={url} src={url} className="min-h-full object-cover" alt="" />
                                <button onClick={(e)=>handleDelete(e,url)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">Delete</button>
                            </div>
                        ))}
                    </div>
                )}
                <input type="file" 
                    accept="image/*"
                    multiple 
                    className="text-gray-700 w-full font-normal"
                    {...register('imageFiles',{
                    validate: (imageFiles)=>{
                        const totalLength = imageFiles.length + (existingImageUrls?.length || 0)

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