// pages/api/get-event-info/[name].js
import connectToMongo from '@//middleware/middleware';
import Event from '@/models/Event';

const getEventInfoHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { name } = req.query;

      if (!name) {
        return res.status(400).json({ success: false, error: 'Name parameter is required' });
      }

      const event = await Event.findOne({ name });

      if (!event) {
        return res.status(404).json({ success: false, error: 'Event not found' });
      }

      res.status(200).json({ success: true, event });
    } catch (error) {
      console.error('Error fetching event info:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default connectToMongo(getEventInfoHandler);
