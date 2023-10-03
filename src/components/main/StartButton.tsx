export default function StartButton({
  disabled,
  category,
  onClick,
}: {
  disabled: boolean;
  category: string;
  onClick: any;
}) {
  return (
    <button
      style={{
        color: "#FFFFFF",
        backgroundColor: "#2D3748",
        opacity: disabled ? "0.2" : "1",
      }}
      className="w-40 py-2.5 px-4 font-semibold rounded-2xl text-lg"
      disabled={disabled}
      onClick={onClick}
    >
      {category}
    </button>
  );
}
