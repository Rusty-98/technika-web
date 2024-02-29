// pages/api/delete-event/[id].js
import connectToMongo from "../../../middleware/middleware";
import mongoose from 'mongoose';
import Event from "../../../models/Event";

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    const eventId = req.query.id;

    try {
      // Ensure eventId is a valid ObjectId
      const isValidObjectId = mongoose.Types.ObjectId.isValid(eventId);
      
      if (!isValidObjectId) {
        return res.status(400).json({ error: 'Invalid ObjectID' });
      }

      // Fetch the event by ID
      const eventToDelete = await Event.findById(eventId);

      // Check if the event exists
      if (!eventToDelete) {
        return res.status(404).json({ error: 'Event not found' });
      }

      // Delete the event
      await eventToDelete.deleteOne();

      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default connectToMongo(handler);
