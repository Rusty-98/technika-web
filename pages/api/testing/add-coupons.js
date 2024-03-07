// api/add-couponcodes.js
import connectToMongo from '@/middleware/middleware';
import CouponCode from '@/models/CouponCode';

const handler = async (req, res) => {
  try {
    const couponCodes = []

    // Add coupon codes to the database
    const addedCouponCodes = await CouponCode.insertMany(
      couponCodes.map(code => ({ coupon_code: code, name: 'OFFER30', hasApplied: false }))
    );

    res.status(201).json({ success: true, message: 'Coupon codes added successfully', addedCouponCodes });
  } catch (error) {
    console.error('Error adding coupon codes:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export default connectToMongo(handler);
