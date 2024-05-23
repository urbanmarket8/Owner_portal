// @mui material components
import Icon from "@mui/material/Icon";
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import MDBadge from "components/MDBadge";
import OrderService from "services/order-service";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";

export default function data() {
  const [orders, setOrder] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await OrderService.getAll();
      setOrder(response?.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusToColorAndValue = {
    Processing: { color: "warning", value: 25 },
    Shipped: { color: "info", value: 50 },
    Delivered: { color: "success", value: 100 },
    Cancel: { color: "error", value: 0 },
  };

  const getStatusColorAndValue = (status) => {
    return statusToColorAndValue[status] || { color: "default", value: 0 };
  };


  const Order = ({ image, name, orderId }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="lg" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">OrderId# {orderId}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const handleOpenUpdateOrderModal = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseUpdateOrderModal = () => {
    setSelectedOrderId(null);
    fetchOrders();
  };

  const handlePrintOrder = (orderId) => {
    const order = orders.find(a => a._id === orderId);
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`<html><head><title>Print Order</title></head><body>`);
    printWindow.document.write(`<h1>Order Details VTBazaar</h1>`);
    printWindow.document.write(`<p>Order ID: ${order._id}</p>`);
    printWindow.document.write(`<p>Customer Name: ${order.customer.username}</p>`);
    printWindow.document.write(`<p>Total Price: ${order.totalPrice}</p>`);
    printWindow.document.write(`<h3>Products:</h3>`);
    order.items.forEach(item => {
      printWindow.document.write(`<p>${item.productName} (Quantity: ${item.quantity})</p>`);
    });
    printWindow.document.write(`</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return {
    columns: [
      { Header: "order", accessor: "order", align: "left" },
      { Header: "Products", accessor: "products", align: "left" },
      { Header: "Customer Info", accessor: "customerInfo", align: "left" },
      { Header: "totalPrice", accessor: "totalPrice", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      {
        Header: "action",
        accessor: "action",
        align: "center",
        Cell: ({ row }) => (
          <MDBox>
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
              onClick={() => {
                handleOpenUpdateOrderModal(row.original.order.props.orderId)
              }}
            >
              Edit
            </MDTypography>
          </MDBox>
        ),
      },
      {
        Header: "print",
        accessor: "print",
        align: "center",
        Cell: ({ row }) => (
          <MDBox>
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
              onClick={() => {
                handlePrintOrder(row.original.order.props.orderId)
              }}
            >
              Print
            </MDTypography>
          </MDBox>
        ),
      },
    ],

    rows: orders.map((order) => ({
      order: <Order image={LogoAsana} name={order.customer.username} orderId={order._id} />,
      products: order.items.map(item =>
        // Assuming you somehow resolve `productName` for each item.product
        `${item.productName} (x${item.quantity})`
      ).join(", "),
      customerInfo: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {"Name : " + order.customerInfo.name} <br></br>
          {"Phone : " + order.customerInfo.phone}<br></br>
          {"Email : " + order.customerInfo.email}<br></br>
          {"Method : " + order.customerInfo.paymentMethod}<br></br>
          {"Address : " + order.customerInfo.address}<br></br>
        </MDTypography>
      ),
      totalPrice: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {order.totalPrice}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={order.status} color={getStatusColorAndValue(order.status).color} variant="gradient" size="sm" />
        </MDBox>
      ),
      completion: <Progress color="info" value={getStatusColorAndValue(order.status).value} />,
      action: (
        <MDBox>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => {
              handleOpenUpdateOrderModal(order._id)
            }}
          >
            Edit
          </MDTypography>
        </MDBox>
      ),
      print: (
        <MDBox>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => {
              handlePrintOrder(order._id)
            }}
          >
            Print
          </MDTypography>
        </MDBox>
      ),
    })),
    selectedOrderId,
    onCloseUpdateOrderModal: handleCloseUpdateOrderModal,
  };
}