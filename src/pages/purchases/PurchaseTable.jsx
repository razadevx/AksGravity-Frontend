import React, { useState } from "react";
import PaymentModal from "./PaymentModal";
import ReturnModal from "./ReturnModal";
import PurchaseDetailsDrawer from "./PurchaseDetailsDrawer";
import SupplierLedgerPanel from "./SupplierLedgerPanel";
import StatusBadge from "./StatusBadge";

const actionBtn = (color) => ({
  background: color,
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  marginRight: "6px",
  cursor: "pointer",
  fontSize: "12px",
});

const PurchaseTable = ({ purchases }) => {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [returnModal, setReturnModal] = useState(null);
  const [detailsDrawer, setDetailsDrawer] = useState(null);
  const [ledgerPanel, setLedgerPanel] = useState(null);

  return (
    <>
    <table width="100%" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr
          style={{
            textAlign: "left",
            borderBottom: "1px solid #eee",
            fontSize: "14px",
          }}
        >
          <th>Invoice</th>
          <th>Supplier</th>
          <th>Total</th>
          <th>Paid</th>
          <th>Remaining</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {purchases.map((p) => (
          <tr
            key={p._id}
            style={{ borderBottom: "1px solid #f5f5f5", height: "55px" }}
          >
            <td>{p.invoiceNo}</td>
            <td>{p.supplierId?.supplierName}</td>
            <td>Rs. {p.totalAmount}</td>
            <td>Rs. {p.paidAmount}</td>
            <td>Rs. {p.remainingBalance}</td>
            <td>
              <StatusBadge status={p.status} />
            </td>
            <td>
              <button
                style={actionBtn("#4CAF50")}
                onClick={() => setSelectedPurchase(p)}
              >
                Pay
              </button>
              <button
                style={actionBtn("#E53935")}
                onClick={() => setReturnModal(p)}
              >
                Return
              </button>
              <button
                style={actionBtn("#1976D2")}
                onClick={() => setDetailsDrawer(p)}
              >
                View
              </button>
              <button
                style={actionBtn("#6C4DF6")}
                onClick={() => setLedgerPanel(p.supplierId._id)}
              >
                Ledger
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {selectedPurchase && (
      <PaymentModal
        purchase={selectedPurchase}
        onClose={() => setSelectedPurchase(null)}
      />
    )}
    {returnModal && (
      <ReturnModal
        purchase={returnModal}
        onClose={() => setReturnModal(null)}
      />
    )}
    {detailsDrawer && (
      <PurchaseDetailsDrawer
        purchase={detailsDrawer}
        onClose={() => setDetailsDrawer(null)}
      />
    )}
    {ledgerPanel && (
      <SupplierLedgerPanel
        supplierId={ledgerPanel}
        onClose={() => setLedgerPanel(null)}
      />
    )}
    </>
  );
};

export default PurchaseTable;
