import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchases } from "../../store/slices/purchaseSlice";
import { useState } from "react";
import CreatePurchase from "./CreatePurchase";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";
import SummaryCard from "../../components/ui/SummaryCard";
import PurchaseTable from "./PurchaseTable";


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
        <PageContainer
          title="📦 Purchase Management"
          action={
            <button
              onClick={() => setShowForm(true)}
              style={{
                background: "#6C4DF6",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              + New Purchase
            </button>
          }
        >
          {showForm && <CreatePurchase onClose={() => setShowForm(false)} />}

          {/* SUMMARY CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <SummaryCard
              label="Total Purchases"
              value={`Rs. ${purchases.reduce((a, b) => a + (b.totalAmount || 0), 0)}`}
            />
            <SummaryCard
              label="Pending Amount"
              value={`Rs. ${purchases.reduce((a, b) => a + (b.remainingBalance || 0), 0)}`}
            />
            <SummaryCard
              label="Paid Amount"
              value={`Rs. ${purchases.reduce((a, b) => a + (b.paidAmount || 0), 0)}`}
            />
          </div>

          {/* TABLE CARD */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <PurchaseTable purchases={purchases} />
          </div>
        </PageContainer>
      </DashboardLayout>
    </div>
  );
};

export default PurchaseList;
