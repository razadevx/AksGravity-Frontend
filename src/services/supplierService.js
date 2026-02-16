import axios from "./axios";

const API = "/api/master/suppliers";

export const fetchSupplierLedger = (supplierId) =>
  axios.get(`${API}/${supplierId}/ledger`);
