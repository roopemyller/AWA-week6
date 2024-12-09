"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("./models/Offer");
const Image_1 = require("./models/Image");
const multer_config_1 = __importDefault(require("./middleware/multer-config"));
const router = (0, express_1.Router)();
router.post('/upload', multer_config_1.default.single('image'), async (req, res) => {
    const { title, description, price } = req.body;
    console.log("Received: ", req.body);
    try {
        let imageId = undefined;
        if (req.file) {
            const image = new Image_1.Image({
                filename: req.file.filename,
                path: `public/images/${req.file.filename}`
            });
            const savedImage = await image.save();
            imageId = savedImage._id.toString();
        }
        let newOffer = new Offer_1.Offer({ title, description, price, imageId });
        await newOffer.save();
        res.status(201).send(`New offer saved successfully`);
    }
    catch (err) {
        console.error(err);
        res.send("Server error uploading offer");
    }
});
router.get('/offers', async (req, res) => {
    try {
        const offers = await Offer_1.Offer.find();
        const offersWithImages = await Promise.all(offers.map(async (offer) => {
            if (offer.imageId) {
                const image = await Image_1.Image.findById(offer.imageId);
                return {
                    ...offer.toObject(),
                    imageUrl: image ? image.path.replace('public/', '/') : null,
                };
            }
            return { ...offer.toObject(), imageUrl: null };
        }));
        res.status(200).json(offersWithImages);
    }
    catch (error) {
        console.error(error);
        res.send("Server erro fetching offers");
    }
});
exports.default = router;
