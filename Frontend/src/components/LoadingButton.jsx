export default function LoadingButton({ loading, children }) {
  return (
    <button
      disabled={loading}
      className={`w-full py-2 mt-2 text-white rounded ${
        loading ? "bg-gray-400" : "bg-black"
      }`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
