                                                                                                                          import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/models/hotel";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const register =async (formData:RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    })

    const responseBody = await response.json()

    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials: "include"
    })

    if (!response.ok){
        throw new Error("Token invalid")
    }

    return response.json()
}

export const SignIn =async (formData:SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json()

    if (!response.ok) {
        throw new Error(body.message)
    }

    return body
}

export const SignOut =async () => {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: "include"
    })

    if (!res.ok) {
        throw new Error("Failed to sign out")
    }
}

export const addHotel = async (hotelFormData: FormData) => {
    const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'POST',
        credentials: "include",
        body: hotelFormData
    })

    if (!res.ok) {
        throw new Error('Failed to add hotel')
    }

    return res.json()
}

export const getMyHotels =async (): Promise<HotelType[]> => {
    const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include"
    })

    if (!res.ok) {
        throw new Error('Failed to fetch hotels')
    }

    return res.json()
}

export const getHotel = async (hotelId: string): Promise<HotelType> => {
    const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include"
    })

    if (!res.ok) {
        throw new Error('Failed to fetch hotel')
    }

    return res.json()
}

export const updateMyHotelById =async (hotelFormData: FormData) => {
    const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, {
        method: 'PUT',
        body: hotelFormData,
        credentials: "include",
    })

    if (!res.ok) {
        throw new Error('Failed to update hotel')
    }

    return res.json()
}