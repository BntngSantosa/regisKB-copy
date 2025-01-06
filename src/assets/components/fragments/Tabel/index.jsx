import { useState, useEffect } from "react";
import { supabase } from "../../../../utils/supabase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExcelJS from "exceljs"; // Impor ExcelJS

export default function AdminTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedData, error } = await supabase
        .from("kb_registration")
        .select("*");
      if (error) {
        console.error("Error fetching data from Supabase:", error);
      } else {
        setData(fetchedData);
        setFilteredData(fetchedData); // Set data awal untuk pencarian
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(data); // Reset data jika pencarian kosong
    } else {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredData(
        data.filter(
          (item) =>
            item.nik.toString().includes(lowerCaseQuery) ||
            item.nama.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const handleUpdate = (nik) => {
    navigate(`/admin/update/${nik}`);
  };

  const handleAdd = () => {
    navigate(`/admin/tambah`);
  };

  const handleDelete = async (nik) => {
    try {
      const { error } = await supabase
        .from("kb_registration")
        .delete()
        .eq("nik", nik);

      if (error) {
        console.error("Error deleting data:", error);
      } else {
        const updatedData = data.filter((item) => item.nik !== nik);
        setData(updatedData);
        setFilteredData(updatedData);
        toast.success("Data berhasil dihapus!");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.success("Data gagal dihapus!");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Fungsi untuk ekspor ke Excel menggunakan ExcelJS
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Daftar pendaftar KB");

    // Menambahkan header
    worksheet.columns = [
      { header: "NIK", key: "nik", width: 15 },
      { header: "Nama", key: "nama", width: 30 },
      { header: "Alamat", key: "alamat", width: 30 },
      { header: "Tempat, Tanggal Lahir", key: "ttl", width: 20 },
      { header: "Usia", key: "usia", width: 10 },
      { header: "Jenis Kelamin", key: "jenis_kelamin", width: 20 },
      { header: "Alat Kontrasepsi", key: "alat_kontrasepsi", width: 20 },
      { header: "Nomor WhatsApp", key: "wa", width: 20 },
      { header: "Tanggal Pendaftaran", key: "tanggal_daftar", width: 20 },
      { header: "Tanggal Kembali", key: "tanggal_berikutnya", width: 20 },
    ];

    // Menambahkan data
    currentData.forEach((item) => {
      worksheet.addRow({
        nik: item.nik,
        nama: item.nama,
        alamat: item.alamat,
        ttl: item.ttl,
        usia: item.usia,
        jenis_kelamin: item.jenis_kelamin,
        alat_kontrasepsi: item.alat_kontrasepsi,
        wa: item.wa,
        tanggal_daftar: item.tanggal_daftar,
        tanggal_berikutnya: item.tanggal_berikutnya,
      });
    });

    // Menyimpan file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kb_registration.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button
            onClick={() => handleAdd()}
            className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-800"
          >
            Tambah data
          </button>
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
          >
            Export ke Excel
          </button>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Cari berdasarkan NIK, atau Nama"
            className="w-full p-2 border border-gray-300 rounded-md outline-none"
          />
        </div>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">NIK</th>
            <th className="border border-gray-300 p-2">Nama</th>
            <th className="border border-gray-300 p-2">Alamat</th>
            <th className="border border-gray-300 p-2">Tanggal Lahir</th>
            <th className="border border-gray-300 p-2">Usia</th>
            <th className="border border-gray-300 p-2">Jenis Kelamin</th>
            <th className="border border-gray-300 p-2">Alat Kontrasepsi</th>
            <th className="border border-gray-300 p-2">WhatsApp</th>
            <th className="border border-gray-300 p-2">Tanggal Registrasi</th>
            <th className="border border-gray-300 p-2">Tanggal KB Berikunya</th>
            <th className="border border-gray-300 p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.nik} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 p-2 text-center">
                {item.nik}
              </td>
              <td className="border border-gray-300 p-2">{item.nama}</td>
              <td className="border border-gray-300 p-2">{item.alamat}</td>
              <td className="border border-gray-300 p-2">{item.ttl}</td>
              <td className="border border-gray-300 p-2 text-center">
                {item.usia}
              </td>
              <td className="border border-gray-300 p-2">
                {item.jenis_kelamin}
              </td>
              <td className="border border-gray-300 p-2">
                {item.alat_kontrasepsi}
              </td>
              <td className="border border-gray-300 p-2">{item.wa}</td>
              <td className="border border-gray-300 p-2">
                {item.tanggal_daftar}
              </td>
              <td className="border border-gray-300 p-2">
                {item.tanggal_berikutnya}
              </td>
              <td className="border-gray-300 p-2 space-y-2 flex flex-col justify-center">
                <button
                  onClick={() => handleUpdate(item.nik)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item.nik)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            } rounded-md`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
