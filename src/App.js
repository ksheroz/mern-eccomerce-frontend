import { useEffect } from "react";
import "./App.less";
import { Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
//Components
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Navbar from "./components/nav/Navbar";
import SideDrawer from "./components/drawer/SideDrawer";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { Footer } from "antd/lib/layout/layout";

function App() {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <div className="page__Container">
        <div className="content__Wrap">
          <Toaster />

          <div style={{ position: "sticky", zIndex: 100, top: 0 }}>
            <Navbar />
          </div>
          <SideDrawer />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/register/complete"
              component={RegisterComplete}
            />
            <Route exact path="/forgot/password" component={ForgotPassword} />
            <UserRoute exact path="/user/history" component={History} />
            <UserRoute exact path="/user/password" component={Password} />
            <UserRoute exact path="/user/wishlist" component={Wishlist} />
            <AdminRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />
            <AdminRoute
              exact
              path="/admin/category"
              component={CategoryCreate}
            />
            <AdminRoute
              exact
              path="/admin/category/:slug"
              component={CategoryUpdate}
            />
            <AdminRoute exact path="/admin/sub" component={SubCreate} />
            <AdminRoute exact path="/admin/product" component={ProductCreate} />
            <AdminRoute exact path="/admin/products" component={AllProducts} />
            <AdminRoute
              exact
              path="/admin/product/:slug"
              component={ProductUpdate}
            />
            <Route exact path="/product/:slug" component={Product} />
            <Route exact path="/category/:slug" component={CategoryHome} />
            <Route exact path="/sub/:slug" component={SubHome} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/cart" component={Cart} />
            <UserRoute exact path="/checkout" component={Checkout} />
          </Switch>
        </div>
        <Footer
          style={{
            textAlign: "center",
            position: "relative",
            bottom: "0",
            width: "100%",
          }}
        >
          My App ©2021 Created by Sheroz Khan
        </Footer>
      </div>
    </>
  );
}

export default App;
