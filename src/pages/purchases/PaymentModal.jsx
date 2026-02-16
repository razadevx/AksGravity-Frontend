import { useState } from "react";
import { useDispatch } from "react-redux";
import { payPurchaseThunk, getPurchases } from "../../store/slices/purchaseSlice";

const PaymentModal = ({ purchase, onClose }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(amount) <= 0) return;

    await dispatch(
      payPurchaseThunk({
        purchaseId: purchase._id,
        amount: Number(amount),
      })
    );

    dispatch(getPurchases());
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginBottom: "15px" }}>
          💰 Pay Purchase
        </h3>

        <div style={{ marginBottom: "15px", fontSize: "14px" }}>
          <strong>Invoice:</strong> {purchase.invoiceNo} <br />
          <strong>Remaining:</strong> Rs. {purchase.remainingBalance}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={inputStyle}
          />

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <button type="button" onClick={onClose} style={cancelBtn}>
              Cancel
            </button>

            <button type="submit" style={payBtn}>
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  width: "420px",
  borderRadius: "14px",
  padding: "30px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const cancelBtn = {
  background: "#eee",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  marginRight: "10px",
  cursor: "pointer",
};

const payBtn = {
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default PaymentModal;

