import connectToMongo from '../../../middleware/middleware';
import mongoose from 'mongoose'; // Import mongoose
import Event from '@/models/Event';

const getEventInfoByIdHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const eventId = req.query.eventname;
      const isValidObjectId = mongoose.Types.ObjectId.isValid(eventId);
      console.log('Event ID:', eventId);
      console.log('isValidObjectId:', isValidObjectId);
      
      if (!isValidObjectId) {
        // If the provided ID is not a valid ObjectId, return a 404 error
        return res.status(404).json({ success: false, error: 'Event not found' });
      }

      const event = await Event.findById(eventId);

      if (event) {
        res.status(200).json({ success: true, event });
      } else {
        res.status(404).json({ success: false, error: 'Event not found' });
      }
    } catch (error) {
      console.error('Error fetching event info by ID:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default connectToMongo(getEventInfoByIdHandler);
