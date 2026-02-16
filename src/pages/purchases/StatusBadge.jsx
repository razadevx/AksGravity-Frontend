const StatusBadge = ({ status }) => {
  const styles = {
    Paid: { background: "#e8f5e9", color: "#2e7d32" },
    Pending: { background: "#fff3e0", color: "#ef6c00" },
  };

  return (
    <span
      style={{
        padding: "5px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        ...styles[status],
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;

