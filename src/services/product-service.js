import HttpService from "./htttp.service";

class ProductService {

  getAll = async () => {
    const fetchProductsEndpoint = '/api/v1/product';
    return await HttpService.get(fetchProductsEndpoint);
  };
  getAllCounts = async () => {
    const fetchProductsCountsEndpoint = '/api/v1/product/all/counts';
    return await HttpService.get(fetchProductsCountsEndpoint);
  };
  save = async (payload) => {
    const productEndpoint = '/api/v1/product';
    return await HttpService.post(productEndpoint, payload);
  };
  update = async (productId, payload) => {
    const productEndpoint = `/api/v1/product/${productId}`;
    return await HttpService.put(productEndpoint, payload);
  };
  delete = async (productId) => {
    const productEndpoint = `/api/v1/product/${productId}`;
    return await HttpService.delete(productEndpoint);
  };

}

export default new ProductService();
