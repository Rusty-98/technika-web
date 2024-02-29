import mongoose from 'mongoose';

const merchandiseformSchema = new mongoose.Schema({
    item: String,
    price: Number,
    fullname: String,
    email: String,
    branch: String,
    phone: String,
    year: String,
    gender: String,
    college: String,
    imageUrl: String,
    size: String,
    nameOnTshirt: String,
    couponCode: String,
    tshirtVariant: String,
    deliveredSuccessfully: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true 
});

mongoose.models = {}
const MerchandiseForm = mongoose.model('MerchandiseForm', merchandiseformSchema);

export default MerchandiseForm;
