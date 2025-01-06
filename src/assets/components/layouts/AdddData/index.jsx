import { useState } from "react";
import { supabase } from "../../../../utils/supabase";
import Button from "../../elements/Button";
import FormField from "../../fragments/FormField";
import Judul from "../../elements/Judul";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    wa: "",
    ttl: "",
    usia: "",
    jenis_kelamin: "",
    alamat: "",
    alat_kontrasepsi: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data sebelum submit:", formData);

    // Validasi input, pastikan tidak ada yang kosong
    if (
      !formData.nik ||
      !formData.nama ||
      !formData.wa ||
      !formData.ttl ||
      !formData.usia ||
      !formData.jenis_kelamin ||
      !formData.alat_kontrasepsi
    ) {
      toast.error("Semua kolom harus diisi!");
      return;
    }

    try {
      // Periksa apakah NIK sudah terdaftar
      const { data: existingNik, error: checkError } = await supabase
        .from("kb_registration")
        .select("nik")
        .eq("nik", formData.nik);

      if (checkError) throw checkError;

      if (existingNik && existingNik.length > 0) {
        toast.error("NIK sudah terdaftar! Silakan gunakan NIK lain.");
        return;
      }

      // Jika NIK belum terdaftar, simpan data ke database
      const { error } = await supabase
        .from("kb_registration")
        .insert([formData]);
      if (error) throw error;

      toast.success("Data berhasil ditambahkan!");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);

      // Reset form setelah berhasil submit
      setFormData({
        nik: "",
        nama: "",
        wa: "",
        ttl: "",
        usia: "",
        jenis_kelamin: "",
        alamat: "",
        alat_kontrasepsi: "",
      });
    } catch (err) {
      toast.error(`Terjadi kesalahan: ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-900 p-8 shadow-lg max-w-lg mx-auto"
    >
      <Judul judul="Pendaftaran KB" />

      <FormField
        id="nik"
        label="NIK"
        placeholder="Masukkan NIK"
        value={formData.nik}
        onChange={handleChange}
      />
      <FormField
        id="nama"
        label="Nama"
        placeholder="Masukkan Nama"
        value={formData.nama}
        onChange={handleChange}
      />
      <FormField
        id="wa"
        label="Nomor Whatsapp"
        placeholder="Masukkan Nomor Whatsapp"
        value={formData.wa}
        onChange={handleChange}
      />
      <FormField
        id="ttl"
        label="TTL"
        type="text"
        placeholder="Bandung, 12 Januari 2024"
        value={formData.ttl}
        onChange={handleChange}
      />
      <FormField
        id="usia"
        label="Usia"
        placeholder="Masukkan Usia"
        type="text"
        value={formData.usia}
        onChange={handleChange}
      />
      <FormField
        id="jenis_kelamin"
        label="Jenis Kelamin"
        options={[
          { value: "Laki-laki", label: "Laki-laki" },
          { value: "Perempuan", label: "Perempuan" },
        ]}
        value={formData.jenis_kelamin}
        onChange={handleChange}
      />
      <FormField
        id="alamat"
        label="Alamat"
        placeholder="Masukkan Alamat"
        value={formData.alamat}
        onChange={handleChange}
      />
      <FormField
        id="alat_kontrasepsi"
        label="Program KB"
        options={[
          { value: "Pil", label: "Pil" },
          { value: "Suntik 1 bulan", label: "Suntik 1 bulan" },
          { value: "Suntik 3 bulan", label: "Suntik 3 bulan" },
        ]}
        value={formData.alat_kontrasepsi}
        onChange={handleChange}
      />
      <Button text="Submit" />

      {/* React Toastify container */}
      <ToastContainer />
    </form>
  );
};

export default RegistrationForm;
