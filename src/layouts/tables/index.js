// Import other necessary components and data
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';
import authorsTableData from 'layouts/tables/data/authorsTableData';
import projectsTableData from 'layouts/tables/data/projectsTableData';
import MDButton from 'components/MDButton';
import CreateProductModal from './Product/CreateProductModal';
import UpdateProductModal from './Product/UpdateProductModal';
import UpdateOrderStatusModal from './updateOrder/UpdateOrderStatusModal';

function Tables() {
  const { columns, rows, selectedProduct, onCloseUpdateProductModal } = authorsTableData();
  const { columns: pColumns, rows: pRows, selectedOrderId, onCloseUpdateOrderModal } = projectsTableData();

  const [isCreateProductModalOpen, setCreateProductModalOpen] = useState(false);

  const handleOpenCreateProductModal = () => {
    setCreateProductModalOpen(true);
  };

  const handleCloseCreateProductModal = () => {
    onCloseUpdateProductModal(null)
    setCreateProductModalOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Product Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Orders Table
                </MDTypography>
              </MDBox>
              <MDBox pt={4}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={3} textAlign="center">
        <MDButton variant="gradient" color="info" onClick={handleOpenCreateProductModal}>
          Create New Product
        </MDButton>
      </MDBox>
      <CreateProductModal isOpen={isCreateProductModalOpen} onClose={handleCloseCreateProductModal} />
      {selectedOrderId && (
        <UpdateOrderStatusModal orderId={selectedOrderId} onClose={onCloseUpdateOrderModal} isOpen={selectedOrderId !== null} />
      )}
      {selectedProduct && (
        <UpdateProductModal product={selectedProduct} onClose={onCloseUpdateProductModal} isOpen={selectedProduct !== null} />
      )}
      <Footer />
    </DashboardLayout>
  );
}


export default Tables;
