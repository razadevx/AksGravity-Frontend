import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/supplierService";

export const getSupplierLedgerThunk = createAsyncThunk(
  "suppliers/getLedger",
  async (supplierId) => {
    const { data } = await api.fetchSupplierLedger(supplierId);
    return data;
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState: {
    ledger: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSupplierLedgerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSupplierLedgerThunk.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.ledger = payload;
        } else if (payload && Array.isArray(payload.ledger)) {
          state.ledger = payload.ledger;
        } else if (payload && Array.isArray(payload.data)) {
          state.ledger = payload.data;
        } else if (payload && payload.data && Array.isArray(payload.data.ledger)) {
          state.ledger = payload.data.ledger;
        } else if (payload && Array.isArray(payload.result)) {
          state.ledger = payload.result;
        } else if (payload && payload.result && Array.isArray(payload.result.ledger)) {
          state.ledger = payload.result.ledger;
        } else {
          state.ledger = [];
        }
      })
      .addCase(getSupplierLedgerThunk.rejected, (state) => {
        state.loading = false;
        state.ledger = [];
      });
  },
});

export default supplierSlice.reducer;
