const BASE_URL = "http://localhost:8080/api/v1";

export const SIGN_UP_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LIST_PRODUCTS = `${BASE_URL}/product/search`;
export const LIST_SHOPS = `${BASE_URL}/shop/all`;
export const LIST_CART = `${BASE_URL}/cart`;
export const ADD_TO_CART = `${BASE_URL}/cart/add-to-cart`;
export const DELETE_FROM_CART = `${BASE_URL}/cart/delete-from-cart`;
export const PLACE_ORDER = `${BASE_URL}/orders/place-order`;
export const ALL_ORDERS = `${BASE_URL}/orders`;
