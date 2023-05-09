import { Routes, Route, Navigate } from "react-router-dom";
import { AllProducts } from "./AllProducts";
import  Login  from "./auth/Logins";
import { ProductView } from "./ProductView";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/products" />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/products/:productId" element={<ProductView />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
};
