// api/update-price-field.js
import connectToMongo from '@/middleware/middleware';
import MerchandiseForm from '@/models/MerchandiseForm';

const itemDetails = {
    diary: {
      item: 'diary',
      price: 49,
    },
    keychain: {
      item: 'keychain',
      price: 39,
    },
    coffeemug: {
      item: 'coffeemug',
      price: 129,
    },
    pen: {
      item: 'pen',
      price: 12,
    },
    combo: {
      item: 'combo',
      price: 199,
    },
    tshirtb: {
      item: 'tshirtb',
      price: 499,
    },
    tshirtg: {
      item: 'tshirtg',
      price: 499,
    },
  };
  

const handler = async (req, res) => {
  try {
    // Fetch existing data from the database
    const existingData = await MerchandiseForm.find();

    // Update each record with the new "price" field
    const updatedData = existingData.map((record) => {
      const { item, couponCode } = record;
      const itemDetail = itemDetails[item];

      // Set price to 359.4 if couponCode is present, otherwise use the price from itemDetails
      const price = couponCode ? 359.4 : itemDetail.price;

      // Create an object with only the required fields for the updated model
      const updatedRecord = {
        item,
        fullname: record.fullname,
        email: record.email,
        branch: record.branch,
        phone: record.phone,
        year: record.year,
        gender: record.gender,
        college: record.college,
        imageUrl: record.imageUrl,
        price, // Newly added "price" field
      };

      return updatedRecord;
    });

    // Update the records in the database
    await MerchandiseForm.deleteMany({}); // Delete existing records
    await MerchandiseForm.insertMany(updatedData); // Insert updated records

    res.status(201).json({ success: true, message: 'Price field added and records updated successfully', updatedData });
  } catch (error) {
    console.error('Error updating price field:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export default connectToMongo(handler);
