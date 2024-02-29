// models/Event.js
import mongoose from 'mongoose';

const eventDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  timeFrom: {
    type: String,
    required: true,
  },
  timeTo: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  guidelines: {
    type: [String],
    default:[],
    required: true,
  },
});
mongoose.models = {}
const EventDetails = mongoose.model('EventDetails', eventDetailSchema);

export default EventDetails;
