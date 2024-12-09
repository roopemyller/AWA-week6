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
        res.send("Server error uploading offer")
    }
})

router.get('/offers', async (req, res) => {
    try {
        const offers = await Offer.find()
        const offersWithImages = await Promise.all(offers.map(async (offer) => {
            if (offer.imageId){
                const image = await Image.findById(offer.imageId)
                return {
                    ...offer.toObject(),
                    imageUrl: image ? image.path : null,
                }
            }
            return {...offer.toObject(), imageUrl: null}
        }))
        res.status(200).json(offersWithImages)
    } catch (error) {
        console.error(error)
        res.send("Server erro fetching offers")
    }
})

export default router