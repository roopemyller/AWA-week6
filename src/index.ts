import {Request, Response, Router} from "express"
import { Offer } from "./models/Offer";


const router: Router = Router()

router.post('/add', async (req, res) => {
    const {title, description, price} = req.body
    console.log("Received: ", req.body)
    try {
        let newOffer = new Offer({title, description, price})
        await newOffer.save()
        res.status(201).send(`New offer saved successfully`)    
    }catch (err){
        console.error(err)
        res.send("Server error")
    }
})

export default router