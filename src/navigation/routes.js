import { createBrowserRouter } from "react-router-dom";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Logout from "../pages/Logout";
import SCREENS from "./constants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: SCREENS.LOGIN,
    element: <Login />,
  },
  {
    path: SCREENS.SIGN_UP,
    element: <Signup />,
  },
  {
    path: SCREENS.LOGOUT,
    element: <Logout />,
  },
  {
    path: SCREENS.PRODUCTS,
    element: <Products />,
  },
]);
