import {Request, Response, Router} from "express"
import { Offer, IOffer } from "./models/Offer"
import { Image, IImage } from "./models/Image"
import upload from "./middleware/multer-config"
import { ObjectId } from "mongoose"

const router: Router = Router()

router.post('/upload', upload.single('image'), async (req, res) => {
    const {title, description, price} = req.body
    console.log("Received: ", req.body)

    try {
        let imageId: string | undefined = undefined

        if(req.file){
            const image: IImage = new Image({
                filename: req.file.filename,
                path: `public/images/${req.file.filename}`
            })
            const savedImage: IImage = await image.save()
            imageId = savedImage._id.toString()
        }

        let newOffer: IOffer = new Offer({title, description, price, imageId})
        await newOffer.save()
        res.status(201).send(`New offer saved successfully`)    
    }catch (err){
        console.error(err)
        res.send("Server error")
    }
})

export default router