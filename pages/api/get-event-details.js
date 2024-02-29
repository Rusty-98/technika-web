// pages/api/get-event-details.js
import connectToMongo from '../../middleware/middleware';
import EventDetails from '@/models/EventDetails';

const getEventDetailsHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { eventname } = req.query;

    try {
      const event = await EventDetails.findOne({ name: eventname });
      if (event) {
        res.status(200).json({ success: true, event });
      } else {
        res.status(404).json({ success: false, error: 'Event not found' });
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default connectToMongo(getEventDetailsHandler);
