// examples/Forms/ProductForm.jsx
import { useState, useEffect } from 'react';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import MDInput from '../../components/MDInput';
import MDSelect from '../../components/MDSelect/MDSelect';
import MDButton from '../../components/MDButton';
import ProductService from '../../services/product-service.js';

function ProductForm({ onClose, initialProduct }) {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [actionName, setActionName] = useState('Create');
    const [productImage, setProductImage] = useState('');

    const categories = ['Electronics', 'Clothing', 'Books', 'Home Goods', 'Groceries', 'Vegetables', 'Fruits'];

    useEffect(() => {
        if (initialProduct) {
            setActionName("Update")
            setProductName(initialProduct.name || '');
            setProductDescription(initialProduct.description || '');
            setProductPrice(initialProduct.price || '');
            setProductQuantity(initialProduct.quantity || '');
            setProductCategory(initialProduct.category || '');
        }
    }, [initialProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to append both the product data and the image file
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('quantity', productQuantity);
        formData.append('category', productCategory);
        formData.append('price', parseFloat(productPrice));

        productImage.forEach((file, index) => {
            formData.append(`images`, file);
        });

        try {
            if (initialProduct) {
                // If initialProduct exists, update the existing product
                const response = await ProductService.update(initialProduct._id, formData);
                console.log('Product updated successfully:', response);
            } else {
                // Otherwise, create a new product
                const response = await ProductService.save(formData);
                console.log('Product saved successfully:', response);
            }

            onClose();
        } catch (error) {
            console.error('Error updating/saving product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <MDBox p={2}>
                <MDBox mb={2}>
                    <MDInput
                        type="text"
                        label="Product Name"
                        fullWidth
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </MDBox>
                <MDBox mb={2}>
                    <MDInput
                        type="text"
                        label="Product Description"
                        fullWidth
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                </MDBox>
                <MDBox mb={2}>
                    <MDInput
                        type="number"
                        label="Product Price"
                        fullWidth
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </MDBox>
                <MDBox mb={2}>
                    <MDInput
                        type="number"
                        label="Product Quantity"
                        fullWidth
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                        required
                    />
                </MDBox>
                <MDBox mb={2}>
                    <MDBox mb={2}>
                        <MDSelect
                            label="Category"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                            options={categories}
                            required
                        />
                    </MDBox>
                </MDBox>
                <MDBox mb={2}>
                    <label htmlFor="productName">Upload Product Image(s) </label>
                    <input
                        label="Category"
                        type="file"
                        multiple
                        onChange={(e) => setProductImage(Array.from(e.target.files))}
                        required
                    />
                </MDBox>

                <MDButton variant="gradient" color="info" type="submit">
                    {actionName}
                </MDButton>
            </MDBox>
        </form>
    );
}

export default ProductForm;
