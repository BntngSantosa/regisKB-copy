import { useState } from "react";
import { supabase } from "../../../../utils/supabase";
import Button from "../../elements/Button";
import FormField from "../../fragments/FormField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../../assets/images/logo.png";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Username dan Password harus diisi!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("username", formData.username)
        .eq("password", formData.password)
        .single();

      if (error || !data) {
        throw new Error("Username atau Password salah");
      }

      toast.success("Login berhasil!");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    } catch (err) {
      toast.error(`Login gagal: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-[#00FF00] to-[#008000] p-8 shadow-lg max-w-lg w-full rounded-md"
      >
        <img src={logo} className="rounded-md mb-4 w-full" />
        <FormField
          id="username"
          label="Username"
          placeholder="Masukkan Username"
          value={formData.username}
          onChange={handleChange}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Masukkan Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button text="Login" />

        <ToastContainer />
      </form>
    </div>
  );
};

export default AdminLogin;
