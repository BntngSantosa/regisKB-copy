import { fetchAPI } from "./api";

export const updateReminder = async (nik, data) => {
  const response = await fetchAPI("PUT", data, `/reminder/${nik}`);
  return response.data; // Mengambil hanya data yang relevan
};
