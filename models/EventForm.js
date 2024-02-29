import mongoose from 'mongoose';

const eventFormSchema = new mongoose.Schema({
    eventName:String,
    fullname: String,
    email: String,
    branch: String,
    phone: String,
    year: String,
    gender: String,
    college: String,
    imageUrl: String,
}, {
    timestamps: true // This option adds createdAt and updatedAt fields to your schema
});
mongoose.models = {}
const EventForm = mongoose.model('EventForm', eventFormSchema);

export default EventForm;
