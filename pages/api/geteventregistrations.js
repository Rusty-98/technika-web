// pages/api/get-all-events.js
import connectToMongo from '../../middleware/middleware';
import EventForm from '@/models/EventForm';

const getAllEventsHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const events = await EventForm.find({});
      res.status(200).json({ success: true, events });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default connectToMongo(getAllEventsHandler);
