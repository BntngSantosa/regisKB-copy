import { Routes, Route } from "react-router-dom";
import RegistrationKB from "./assets/pages/RegistrationKB";
import AdminLogin from "./assets/pages/Login";
import DashboardAdmin from "./assets/pages/Dashboard";
import UpdateRegistrationForm from "./assets/pages/UpdateData";
import AddData from "./assets/pages/AddData";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationKB />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/update/:nik" element={<UpdateRegistrationForm />} />
      <Route path="/admin/tambah" element={<AddData />} />
    </Routes>
  );
}

export default App;
