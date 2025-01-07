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
    tanggal_lahir: "",
    kota: "",
    kecamatan: "",
    kelurahan: "",
    rt: "",
    rw: "",
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

    // Aturan validasi berdasarkan `id`
    const validationRules = {
      nik: (val) => val.length <= 16,
      nama: (val) => /^[a-zA-Z\s]*$/.test(val),
      kota: (val) => /^[a-zA-Z\s]*$/.test(val),
      kecamatan: (val) => /^[a-zA-Z\s]*$/.test(val),
      kelurahan: (val) => /^[a-zA-Z\s]*$/.test(val),
      rt: (val) => val.length <= 3,
      rw: (val) => val.length <= 3,
      wa: (val) => /^[0-9]*$/.test(val) && val.length <= 15,
    };

    // Validasi sesuai aturan
    if (validationRules[id]) {
      if (validationRules[id](value)) {
        setFormData({ ...formData, [id]: value });
      }
    } else {
      // Input yang tidak memerlukan validasi
      setFormData({ ...formData, [id]: value });
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith("0")) {
      return "+62" + phoneNumber.slice(1);
    }
    return phoneNumber;
  };

  const formatPhoneNumberBack = (phoneNumber) => {
    if (phoneNumber.startsWith("+62")) {
      return "0" + phoneNumber.slice(3);
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
      !formData.tanggal_lahir ||
      !formData.kota ||
      !formData.kecamatan ||
      !formData.kelurahan ||
      !formData.rt ||
      !formData.rw ||
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
        tanggal_lahir: new Date(formData.tanggal_lahir)
          .toISOString()
          .split("T")[0],
        jenis_kelamin: "Perempuan",
        kota: formData.kota,
        kecamatan: formData.kecamatan,
        kelurahan: formData.kelurahan,
        rt: formData.rt,
        rw: formData.rw,
        alat_kontrasepsi: formData.alat_kontrasepsi,
      };

      await updateReminder(nik, updatedData);

      toast.success("Data berhasil diperbarui!");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 2000);
    } catch (err) {
      toast.error(`Terjadi kesalahan: ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-[#00FF00] to-[#008000] p-8 shadow-lg max-w-lg mx-auto"
    >
      <img src={logo} className="rounded-md mb-4 w-full" />
      <Judul judul="Pendaftaran Akseptor KB Non-MKJP" />

      <FormField
        id="nik"
        label="NIK"
        placeholder="Masukkan NIK"
        value={formData.nik}
        onChange={handleChange}
        type="number"
        disabled={true}
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
        value={formatPhoneNumberBack(formData.wa)}
        onChange={handleChange}
        type="number"
      />
      <FormField
        id="tanggal_lahir"
        label="Tanggal lahir"
        type="date"
        placeholder="Bandung, 12 Januari 2024"
        value={formData.tanggal_lahir}
        onChange={handleChange}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          id="kota"
          label="Kota/Kabupaten"
          placeholder="Masukkan kota/kabupaten"
          value={formData.kota}
          onChange={handleChange}
        />
        <FormField
          id="kecamatan"
          label="Kecamatan"
          placeholder="Masukkan kecamatan"
          value={formData.kecamatan}
          onChange={handleChange}
        />
        <FormField
          id="kelurahan"
          label="Kelurahan"
          placeholder="Masukkan kelurahan"
          value={formData.kelurahan}
          onChange={handleChange}
        />
        <FormField
          id="rt"
          label="RT"
          placeholder="003"
          value={"00"+formData.rt}
          onChange={handleChange}
          type="number"
        />
        <FormField
          id="rw"
          label="RW"
          placeholder="001"
          value={"00"+formData.rw}
          onChange={handleChange}
          type="number"
        />
      </div>
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

export default UpdateForm;
