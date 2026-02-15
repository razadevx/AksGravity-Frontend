import axios from "./axios";

const API = "/api/purchases";

export const fetchPurchases = () =>
  axios.get(API);

export const createPurchase = (data) =>
  axios.post(API, data);

export const payPurchase = (data) =>
  axios.post(`${API}/pay`, data);

export const returnPurchase = (data) =>
  axios.post(`${API}/return`, data);
