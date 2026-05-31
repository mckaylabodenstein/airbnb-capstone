import axios from "axios";

const API_URL = "https://airbnb-capstone-hn4p.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

function getToken() {
  return localStorage.getItem("token");
}

function getAuthConfig() {
  const token = getToken();

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
}

export async function getAccommodations() {
  const response = await api.get("/accommodations");
  return response.data;
}

export async function getAccommodationById(id) {
  const response = await api.get(`/accommodations/${id}`);
  return response.data;
}

export async function createAccommodation(accommodationData) {
  const response = await api.post("/accommodations", accommodationData, getAuthConfig());
  return response.data;
}

export async function updateAccommodation(id, accommodationData) {
  const response = await api.put(`/accommodations/${id}`, accommodationData, getAuthConfig());
  return response.data;
}

export async function deleteAccommodation(id) {
  const response = await api.delete(`/accommodations/${id}`, getAuthConfig());
  return response.data;
}

export async function createReservation(reservationData) {
  const response = await api.post("/reservations", reservationData, getAuthConfig());
  return response.data;
}

export async function getReservations() {
  const response = await api.get("/reservations", getAuthConfig());
  return response.data;
}

export async function deleteReservation(id) {
  const response = await api.delete(`/reservations/${id}`, getAuthConfig());
  return response.data;
}

export async function loginUser(loginData) {
  const response = await api.post("/users/login", loginData);
  return response.data;
}

export async function registerUser(registerData) {
  const response = await api.post("/users/register", registerData);
  return response.data;
}
