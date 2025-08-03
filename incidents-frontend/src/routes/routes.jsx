import HomePage from "../pages/HomePage";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => (
  <Routes>
    <Route path={"/"} element={<HomePage />} />
  </Routes>
);