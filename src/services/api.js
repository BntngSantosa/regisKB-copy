const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAPI = async (method = "GET", body = null, endpoint = "") => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const result = await response.json();

  if (response.status !== 200 && response.status !== 201) {
    throw new Error(result.message || "Terjadi kesalahan pada API");
  }

  return result;
};
