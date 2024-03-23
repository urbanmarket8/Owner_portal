import {
  PLACE_ORDER,
  SHOW_ORDER
} from "./orderType";
import { placeOrderApi } from "../../services/api/order";

export const PlaceOrder = () => {
  return async (dispatch) => {
    try {
      console.log("In Place Order")
      const response = await placeOrderApi();
      dispatch({
        type: PLACE_ORDER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error place order:", error);
    }
  };
};

export const showOrder = () => {
  return {
    type: SHOW_ORDER,
  };
};