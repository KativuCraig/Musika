const Advert = require('../Models/Advert');
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/config')
const multer = require('multer')
const path = require('path')
//Storage for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
//Create a new Advert
exports.createAdvert = async (req, res) => {
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
        //Error handling on image upload
        await new Promise((resolve, reject) => {
            upload.single('image')(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    reject(new Error('File upload error'))
                } else if (err) {
                    reject(err)
                }
                resolve();
            })
        })
        if (!req.file) {
            return res.status(400).json({ error: 'Image upload failed' })
        }
        const { productName, category, price, advertiserContact } = req.body;
        const advert = new Advert({ image: req.file.path, productName, category, price, advertiserContact, user: userId });
        await advert.save();
        res.status(200).json({ message: 'Advert Created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
};

//Get all Approved Adverts


const fs = require('fs')
exports.getAllApprovedAdverts = async (req, res) => {

    try {
        let adverts = await Advert.find({ approved: true })
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
}

// Get all Adverts by Category
exports.getAdvertsByCategory = async (req, res) => {
    const category = req.params.category;

    try {
        let adverts = await Advert.find({ category: category, approved: true })
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


exports.searchAdverts = async (req, res) =>{
    const searchQuery = req.query.productName;



 try {
        let adverts = await Advert.find({ productName: {$regex: searchQuery }})
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
}