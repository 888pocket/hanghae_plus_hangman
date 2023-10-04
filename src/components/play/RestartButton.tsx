export default function RestartButton({ onClick }: { onClick: any }) {
  return (
    <button
      style={{
        color: "#FFFFFF",
        backgroundColor: "#2D3748",
      }}
      className="w-40 py-2.5 px-4 font-semibold rounded-2xl text-lg"
      onClick={onClick}
    >
      다시하기
    </button>
  );
}
