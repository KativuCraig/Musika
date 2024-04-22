const mongoose = require('mongoose');

const AdvertSchema = new mongoose.Schema({
    image: {
        type: mongoose.SchemaTypes.Buffer,
        contentType: mongoose.SchemaTypes.String,
        required: true
    },
    productName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    advertiserContact: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    approved: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,

    }
})

const Advert = mongoose.model('Advert', AdvertSchema);
module.exports = Advert;
//to create a new advert use:
//const advert = new Advert ({//other fields, user: req.user._id})
//to fetch advert: const advert = await Adert.findById