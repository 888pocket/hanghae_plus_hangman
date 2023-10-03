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
      style={{
        minWidth: 160,
        color: selected ? "#4299E1" : "#4A5568",
        backgroundColor: selected ? "#EBF8FF" : "#F7FAFC",
      }}
      className="w-32 py-2.5 px-4 font-semibold rounded-2xl text-lg"
      onClick={() => {
        onClick(category);
      }}
    >
      {category}
    </button>
  );
}
