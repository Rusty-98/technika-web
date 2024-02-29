// pages/api/get-team.js
import connectToMongo from '../../middleware/middleware';
import TeamMember from '@/models/TeamMember';

const getEventsHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const TeamMembers = await TeamMember.find({});
      res.status(200).json({ success: true, TeamMembers });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default connectToMongo(getEventsHandler);
