const PurchaseDetailsDrawer = ({ purchase, onClose }) => {
  return (
    <div style={drawerOverlay} onClick={onClose}>
      <div style={drawer} onClick={(e) => e.stopPropagation()}>
        <div style={header}>
          <h3>📦 Purchase Details</h3>
          <button style={closeButton} onClick={onClose}>✖</button>
        </div>

        <p><strong>Invoice:</strong> {purchase.invoiceNo}</p>
        <p><strong>Supplier:</strong> {purchase.supplierId.supplierName}</p>
        <p><strong>Total:</strong> Rs. {purchase.totalAmount}</p>
        <p><strong>Paid:</strong> Rs. {purchase.paidAmount}</p>
        <p><strong>Returned:</strong> Rs. {purchase.returnedAmount}</p>

        <hr />

        {purchase.items.map((item, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <strong>{item.materialId.materialName}</strong>
            <div>Qty: {item.qty}</div>
            <div>Rate: {item.rate}</div>
            <div>Amount: {item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const drawerOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "flex-end",
};

const drawer = {
  width: 400,
  background: "#fff",
  padding: 25,
  boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const closeButton = {
  border: "none",
  background: "transparent",
  fontSize: 18,
  cursor: "pointer",
};

export default PurchaseDetailsDrawer;
