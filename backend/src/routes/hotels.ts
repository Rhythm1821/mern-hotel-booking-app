import express, {Request, Response} from "express"
import {Hotel} from "../models/hotel"
import { addAbortListener } from "events"
import { HotelSearchRespone } from "../shared/types"

const router = express.Router()

// api/hotels/?search
router.get('/search',async (req: Request, res:Response) => {
    try {
        const pageSize = 5
        const pageNumber = parseInt(req.query.page ? req.query.page as string : "1")
        const skip = (pageNumber-1)*pageSize
        const hotels = await Hotel.find().skip(skip).limit(pageSize)
        const total = await Hotel.countDocuments()

        const response: HotelSearchRespone = {
            data: hotels,
            pagination: {
                total,
                page:pageNumber,
                pages: Math.ceil(total/pageSize)
            }
        }
        
        return res.json(response)
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({message: "Internal server error"})
    }
})

export default router