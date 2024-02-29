// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
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
});
mongoose.models = {}
const Event = mongoose.model('Event', eventSchema);

export default Event;
