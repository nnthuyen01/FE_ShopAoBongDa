import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Club from '../components/admin/category/Club';
import ViewClub from '../components/admin/category/ViewClub';
import EditClub from '../components/admin/category/EditClub';
import AddProduct from '../components/admin/product/AddProduct';
import ViewProduct from '../components/admin/product/ViewProduct';
import EditProduct from '../components/admin/product/EditProduct';
import Order from '../components/admin/order/Order';
import OrderDetail from '../components/admin/order/OrderDetail';
import ViewBrand from "../components/admin/brand/ViewBrand";
import AddBrand from '../components/admin/brand/AddBrand';
import EditBrand from '../components/admin/brand/EditBrand';
import ViewLeague from '../components/admin/league/ViewLeague';
import AddLeague from '../components/admin/league/AddLeague';
import EditLeague from '../components/admin/league/EditLeague';


const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/add-club', exact: true, name: 'Category', component: Club },
    { path: '/admin/view-club', exact: true, name: 'ViewCategory', component: ViewClub },
    { path: '/admin/edit-club/:id', exact: true, name: 'EditCategory', component: EditClub },
    { path: '/admin/add-product', exact: true, name: 'AddProduct', component: AddProduct },
    { path: '/admin/view-product', exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/orders', exact: true, name: 'Order', component: Order },
    { path: '/admin/order/:id', exact: true, name: 'OrderDetail', component: OrderDetail },
    { path: '/admin/view-brand', exact: true, name: 'ViewBrand', component: ViewBrand },
    { path: '/admin/add-brand', exact: true, name: 'AddBrand', component: AddBrand },
    { path: '/admin/edit-brand/:id', exact: true, name: 'EditBrand', component: EditBrand },
    { path: '/admin/view-league', exact: true, name: 'ViewLeague', component: ViewLeague },
    { path: '/admin/add-league', exact: true, name: 'AddLeague', component: AddLeague },
    { path: '/admin/edit-league/:id', exact: true, name: 'EditLeague', component: EditLeague },
];

export default routes;