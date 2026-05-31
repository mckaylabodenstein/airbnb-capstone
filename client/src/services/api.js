import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getAccommodations = async () => {
  const response = await axios.get(`${API_BASE_URL}/accommodations`);
  return response.data;
};

export const getAccommodationById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/accommodations/${id}`);
  return response.data;
};

export const createAccommodation = async (listingData) => {
  const response = await axios.post(`${API_BASE_URL}/accommodations`, listingData);
  return response.data;
};

export const updateAccommodation = async (id, listingData) => {
  const response = await axios.put(`${API_BASE_URL}/accommodations/${id}`, listingData);
  return response.data;
};

export const deleteAccommodation = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/accommodations/${id}`);
  return response.data;
};

export const createReservation = async (reservationData) => {
  const response = await axios.post(`${API_BASE_URL}/reservations`, reservationData);
  return response.data;
};

export const getReservations = async () => {
  const response = await axios.get(`${API_BASE_URL}/reservations`);
  return response.data;
};

export const deleteReservation = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/reservations/${id}`);
  return response.data;
};