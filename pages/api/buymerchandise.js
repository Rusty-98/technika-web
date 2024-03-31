import connectToMongo from '@/middleware/middleware';
import MerchandiseForm from '@/models/MerchandiseForm';
// import nodemailer from 'nodemailer';
import CouponCode from '@/models/CouponCode';

const handler = async (req, res) => {
    try {
        const updatedFormData = req.body;

        // Save form data to MongoDB
        await MerchandiseForm.create(updatedFormData);

        if (updatedFormData.couponCode) {
            // Find the coupon in MongoDB based on the coupon code
            const coupon = await CouponCode.findOne({ coupon_code: updatedFormData.couponCode });
        
            if (coupon) {
                // If coupon exists, update its hasApplied property
                await CouponCode.findByIdAndUpdate(coupon._id, { hasApplied: true });
            } else {
                console.error('Coupon not found for code:', updatedFormData.couponCode);
                // Handle the case where the coupon is not found (log an error, or take appropriate action)
            }
        }
        
        
        // Send confirmation email
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         // user: process.env.MAIL_USER,
        //         // pass: process.env.MAIL_PASS,
        //         user: "technicalsubcouncil@hbtu.ac.in",
        //         pass: "yjfpgeifuqtzsvia",
        //     },
        // });
        // const mailOptions = {
        //     // from: process.env.MAIL_USER,
        //     from: "technicalsubcouncil@hbtu.ac.in",
        //     to: updatedFormData.email, 
        //     subject: 'Confirmation of Purchase for TECHNIKA Merchandise',
        //     text: `We are delighted to inform you that your recent purchase of merchandise from the Technical Sub-Council has been successfully registered. Thank you for choosing our products. We truly appreciate your support and are committed to providing you with high-quality products.\n\nWe will verify your payment and reach out to you within 48 hours to deliver your merchandise to you. ✨✨\n\nBest regards,\nTechnical Sub-Council\nHBTU, Kanpur`,
        // };

        // await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Ordered successfully' });
    } catch (error) {
        console.error('Error submitting form:', error.message);

        // Check if the error is related to MongoDB
        if (error.name === 'MongoError') {
            res.status(500).json({ success: false, error: 'Error saving to the database' });
        } else {
            // Handle other errors (e.g., email sending)
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
};

export default connectToMongo(handler);
