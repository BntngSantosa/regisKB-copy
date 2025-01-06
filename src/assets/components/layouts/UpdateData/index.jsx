import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateReminder } from "../../../../services/updateRemiderById";
import { getReminderById } from "../../../../services/getReminderByid";
import Button from "../../elements/Button";
import FormField from "../../fragments/FormField";
import Judul from "../../elements/Judul";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../../assets/images/logo.png";

const UpdateForm = () => {
  const { nik } = useParams();
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
    const fetchData = async () => {
      try {
        const data = await getReminderById(nik);
        setFormData({ ...data });
      } catch (err) {
        toast.error("Gagal mengambil data!");
      }
    };
    fetchData();
  }, [nik]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith("0")) {
      return "+62" + phoneNumber.slice(1);
    }
    return phoneNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedWa = formatPhoneNumber(formData.wa);

    // Validasi input
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
      // Kirim data yang diperbarui ke API
      const updatedData = {
        nik: formData.nik,
        nama: formData.nama,
        wa: formattedWa,
        ttl: formData.ttl,
        usia: formData.usia,
        jenis_kelamin: formData.jenis_kelamin,
        alamat: formData.alamat,
        alat_kontrasepsi: formData.alat_kontrasepsi,
      };

      await updateReminder(nik, updatedData);

      toast.success("Data berhasil diperbarui!");
    } catch (err) {
      toast.error(`Terjadi kesalahan: ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-900 p-8 shadow-lg max-w-lg mx-auto"
    >
      <img src={logo} className="rounded-md mb-4 w-full" />
      <Judul judul="Update Data Akseptor KB Non-MKJP" />

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
      <Button text="Update" />

      {/* React Toastify container */}
      <ToastContainer />
    </form>
  );
};

export default UpdateForm;
