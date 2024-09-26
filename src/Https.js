const BASE_URL = 'http://localhost:5202/api/Admin';

export const fetchFromApi = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
