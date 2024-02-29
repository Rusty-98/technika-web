// pages/api/edit-events.js
import connectToMongo from '../../middleware/middleware';
import Event from '../../models/Event';

const editEventsHandler = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { events } = req.body;

      await Promise.all(
        events.map(async (event) => {
          const { _id, ...updatedFields } = event;
          await Event.findByIdAndUpdate(_id, updatedFields);
        })
      );

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error editing events:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default connectToMongo(editEventsHandler);
