export default function Button({ children, ...props }) {
  return (
    <button
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
      {...props}
    >
      {children}
    </button>
  );
}
