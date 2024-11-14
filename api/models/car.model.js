import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dealer: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    ev: {
        type: Boolean,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Car = mongoose.model('Car', carSchema);

export default Car;


// {
// 	"name":"test",
// 	"description":"test",
// 	"dealer":"test",
// 	"regularPrice":500,
// 	"discountPrice":500,
// 	"bathrooms":5,
// 	"bedrooms":5,
// 	"furnished":true,
// 	"parking":true,
// 	"type":"rent",
// 	"offer":true,
// 	"imageUrls":["hegd","sdgj"],
// 	"userRef": "oweirufvbcnds"
// }