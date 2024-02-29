// pages/api/get-all-events.js
import connectToMongo from '../../middleware/middleware';
import MerchandiseForm from '@/models/MerchandiseForm';

const getAllEventsHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Assuming 'timestamp' is the field representing the timestamp
      const events = await MerchandiseForm.find({})
        .sort({ createdAt: -1 }); // Sort by the createdAt field in descending order

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
