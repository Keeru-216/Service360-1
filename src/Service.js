const BASE_URL = 'http://localhost:5202/api/Admin';

// Generic function to fetch data from the API
export const fetchFromApi = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

// Function to fetch ticket types
export const fetchTicketTypes = async () => {
  return await fetchFromApi('GetTicketTypes');
};


export const addTicketType = async (ticketType) => {
  const response = await fetch('http://localhost:5202/api/Admin/AddTicketType', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticketType),
  });

  if (!response.ok) {
    throw new Error('Failed to add ticket type');
  }
  
  return response.json();
};


export const deleteTicketType = async (ticketTypeId) => {
  const response = await fetch(`${BASE_URL}/DeleteTicketType?ticketTypeId=${ticketTypeId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete ticket type');
  }
  return await response.json(); // Optionally return the response
};

// Function to update a ticket type
export const updateTicketType = async (ticketType) => {
  const response = await fetch('http://localhost:5202/api/Admin/UpdateTicketType', {
    method: 'PUT', // Use PUT for updates
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticketType),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update ticket type');
  }
  
  return await response.json();
};