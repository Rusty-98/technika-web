// pages/api/add-event.js
import connectToMongo from '../../middleware/middleware';
import Event from '../../models/Event';

const addEventHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { name, category, date, timeFrom, timeTo, venue } = req.body;

      const event = new Event({
        name,
        category,
        date,
        timeFrom,
        timeTo,
        venue,
      });

      await event.save();

      res.status(201).json({ success: true, event });
    } catch (error) {
      console.error('Error adding event:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default connectToMongo(addEventHandler);
