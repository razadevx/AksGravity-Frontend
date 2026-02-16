import { useState } from "react";
import { useDispatch } from "react-redux";
import { returnPurchaseThunk, getPurchases } from "../../store/slices/purchaseSlice";

const ReturnModal = ({ purchase, onClose }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!qty || Number(qty) <= 0) return;

    await dispatch(
      returnPurchaseThunk({
        purchaseId: purchase._id,
        materialId: purchase.items[0].materialId._id,
        qty: Number(qty),
        rate: purchase.items[0].rate,
      })
    );

    dispatch(getPurchases());
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>↩ Return Purchase</h3>

        <p>
          <strong>Invoice:</strong> {purchase.invoiceNo}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter return qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            required
            style={input}
          />

          <div style={{ textAlign: "right", marginTop: 20 }}>
            <button type="button" onClick={onClose} style={cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={returnBtn}>
              Confirm Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  background: "#fff",
  padding: 30,
  borderRadius: 12,
  width: 420,
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
};

const cancelBtn = {
  background: "#eee",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
  marginRight: 10,
};

const returnBtn = {
  background: "#e53935",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
};

export default ReturnModal;
