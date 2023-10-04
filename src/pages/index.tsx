import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryButton from "../components/main/CategoryButton";
import StartButton from "../components/main/StartButton";
import { domain } from "@/constants/domain";
import MetaConfig from "@/components/MetaConfig";
import { answerList, categoryList } from "@/constants/answerList";
import Single from "@/components/play/Single";

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [phase, setPhase] = useState(0);
  const [randomWords, setRandomWords] = useState([] as string[]);
  const [selectedWord, setSelectedWord] = useState("");
  const selectedIndex = [] as number[];

  useEffect(() => {
    if (phase == 1) {
      let answers = [] as string[];
      switch (selectedCategory) {
        case "color":
          answers = answerList.color;
          break;
        case "animal":
          answers = answerList.animal;
          break;
        case "country":
          answers = answerList.country;
          break;
        case "food":
          answers = answerList.food;
          break;
        case "fruit":
          answers = answerList.fruit;
          break;
        case "profession":
          answers = answerList.profession;
          break;
        case "furniture":
          answers = answerList.furniture;
          break;
        case "brand":
          answers = answerList.brand;
          break;
        default:
          answers = answerList.color;
      }

      for (let i = 0; i < 3; i++) {
        let randomNum = Math.floor(Math.random() * answers.length);
        if (selectedIndex.indexOf(randomNum) > -1) {
          i--;
          continue;
        }
        selectedIndex.push(randomNum);
        setRandomWords((v) => [...v, answers[randomNum].toUpperCase()]);
      }
    }
  }, [phase]);

  const onClick = (mode: "single" | "multi") => {
    router.push(
      `/play/${mode}?category=${selectedCategory}&answer=${selectedWord}`
    );
  };

  const meta = {
    title: "행맨 | 메인",
    image: "/og_800.png",
    description: `행맨 플레이하러 가기`,
    url: domain,
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:p-14 justify-between lg:justify-start">
      <MetaConfig {...meta} />
      {phase == 0 && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:mb-10">
            {categoryList.map((category) => (
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
              category={"1인 게임 시작"}
              onClick={() => setPhase(1)}
            />
            <StartButton
              disabled={true}
              category={"2인 게임 시작"}
              onClick={() => onClick("multi")}
            />
          </div>
        </>
      )}
      {phase == 1 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:mb-10">
            {randomWords.map((word) => (
              // eslint-disable-next-line react/jsx-key
              <CategoryButton
                category={word}
                selected={word == selectedWord}
                onClick={setSelectedWord}
              />
            ))}
          </div>
          <div>
            <StartButton
              disabled={selectedWord == ""}
              category={"시작하기"}
              onClick={() => {
                setPhase(2);
              }}
            />
          </div>
        </>
      )}
      {phase == 2 && (
        <Single answer={selectedWord} category={selectedCategory} />
      )}
    </main>
  );
}
