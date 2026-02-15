import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchases } from "../../store/slices/purchaseSlice";
import { useState } from "react";
import CreatePurchase from "./CreatePurchase";
import DashboardLayout from "../../components/dashboard/DashboardLayout";


const PurchaseList = () => {
  const dispatch = useDispatch();
  const purchaseState = useSelector((state) => state.purchase);
  const purchases = purchaseState?.purchases ?? [];
  const loading = purchaseState?.loading ?? false;

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (dispatch && typeof getPurchases === "function") {
      dispatch(getPurchases()).catch((err) => {
        // log to help debug runtime errors during the thunk
        // eslint-disable-next-line no-console
        console.error("getPurchases failed:", err);
      });
    }
  }, [dispatch]);

  // debug info to help trace render-time problems
  // eslint-disable-next-line no-console
  console.debug("PurchaseList render", { purchaseState, purchases, loading });

  return (
    <div dir="ltr">
      <DashboardLayout>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">📦 Purchase Management</h2>

          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:opacity-95"
          >
            + New Purchase
          </button>
        </div>

        {showForm && (
          <CreatePurchase onClose={() => setShowForm(false)} />
        )}

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <table className="w-full">
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
              <th>Invoice</th>
              <th>Supplier</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Returned</th>
              <th>Remaining</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((p) => (
              <tr key={p._id} style={{ borderBottom: "1px solid #f3f3f3" }}>
                <td>{p.invoiceNo}</td>
                <td>{p.supplierId?.supplierName}</td>
                <td>Rs. {p.totalAmount}</td>
                <td>Rs. {p.paidAmount}</td>
                <td>Rs. {p.returnedAmount}</td>
                <td>Rs. {p.remainingBalance}</td>
                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      background:
                        p.status === "Paid"
                          ? "#E6F9F0"
                          : "#FFF4E5",
                      color:
                        p.status === "Paid"
                          ? "#0F9D58"
                          : "#F57C00"
                    }}
                  >
                    {p.status}
                  </span>
                </td>

                <td>
                  {p.remainingBalance > 0 && (
                    <button
                      style={{
                        background: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        marginRight: "8px",
                        cursor: "pointer"
                      }}
                    >
                      Pay
                    </button>
                  )}

                  <button
                    style={{
                      background: "#E53935",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}

            {purchases.length === 0 && (
              <tr>
                <td colSpan="8" style={{ padding: "20px", textAlign: "center" }}>
                  No purchases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </DashboardLayout>
    </div>
  );
};

export default PurchaseList;
