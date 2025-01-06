import { fetchAPI } from "./api";

export const getReminderById = async (nik) => {
  const response = await fetchAPI("GET", null, `/reminder/${nik}`);
  return response.data; // Mengambil hanya data yang relevan
};
