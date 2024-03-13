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
    
    teamMem: String,
    phone_team1: String,
    phone_team2: String,
    phone_team3: String,
    phone_team4: String,
    name_team1: String,
    name_team2: String,
    name_team3: String,
    name_team4: String, // Corrected field name from phone_team4 to name_team4
    branch_team1: String,
    branch_team2: String,
    branch_team3: String,
    branch_team4: String,
    team_name: String,
}, {
    timestamps: true // This option adds createdAt and updatedAt fields to your schema
});
mongoose.models = {}
const EventForm = mongoose.model('EventForm', eventFormSchema);

export default EventForm;
