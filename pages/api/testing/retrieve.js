// pages/api/get-all-events.js
import connectToMongo from '@/middleware/middleware';
import MerchandiseForm from '@/models/MerchandiseForm';

const getAllEventsHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const tshirtbData = [
        {
          "_id": "65d6b95a0bf3611fa23b8281",
          "size": "L",
          "couponCode": "",
          "nameOnTshirt": "Akki",
          "tshirtVariant": "boy print"
        },
        {
          "_id": "65d731b1f332d3e57441ad02",
          "size": "M",
          "couponCode": "KJHDBN04",
          "nameOnTshirt": "Pradum",
          "tshirtVariant": "boy print"
        },
        {
          "_id": "65d737f5d24ad01d010860ac",
          "size": "L",
          "couponCode": "",
          "nameOnTshirt": "UTKARSH",
          "tshirtVariant": "boy print"
        },
        {
          "_id": "65d758e9816c9044616e0832",
          "size": "M",
          "couponCode": "JHYTFR17",
          "nameOnTshirt": "Prakhar",
          "tshirtVariant": "boy print"
        },
        {
          "_id": "65d78f52751b1ecbfb935546",
          "size": "L",
          "couponCode": "",
          "nameOnTshirt": "AYUSH",
          "tshirtVariant": "boy print"
        },
        {
          "_id": "65d791c85530274cfc80dee1",
          "size": "XXL",
          "couponCode": "",
          "nameOnTshirt": "SURYANSH",
          "tshirtVariant": "boy print"
        },
        {
          "_id": "65d8ac7c694977925ddb25ef",
          "size": "L",
          "couponCode": "",
          "nameOnTshirt": "ANANT",
          "tshirtVariant": "boy print"
        }
        // Add more tshirtb items as needed
      ];

      // Update records based on tshirtbData
      for (const data of tshirtbData) {
        const event = await MerchandiseForm.findByIdAndUpdate(data._id, {
          size: data.size,
          couponCode: data.couponCode,
          nameOnTshirt: data.nameOnTshirt,
          tshirtVariant: data.tshirtVariant,
        });
        if (!event) {
          console.error(`Event with ID ${data._id} not found.`);
        }
      }

      // Fetch all events after updates
      const events = await MerchandiseForm.find({});

      res.status(200).json({ success: true, events });
    } catch (error) {
      console.error('Error updating events:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};

export default connectToMongo(getAllEventsHandler);
