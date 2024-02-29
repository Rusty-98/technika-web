// api/validate-couponcode.js
import connectToMongo from '@/middleware/middleware';
import CouponCode from '@/models/CouponCode';

const handler = async (req, res) => {
  try {
    const { couponCode } = req.body;

    // Check if the coupon code exists in the database
    const existingCoupon = await CouponCode.findOne({ coupon_code: couponCode });

    if (!existingCoupon) {
      return res.status(400).json({ success: false, message: 'Invalid coupon code' });
    }

    // Check if the coupon code has already been applied
    if (existingCoupon.hasApplied) {
      return res.status(400).json({ success: false, message: 'Coupon code has already been applied' });
    }
    let name = 'OFFER40'

    if (existingCoupon.name) {
      name = existingCoupon.name
    }
    console.log(name)
    res.status(200).json({ success: true, message: 'Coupon code applied successfully', name: name });
  } catch (error) {
    console.error('Error validating coupon code:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export default connectToMongo(handler);
