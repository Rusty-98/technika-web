import connectToMongo from '../../middleware/middleware';
import TeamMember from '../../models/TeamMember';

const addTeamMemberHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { NAME, Department, Position, PhoneNumber, ImageExtension } = req.body;
console.log(NAME, Department, Position, PhoneNumber, ImageExtension )
      // Generate updatedImageUrl based on PhoneNumber and ImageExtension
      const updatedImageUrl = `IMG_${PhoneNumber}.${ImageExtension}`;

      const teamMember = new TeamMember({
        NAME,
        Department,
        Position,
        PhoneNumber,
        updatedImageUrl,
      });

      await teamMember.save();

      res.status(201).json({ success: true, teamMember });
    } catch (error) {
      console.error('Error adding team member:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default connectToMongo(addTeamMemberHandler);
