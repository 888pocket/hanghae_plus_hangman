import { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryButton from "../components/main/CategoryButton";
import StartButton from "../components/main/StartButton";
import { categories } from "../constants/categories";

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");

  const onClick = (mode: "single" | "multi") => {
    router.push(`/play/${mode}?category=${selectedCategory}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 lg:p-24">
      <div className="grid grid-cols-2 lg:grid-cols-8 gap-2">
        {categories.map((category) => (
          // eslint-disable-next-line react/jsx-key
          <CategoryButton
            category={category}
            selected={category == selectedCategory}
            onClick={setSelectedCategory}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <StartButton
          disabled={selectedCategory == ""}
          category={"1인 Play"}
          onClick={() => onClick("single")}
        />
        <StartButton
          disabled={selectedCategory == ""}
          category={"2인 Play"}
          onClick={() => onClick("multi")}
        />
      </div>
    </main>
  );
}
