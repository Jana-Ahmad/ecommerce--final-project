/* eslint-disable react/jsx-no-undef */
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home/Home";
import Root from "./Routes/Root";
import About from "./pages/Home/About";
import Cart from "./pages/Cart/components/Cart";
import Categories from "./pages/Home/Categories";
import ForgotPassword from "./pages/Forgot password/Components/ForgotPassword";
import Order from "./pages/Order/components/Order";
import Product from "./pages/Products/components/Product";
import Profile from "./pages/Profile/components/Profile";
import Signin from "./pages/Sign in/components/Signin";
import Signup from "./pages/Home/Signup";
import Notfound from "./pages/Not found/Notfound";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import UserContextProvider from "./context/User";
import CategoryProducts from "./pages/Home/CategoryProducts";
import ProductsContextProvider from "./context/AllProducts";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/components/Contact";
import SingleProduct from "./pages/Shop/SingleProduct";
import ProductDisplay from "./pages/Shop/ProductDisplay";
import Review from "./pages/Shop/Review";
import SendCode from "./pages/Forgot password/SendCode";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element:<ProductsContextProvider> <Home /> </ProductsContextProvider> },
      { path: "/about", element: <About /> },
     {path: "/contact", element: <Contact/>},
      {path: "/shop", element: <ProtectedRoutes><ProductsContextProvider><Shop/></ProductsContextProvider> </ProtectedRoutes>},
      {path:"/shop/:id",element:<ProtectedRoutes><ProductsContextProvider><SingleProduct></SingleProduct></ProductsContextProvider></ProtectedRoutes>},
      { path: "/cart", element: <ProtectedRoutes><ProductsContextProvider><Cart /> </ProductsContextProvider></ProtectedRoutes>},
      { path: "/categories", element: <Categories /> },
      { path: "/forgotpassword", element: <ForgotPassword /> },
      { path: "/order", element: <Order /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/product", element: <ProtectedRoutes><Product /> </ProtectedRoutes> },
      {path:"/categories/:id",element: <CategoryProducts/>},
      { path: "/profile", element: <Profile /> },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element:  <Signup /> },
      {path: "productdisplay",element:<ProductsContextProvider> <ProductDisplay/></ProductsContextProvider>},
      {path:"/singleproduct",element: <SingleProduct/>},
      {path:"/review",element:<ProductsContextProvider><Review/></ProductsContextProvider>},
      {path:"/sendcode",element: <SendCode/>},
      {
        path: "*",
        element: <Notfound />
      },
    ],
  },
]);

function App() {
  return (
    <>
    <UserContextProvider>
  <RouterProvider router={router} />;
 </UserContextProvider>
  <ToastContainer position="top-center" richColors />
  </>
  )
}

export default App;


