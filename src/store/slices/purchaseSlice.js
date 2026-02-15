import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/purchaseService";

export const getPurchases = createAsyncThunk(
  "purchase/getAll",
  async () => {
    const { data } = await api.fetchPurchases();
    return data;
  }
);

export const addPurchase = createAsyncThunk(
  "purchase/add",
  async (payload) => {
    const { data } = await api.createPurchase(payload);
    return data;
  }
);

export const payPurchaseThunk = createAsyncThunk(
  "purchase/pay",
  async (payload) => {
    const { data } = await api.payPurchase(payload);
    return data.result;
  }
);

export const returnPurchaseThunk = createAsyncThunk(
  "purchase/return",
  async (payload) => {
    const { data } = await api.returnPurchase(payload);
    return data.result;
  }
);

const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    purchases: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPurchases.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPurchases.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize payload to an array in case the API returns an object
        // (e.g., { data: [...]} or { result: [...] }) to avoid runtime errors
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.purchases = payload;
        } else if (payload && Array.isArray(payload.data)) {
          state.purchases = payload.data;
        } else if (payload && Array.isArray(payload.result)) {
          state.purchases = payload.result;
        } else {
          state.purchases = [];
        }
      });
  },
});

export default purchaseSlice.reducer;
