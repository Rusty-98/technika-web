// pages/api/add-eventdetails.js
import connectToMongo from '../../middleware/middleware';
import EventDetails from '@/models/EventDetails';

const addEventDetailsHandler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const eventData = req.body;
            const newEvent = new EventDetails(eventData);
            await newEvent.save();

            res.status(201).json({ success: true, message: 'Event details saved successfully' });
        } catch (error) {
            console.error('Error saving event details:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
};

export default connectToMongo(addEventDetailsHandler);
