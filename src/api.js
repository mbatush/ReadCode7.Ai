const API_BASE_URL = "https://your-backend-url.com"; // Replace with actual Django backend URL

export const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}/your-api-endpoint/`);
  const data = await response.json();
  return data;
};
