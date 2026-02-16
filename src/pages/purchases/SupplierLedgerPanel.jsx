import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierLedgerThunk } from "../../store/slices/supplierSlice";

const SupplierLedgerPanel = ({ supplierId, onClose }) => {
  const dispatch = useDispatch();
  const { ledger } = useSelector((state) => state.suppliers);

  useEffect(() => {
    if (supplierId) {
      dispatch(getSupplierLedgerThunk(supplierId));
    }
  }, [dispatch, supplierId]);

  return (
    <div style={overlay} onClick={onClose}>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <div style={header}>
          <h3>📒 Supplier Ledger</h3>
          <button style={closeButton} onClick={onClose}>✖</button>
        </div>

        {ledger.length === 0 ? (
          <div style={emptyState}>
            <p>No ledger entries found</p>
          </div>
        ) : (
          ledger.map((entry) => (
            <div key={entry._id} style={ledgerItem}>
              <div style={ledgerRow}>
                <span>{entry.type}</span>
                <span>Rs. {entry.amount}</span>
              </div>

              <div style={ledgerMeta}>
                <small>
                  {entry.createdAt
                    ? new Date(entry.createdAt).toLocaleDateString()
                    : ""}
                </small>
                <small>Balance: Rs. {entry.balanceAfter}</small>
              </div>

              {entry.remarks && (
                <div style={ledgerRemarks}>{entry.remarks}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "flex-end",
};

const panel = {
  width: 450,
  background: "#fff",
  padding: 25,
  borderLeft: "1px solid #eee",
  overflowY: "auto",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
};

const closeButton = {
  border: "none",
  background: "transparent",
  fontSize: 18,
  cursor: "pointer",
};

const emptyState = {
  padding: 16,
  fontSize: 13,
  color: "#777",
};

const ledgerItem = {
  background: "#f9fafc",
  padding: 14,
  borderRadius: 10,
  marginBottom: 12,
  border: "1px solid #f0f0f0",
};

const ledgerRow = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: 600,
};

const ledgerMeta = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 12,
  color: "#777",
  marginTop: 4,
};

const ledgerRemarks = {
  fontSize: 13,
  marginTop: 6,
  color: "#555",
};

export default SupplierLedgerPanel;
