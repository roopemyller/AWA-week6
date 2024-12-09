"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("./models/Offer");
const router = (0, express_1.Router)();
router.post('/add', async (req, res) => {
    const { title, description, price } = req.body;
    console.log("Received: ", req.body);
    try {
        let newOffer = new Offer_1.Offer({ title, description, price });
        await newOffer.save();
        res.status(201).send(`New offer saved successfully`);
    }
    catch (err) {
        console.error(err);
        res.send("Server error");
    }
});
exports.default = router;
