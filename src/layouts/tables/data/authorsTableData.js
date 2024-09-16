import { notification } from "antd";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import ProductService from "services/product-service";

export default function data() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;


  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAll();
      console.log(response, "response.product");

      setProducts(response?.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProducts = async (productId) => {

    
    try {
      await ProductService.delete(productId.props._id);
      console.log(productId,"productID");
      notification.success({
        message: "deleted successfully",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenUpdateProductModal = (product) => {
    setSelectedProduct(product);
  };

  const handleDiscountModal = (product) => {
    setSelectedProduct1(product);
  };

  const handleCloseUpdateProductModal = () => {
    setSelectedProduct(null);
    fetchProducts(); // Fetch products again after closing the modal
  };

  const handleCloseDiscountModal = () => {
    setSelectedProduct1(null);
    fetchProducts();
  };

  const Product = ({ image, name, description, _id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={API_URL + image[0]} name={name} size="lg" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "product", accessor: "product", width: "45%", align: "left" },
      { Header: "price", accessor: "price", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "quantity", accessor: "quantity", align: "center" },
      { Header: "category", accessor: "category", align: "center" },
      {
        Header: "action",
        accessor: "action",
        align: "center",
        Cell: ({ row }) => (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => {
              deleteProducts();
              handleOpenUpdateProductModal({
                quantity: row.original.quantity,
                category: row.original.category,
                price: row.original.price,
                ...row.original.product.props,
              });
            }}
          >
            Edit
          </MDTypography>
        ),
      },
      {
        Header: "discount",
        accessor: "discount",
        align: "center",
        Cell: ({ row }) => (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => {
              handleDiscountModal(row.original.product);
            }}
          >
            Discont
          </MDTypography>
        ),
      },
      {
        Header: "delete",
        accessor: "delete",
        align: "center",
        Cell: ({ row }) => (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => {
              deleteProducts(row.original.product);
            }}
          >
            Delete
          </MDTypography>
        ),
      },
    ],

    rows: products.map((product) => ({
      product: (
        <Product
          image={product.image}
          name={product.name}
          description={product.description}
          _id={product._id}
        />
      ),
      price: product.price,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent="Published"
            color="success"
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      category: product.category,
      quantity: product.quantity,
      action: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          onClick={() => {
            handleOpenUpdateProductModal(product);
          }}
        >
          Edit
        </MDTypography>
      ),
      discout: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          onClick={() => {
            handleCloseDiscountModal(product);
          }}
        >
          Discont
        </MDTypography>
      ),
      delete: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          onClick={() => {
            deleteProducts(product);
          }}
        >
          Delete
        </MDTypography>
      ),
    })),
    selectedProduct,
    onCloseUpdateProductModal: handleCloseUpdateProductModal,
    selectedProduct1,
    onCloseDisountModal: handleCloseDiscountModal,
  };
}
