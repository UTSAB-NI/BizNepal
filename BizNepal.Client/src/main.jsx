import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import Store from "./Store.js";

import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap/dist/css/bootstrap.min.css"; //bootstrap
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"; //datatable
// import "font-awesome/css/font-awesome.min.css"; //font-awesome

import App from "./App.jsx";
import HomeScreen from "./screen/HomeScreen.jsx";
import LoginScreen from "./screen/LoginScreen.jsx";
import RegisterScreen from "./screen/RegisterScreen.jsx";
import GetCategory from "./screen/GetCategory.jsx";
import SearchScreen from "./screen/SearchScreen.jsx";
import UserprofileScreen from "./screen/UserprofileScreen.jsx";
import GetBusinessByIdScreen from "./screen/GetBusinessByIdScreen.jsx";

import ProtectedRoute from "./Component/ProtectedRoute.jsx";
import BusinessListScreen from "./screen/BusinessListScreen.jsx";

import AdminRoute from "./Component/AdminRoute.jsx";
import BusinessOwner from "./screen/Admin/BusinessOwner.jsx";
import GeneralUser from "./screen/Admin/GeneralUser.jsx";
import ManageBusiness from "./screen/Admin/ManageBusiness.jsx";
import ManageCategory from "./screen/Admin/ManageCategory.jsx";
import AllUser from "./screen/Admin/AllUser.jsx";
import AdminDashboard from "./screen/Admin/AdminDashboard.jsx";
// import TestScreen from "./screen/TestScreen.jsx";
import BusinessFilter from "./screen/Test.jsx";

// import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<SearchScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/businessfilter" element={<BusinessFilter />} />

        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/category/:category" element={<GetCategory />} />
        <Route path="/business/:id" element={<GetBusinessByIdScreen />} />
        {/* <Route path="/test" element={<TestScreen />} /> */}

        {/* //protected route */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="profile" element={<UserprofileScreen />} />
          <Route path="businesslist" element={<BusinessListScreen />} />
        </Route>
      </Route>

      {/* //admin route */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/generaluser" element={<GeneralUser />} />
        <Route path="/admin/businessowner" element={<BusinessOwner />} />
        <Route path="/admin/business" element={<ManageBusiness />} />
        <Route path="/admin/category" element={<ManageCategory />} />
        <Route path="/admin/alluser" element={<AllUser />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
