// pages/api/update-order-status.js
import connectToMongo from '../../middleware/middleware';
import MerchandiseForm from '@/models/MerchandiseForm';

const updateOrderStatusHandler = async (req, res) => {
    if (req.method === 'PUT') {
        try {
            const { orderId, delivered } = req.body;

            // Update the order status in the database
            const updatedOrder = await MerchandiseForm.findByIdAndUpdate(
                orderId,
                { deliveredSuccessfully: delivered },
                { new: true }
            );

            if (!updatedOrder) {
                console.error('Order not found for ID:', orderId);
                return res.status(404).json({ success: false, error: 'Order not found' });
            }

            console.log('Order status updated successfully:');

            res.status(200).json({ success: true, data: updatedOrder });
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        console.error('Invalid method:', req.method);
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
};

export default connectToMongo(updateOrderStatusHandler);
