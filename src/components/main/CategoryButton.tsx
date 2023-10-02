export default function CategoryButton({
  category,
  selected,
  onClick,
}: {
  category: string;
  selected: boolean;
  onClick: any;
}) {
  return (
    <button
      className={
        selected
          ? "py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500"
          : "py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
      }
      onClick={() => {
        onClick(category);
      }}
    >
      {category}
    </button>
  );
}
