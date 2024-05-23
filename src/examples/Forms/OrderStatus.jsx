import React, { useState } from 'react';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import MDSelect from '../../components/MDSelect/MDSelect';
import MDButton from '../../components/MDButton';
import OrderService from '../../services/order-service.js';

function OrderStatusForm({ onClose, orderId }) {
    const [orderStatus, setOrderStatus] = useState('');

    // Available order statuses
    const availableStatus = ['Processing', 'Shipped', 'Delivered', 'Cancel'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the new order object with updated status
        const updatedOrder = {
            status: orderStatus,
        };

        try {
            // Update the order status using OrderService
            const response = await OrderService.updateStatus(orderId, updatedOrder);
            console.log('Order status updated successfully:', response);

            // Close the form
            onClose();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <MDBox p={2}>
                <MDBox mb={2}>
                    <MDSelect
                        label="Select Status"
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        options={availableStatus}
                        required
                    />
                </MDBox>

                <MDButton variant="gradient" color="info" type="submit">
                    Update
                </MDButton>
            </MDBox>
        </form>
    );
}

export default OrderStatusForm;
