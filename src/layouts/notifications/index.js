import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import NotificationService from '../../services/notification-service.js';

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await NotificationService.getAll();
      setNotifications(response);
    } catch (error) {
      console.error('Fetch Notifications Error:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);


  const renderNotifications = () => {
    return notifications.map((notification, index) => (
      <MDAlert key={index} color={notification.color} dismissible>
        {alertContent(notification.userName + " " + notification.message)}
      </MDAlert>
    ));
  };

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      {name}
    </MDTypography>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Notification</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                {renderNotifications()}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
