const User = require('../Models/User')
const jwtSecret = require('../config/config')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const Advert = require('../Models/Advert')



exports.getProfile = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    let userId
    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        console.log(decodedToken);
        userId = decodedToken.id
        console.log(userId)
    } catch (error) {
        return res.status(401).json({ error: 'Not authorized' })
    }

    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

}


exports.updateProfile = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    let userId;
    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        userId = decodedToken.id;

    } catch (error) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteProfile = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    let userId
    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        userId = decodedToken.id;


    } catch (error) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User successfully deleted!' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

//Get all Adverts by User
exports.getAdvertsByUser = async (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    let userId
    try {
        const decodedToken = jwt.verify(token, jwtSecret);
        userId = decodedToken.id
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    try {
        let adverts = await Advert.find({ user: userId })
        //convert image paths to base64
        adverts = adverts.map(advert => {
            const imagePath = Buffer.from(advert.image, 'base64')
            const imageBuffer = fs.readFileSync(imagePath)
            const imageBase64 = imageBuffer.toString('base64')

            //replace the image with the base64 data
            return { ...advert._doc, image: imageBase64 }
        })
        res.status(200).json(adverts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};