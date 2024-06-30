import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext"

export default function SignOutButton(){
    const queryClient = useQueryClient()
    const {showToast} = useAppContext()

    const mutation = useMutation(apiClient.SignOut,{
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({message: "Signed out", type: "SUCCESS"})
        },
        onError: (error:Error)=>{
            showToast({message: error.message, type: "ERROR"})
        }
    })

    const handleClick = () =>{
        mutation.mutate()
    }

    return (
        <button onClick={handleClick}
            className="text-blue-600 px-3 hover:bg-gray-100 bg-white font-bold"
        >
            Sign Out
        </button>
    )
}