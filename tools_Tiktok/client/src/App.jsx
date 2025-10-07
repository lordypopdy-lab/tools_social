import axios from "axios"
import Admin from "./Admin/Admin";
import AdminLogin from "./Admin/AdminLogin";
import UserLogin from "./component/UserLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index="/" element={<UserLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
