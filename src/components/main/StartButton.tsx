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
      className={
        disabled
          ? ""
          : "py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
      }
      disabled={disabled}
      onClick={onClick}
    >
      {category}
    </button>
  );
}
