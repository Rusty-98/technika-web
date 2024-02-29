// api/add-couponcodes.js
import connectToMongo from '@/middleware/middleware';
import CouponCode from '@/models/CouponCode';

const handler = async (req, res) => {
  try {
    const couponCodes = [
      'NJNCJK48', 'PPINNL87', 'TKYVIU49',
      'GWLIJI76', 'CLSUUW63', 'SUXYQG00',
      'VCAYBM65', 'HJYPVX04', 'RNRBQY98',
      'ZUDIIL10', 'UVTKVB61', 'ESJHBN48',
      'SVEKYB21', 'OCQJGK98', 'XBOMNF32',
      'HUXTHJ18', 'SHMEWA98', 'ZZXHPD72',
      'MEIEQQ23', 'ZUXJEB74', 'KZHMED97',
      'ADNFLT74', 'BASNTV38', 'CVAYKN78',
      'SUJSLR05', 'IJQQTK50', 'UYZJNJ79',
      'MOONHR80', 'SPSSDX42', 'ZACRJG34',
      'VKVWPS75', 'TNFVAU85', 'DIURHN70',
      'AOSHCT62', 'PNRYWM88', 'KKMNDG88',
      'ALMRMQ05', 'BAXARG00', 'VKSCCD21',
      'JUJMOR56'
    ];

    // Add coupon codes to the database
    const addedCouponCodes = await CouponCode.insertMany(
      couponCodes.map(code => ({ coupon_code: code, name: 'OFFER33', hasApplied: false }))
    );

    res.status(201).json({ success: true, message: 'Coupon codes added successfully', addedCouponCodes });
  } catch (error) {
    console.error('Error adding coupon codes:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export default connectToMongo(handler);
