import { useKeycloak } from "@react-keycloak/web";
import React, { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import Footer from "./components/Footer/Footer";
import GlobalStyle, { SectionContainer } from "./globalStyles";
import PrivateRoute from "./helpers/PrivateRoute";
import About from "./pages/AboutUs/AboutUs";
import AdminAcess from "./pages/Admin/AdminAcess";
import Catalogs from "./pages/Catalog/Catalogs";
import CollectionDetail from "./pages/CollectionDetail/CollectionDetail";
import Collections from "./pages/Collections/Collections";
import Financer from "./pages/Financer/Financer";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import Marketing from "./pages/Marketing/Marketing";
import DetailMyOrder from "./pages/MyOrders/Detail/DetailMyOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import Shipments from "./pages/Shipments/Shipments";
import LoginStub from "./stub/LoginStub";

export default function AppRouter() {
  const { keycloak, initialized } = useKeycloak();
  
  if (!initialized) return <></>;
  return (
    <div>
      <Toaster />
      <BrowserRouter basename={"/conciergeAdmin"}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminAcess />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <BrowserRouter basename={"/concierge"}>
        <GlobalStyle />
        <Navbar />
        <SectionContainer>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/collections" element={<Collections />} />

            <Route
              path="/collection/:id/:nameCollection"
              element={<CollectionDetail />}
            />

            <Route
              path="/inventory"
              element={
                <PrivateRoute
                  roles={["financeiro", "comercial", "colaborador-pb"]}
                >
                  <Inventory />
                </PrivateRoute>
              }
            />

            <Route
              path="/myorders"
              element={
                <PrivateRoute
                  roles={["financeiro", "comercial", "colaborador-pb"]}
                >
                  <MyOrders />
                </PrivateRoute>
              }
            />
            <Route
              path="/myordersdetail/:id/:data"
              element={
                <PrivateRoute
                  roles={["financeiro", "comercial", "colaborador-pb"]}
                >
                  <DetailMyOrder />
                </PrivateRoute>
              }
            />

            <Route
              path="/shipments"
              element={
                <PrivateRoute
                  roles={["financeiro", "comercial", "colaborador-pb"]}
                >
                  <Shipments />
                </PrivateRoute>
              }
            />
            <Route
              path="/financer"
              element={
                <PrivateRoute
                  roles={["financeiro", "comercial", "colaborador-pb"]}
                >
                  <Financer />
                </PrivateRoute>
              }
            />

            <Route path="/marketing" element={<Marketing />} />

            <Route path="/catalog" element={<Catalogs />} />

            <Route path="/about" element={<About />} />

            <Route path="/login" element={<LoginStub />} />
          </Routes>
        </SectionContainer>
        <SectionContainer>
          <Footer />
        </SectionContainer>
      </BrowserRouter>
    </div>
  );
}
