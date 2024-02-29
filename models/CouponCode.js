// models/CouponCode.js
import mongoose from 'mongoose';

const couponCodeSchema = new mongoose.Schema({
  coupon_code: {
    type: String,
    required: true,
    unique: true,
  },
  hasApplied: {
    type: Boolean,
    default: false,
  },
  name:{
    type:String,
    default:'OFFER40'
  }
});



mongoose.models = {}
const CouponCode = mongoose.model('CouponCode', couponCodeSchema);

export default CouponCode;
