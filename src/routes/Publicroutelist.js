import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Order from "../components/frontend/Order";
import OrderDetail from "../components/frontend/OrderDetail";
import Page403 from "../components/errors/Page403";
import Page404 from "../components/errors/Page404";
import Register from "../components/frontend/auth/Register";
import Login from "../components/frontend/auth/Login";
//import ViewCategory from '../components/frontend/collections/ViewCategory';
import ViewClub from "../components/frontend/collections/ViewClub";
import ViewProduct from "../components/frontend/collections/ViewProduct";
import ProductDetail from "../components/frontend/collections/ProductDetail";
import Cart from "../components/frontend/Cart";
import Checkout from "../components/frontend/Checkout";
import Thankyou from "../components/frontend/Thankyou";
import Verify from "../components/frontend/auth/Verify";
import ForgotPassword from "../components/frontend/auth/ForgotPassword";
import ChangePassword from "../components/frontend/auth/ChangePassword";
import SearchProduct from "../components/frontend/collections/SearchProduct";

const publicRoutesList = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/about", exact: true, name: "About", component: About },
  { path: "/order", exact: true, name: "Order", component: Order },
  {
    path: "/order/:id",
    exact: true,
    name: "OrderDetail",
    component: OrderDetail,
  },
  { path: "/403", exact: true, name: "Page403", component: Page403 },
  { path: "/404", exact: true, name: "Page404", component: Page404 },
  { path: "/login", exact: true, name: "Login", component: Login },
  { path: "/register", exact: true, name: "Register", component: Register },
  { path: "/verify", exact: true, name: "Verify", component: Verify },
  {
    path: "/forgot_password",
    exact: true,
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/change_password",
    exact: true,
    name: "ChangePassword",
    component: ChangePassword,
  },
  { path: "/collections", exact: true, name: "ViewClub", component: ViewClub },
  {
    path: "/collections/:id/",
    exact: true,
    name: "ViewProduct",
    component: ViewProduct,
  },
  {
    path: "/league/:id_league/",
    exact: true,
    name: "ViewProduct",
    component: ViewProduct,
  },
  {
    path: "/listProduct/",
    exact: true,
    name: "SearchProduct",
    component: SearchProduct,
  },
  {
    path: "/collections/:club/:product",
    exact: true,
    name: "ProductDetail",
    component: ProductDetail,
  },
  { path: "/cart", exact: true, name: "Cart", component: Cart },
  { path: "/checkout", exact: true, name: "Checkout", component: Checkout },
  {
    path: "/thank-you",
    exact: true,
    name: "Thankyou",
    component: Thankyou,
  },
];

export default publicRoutesList;
