import { Routes, Route } from "react-router-dom";
import Home from "./pages/website/home/Home";
import DesksSetups from "./pages/website/categories/DesksSetups.js";
import Internals from "./pages/website/categories/Internals.js";
import Externals from "./pages/website/categories/Externals.js";
import AllCategories from "./pages/website/categories/AllCategories.js";
import ContactUs from "./pages/website/contact/ContactUs.js";
import Account from "./pages/user/Account.js";
import Register from "./pages/auth/Register.js";
import Login from "./pages/auth/Login.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import RequireAuth from "./pages/auth/RequireAuth.js";
import Users from "./pages/dashboard/Users.js";
import Categories from "./pages/dashboard/Categories.js";
import Products from "./pages/dashboard/Products.js";
import Welcome from "./pages/website/Welcome.js";
import Blogs from "./pages/dashboard/Blogs.js";
import CreateUser from "./components/dashboard/create/CreateUser.js";
import CreateProduct from "./components/dashboard/create/CreateProduct.js";
import CreateCategory from "./components/dashboard/create/CreateCategory.js";
import CreateBlog from "./components/dashboard/create/CreateBlog.js";
import EditUser from "./components/dashboard/edit/EditUser.js";
import EditProduct from "./components/dashboard/edit/EditProduct.js";
import EditCategory from "./components/dashboard/edit/EditCategory.js";
import EditBlog from "./components/dashboard/edit/EditBlog.js";
import Cart from "./pages/user/Cart.js";
import SuccessPayment from "./components/SuccessPayment.js";
import CancelPayment from "./components/dashboard/CancelPayment.js";

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Welcome />} />
                <Route path={"/home"} element={<Home />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/desks"} element={<DesksSetups />} />
                <Route path={"/internals"} element={<Internals />} />
                <Route path={"/externals"} element={<Externals />} />
                <Route path={"/categories"} element={<AllCategories />} />
                <Route path={"/contactus"} element={<ContactUs />} />
                <Route path={"/account"} element={<Account />} />
                <Route path={"/cart"} element={<Cart />} />
                <Route path={"/success"} element={<SuccessPayment />} />
                <Route path={"/cancel"} element={<CancelPayment />} />
                <Route element={<RequireAuth />}>
                    <Route path={"/dashboard"} element={<Dashboard />}>
                        <Route path={"users"} element={<Users />} />
                        <Route path={"categories"} element={<Categories />} />
                        <Route path={"products"} element={<Products />} />
                        <Route path={"blogs"} element={<Blogs />} />
                        <Route path={"user/add"} element={<CreateUser />} />
                        <Route
                            path={"products/add"}
                            element={<CreateProduct />}
                        />
                        <Route
                            path={"category/add"}
                            element={<CreateCategory />}
                        />
                        <Route path={"blogs/add"} element={<CreateBlog />} />
                        <Route path={"users/edit/:id"} element={<EditUser />} />
                        <Route
                            path={"products/edit/:id"}
                            element={<EditProduct />}
                        />
                        <Route
                            path={"categories/edit/:id"}
                            element={<EditCategory />}
                        />
                        <Route path={"blogs/edit/:id"} element={<EditBlog />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}
