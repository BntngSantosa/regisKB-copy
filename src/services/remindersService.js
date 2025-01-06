import { fetchAPI } from "./api";

// Fungsi untuk membuat pengingat KB
export const createReminder = async (data) => {
  return fetchAPI("POST", data, "/create");
};
