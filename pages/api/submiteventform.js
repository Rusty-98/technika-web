import connectToMongo from '@/middleware/middleware';
import EventForm from '@/models/EventForm';
// import nodemailer from 'nodemailer';

const handler = async (req, res) => {
    try {
        const updatedFormData = req.body;
        console.log({ updatedFormData });

        // Save form data to MongoDB
        await EventForm.create(updatedFormData);

        // Send confirmation email
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         // user: process.env.MAIL_USER,
        //         // pass: process.env.MAIL_PASS,
        //         user: 'technicalsubcouncil@hbtu.ac.in',
        //         pass: 'yjfpgeifuqtzsvia',
        //     },
        // });

        // const mailOptions = {
        //     from: 'technicalsubcouncil@hbtu.ac.in',
        //     to: updatedFormData.email, // assuming your form has an 'email' field
        //     subject: 'Successful Registration of TechniKa Event',
        //     text: `We are thrilled to inform you that your registration for the upcoming event of Technical Sub-Council has been successfully completed. Your presence at the event is highly appreciated, and we are confident that it will be an enriching experience for you.\n\nIf you have any queries or require further information regarding the event, feel free to contact us.\n\nWe look forward to welcoming you at the event and fostering meaningful connections within our Technical community.\n\nBest Regards,\nTechnical Sub-Council`,
        // };

        // await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Form submitted successfully' });
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
