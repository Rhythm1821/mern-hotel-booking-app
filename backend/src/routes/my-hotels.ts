import express, { Request, Response } from "express"
import multer from "multer"
import cloudinary from "cloudinary"
import { Hotel, HotelType } from "../models/hotel"
import verifyToken from "../middlewares/auth"
import { body } from "express-validator"
import dotenv from "dotenv"

dotenv.config()

const router=express.Router()

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// api/my-hotels
router.post('/', verifyToken,[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
], upload.array('imageFiles', 6),async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[] // imageFiles is an array 
        const newHotel: HotelType = req.body

        // upload images to cloudinary
        const uploadPromises = imageFiles.map(async (imageFile)=>{
            const b64 = Buffer.from(imageFile.buffer).toString('base64')
            let dataURI="data:"+imageFile.mimetype+";base64,"+b64   

            const res = await cloudinary.v2.uploader.upload(dataURI)
            return res.url
        })

        // if upload success, add the urls to newHotel
        const urls = await Promise.all(uploadPromises) // wait for all promises to resolve
        newHotel.imageUrls = urls // add urls to newHotel
        newHotel.lastUpdated = new Date()
        newHotel.userId = req.userId

        // save the hotel to db
        const hotel = new Hotel(newHotel)
        await hotel.save()
        
        return res.status(201).json(hotel)
    } catch (error) {
     console.log("error", error);
     res.status(500).json({message: "Internal server error"})
        
    }
})


export default router