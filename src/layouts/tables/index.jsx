import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import {
  Pagination
} from "antd"; // Import Modal, DatePicker, Space, and Pagination from antd
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useState } from "react";
import CreateProductModal from "./Product/CreateProductModal";

import ProductDiscountModal from "./Product/DiscountModal";

import UpdateProductModal from "./Product/UpdateProductModal";
import UpdateOrderStatusModal from "./updateOrder/UpdateOrderStatusModal";


function Tables() {
  const {
    columns,
    rows,
    selectedProduct,
    selectedProduct1,
    onCloseUpdateProductModal,
    onCloseDisountModal,
  } = authorsTableData();
  const {
    columns: pColumns,
    rows: pRows,
    selectedOrderId,
    onCloseUpdateOrderModal,
  } = projectsTableData();

  const [isCreateProductModalOpen, setCreateProductModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Calculate paginated rows
  const paginatedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenCreateProductModal = () => {
    setCreateProductModalOpen(true);
  };

  const handleCloseCreateProductModal = () => {
    onCloseUpdateProductModal(null);
    setCreateProductModalOpen(false);
  };

  const handleOpenDiscountModal = () => {
    setDiscountModalOpen(true);
  };

  const handleCloseDiscountModal = () => {
    onCloseDisountModal(null);
    setDiscountModalOpen(false);
  };


  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <MDTypography variant="h6" color="white" sx={{ width: "100%" }}>
                  Product Table
                </MDTypography>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <MDBox textAlign="right">
                    <MDButton
                      variant="gradient"
                      color="success"
                      onClick={handleOpenCreateProductModal}
                      sx={{ boxShadow: "none" }}
                    >
                      Create New Product
                    </MDButton>
                  </MDBox>
                </div>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: paginatedRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>

              {/* Add Pagination Component */}
              <MDBox display="flex" justifyContent="center" mt={3} pb={3}>
                <Pagination
                  total={rows.length}
                  showSizeChanger
                  showQuickJumper
                  onChange={handlePageChange}
                  pageSizeOptions={[10, 20, 50, 100]}
                  onShowSizeChange={(current, size) => {
                    setPageSize(size);
                  }}
                  defaultPageSize={10}
                  showTotal={(total) =>
                    total == 0
                      ? `There is no products`
                      : total == 1
                        ? `There is ${total} products`
                        : `There are ${total} products`
                  }
                />
              </MDBox>
            </Card>
          </Grid>

          {/* Orders Table */}
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
              <MDBox pt={3}>
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


      {/* Create Product Modal */}
      <CreateProductModal
        isOpen={isCreateProductModalOpen}
        onClose={handleCloseCreateProductModal}
      />

      {/* Update Order Status Modal */}
      {selectedOrderId && (
        <UpdateOrderStatusModal
          orderId={selectedOrderId}
          onClose={onCloseUpdateOrderModal}
          isOpen={selectedOrderId !== null}
        />
      )}

      {/* Update Product Modal */}
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={onCloseUpdateProductModal}
          isOpen={selectedProduct !== null}
        />
      )}

      {selectedProduct1 && (
        <ProductDiscountModal
          product={selectedProduct1}
          onClose={onCloseDisountModal}
          isOpen={selectedProduct1 !== null}
        />
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
