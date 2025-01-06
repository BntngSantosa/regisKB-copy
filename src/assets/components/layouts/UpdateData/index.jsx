import { useState, useEffect } from "react";
import { supabase } from "../../../../utils/supabase";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../elements/Button";
import FormField from "../../fragments/FormField";
import Judul from "../../elements/Judul";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRegistrationForm = () => {
  const { nik } = useParams();
  console.log("NIK dari URL:", nik);
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

  useEffect(() => {
    if (!nik) {
      toast.error("NIK tidak ditemukan.");
      return;
    }

    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("kb_registration")
          .select("*")
          .eq("nik", nik) // Pastikan nik tersedia
          .single(); // Mengambil satu data berdasarkan NIK

        if (error) throw error;

        setFormData(data); // Isi data form dengan hasil query
      } catch (err) {
        toast.error(`Gagal mengambil data: ${err.message}`);
      }
    };

    fetchData();
  }, [nik]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (
      !formData.nik ||
      !formData.nama ||
      !formData.wa ||
      !formData.ttl ||
      !formData.usia ||
      !formData.jenis_kelamin ||
      !formData.alamat ||
      !formData.alat_kontrasepsi
    ) {
      toast.error("Semua kolom harus diisi!");
      return;
    }

    try {
      const { error } = await supabase
        .from("kb_registration")
        .update({
          nama: formData.nama,
          wa: formData.wa,
          ttl: formData.ttl,
          usia: formData.usia,
          jenis_kelamin: formData.jenis_kelamin,
          alamat: formData.alamat,
          alat_kontrasepsi: formData.alat_kontrasepsi,
        })
        .eq("nik", nik); // Update data berdasarkan NIK

      if (error) throw error;

      toast.success("Data berhasil diperbarui!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (err) {
      toast.error(`Terjadi kesalahan: ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-900 p-8 shadow-lg max-w-lg mx-auto"
    >
      <Judul judul="Update Data KB" />

      <FormField
        id="nik"
        label="NIK"
        placeholder="Masukkan NIK"
        value={formData.nik}
        onChange={handleChange}
        disabled // Tidak dapat diubah karena digunakan sebagai ID
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
      <Button text="Update" />

      {/* React Toastify container */}
      <ToastContainer />
    </form>
  );
};

export default UpdateRegistrationForm;
