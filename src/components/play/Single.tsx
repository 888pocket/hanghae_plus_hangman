import { alphabets } from "@/constants/alphabets";
import { domain } from "@/constants/domain";
import { HP } from "@/constants/HP";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RestartButton from "./RestartButton";
import { Data } from "@/pages/api/hints";
import DashBoard from "./DashBoard";
import Words from "./Words";
import AlphabetButton from "./AlphabetButton";

export default function Single({
  answer,
  category,
}: {
  answer: string;
  category: string;
}) {
  const router = useRouter();

  const [selected, setSeleted] = useState([] as string[]);
  const [wrong, setWrong] = useState([] as string[]);
  const [right, setRight] = useState([] as string[]);
  const [answerChar, setAnswerChar] = useState([] as string[]);
  const [data, setData] = useState({} as Data);
  const [isLoading, setIsLoading] = useState(true);
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading) return;
      try {
        const response = await fetch(
          `${domain}/api/hints?answer=${answer}&category=${category}`
        );
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("데이터를 가져오는 중 에러 발생:", error);
        setIsLoading(false);
      }
    };
    fetchData();

    const temp: string[] = [];
    for (let i = 0; i < answer.length; i++) {
      temp.push(answer.charAt(i));
    }
    setAnswerChar(temp);
  }, []);

  useEffect(() => {
    if (
      answerChar.length > 0 &&
      answerChar.filter((answer) => right.indexOf(answer) < 0).length < 1
    )
      setIsWin(true);
    if (wrong.length >= HP) setIsLose(true);
  }, [wrong, right, answerChar]);

  const onClick = (alphabet: string) => {
    setSeleted([...selected, alphabet]);
    if (answerChar.indexOf(alphabet) > -1) {
      // 정답
      setRight([...right, alphabet]);
    } else {
      // 오답
      setWrong([...wrong, alphabet]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-8">
      <DashBoard
        wrongNum={wrong.length}
        hints={!isLoading && data.result.split("\n")}
        isWin={isWin}
        isLose={isLose}
        isLoading={isLoading}
      />
      <Words
        answerChar={answerChar}
        wrong={wrong}
        right={right}
        isDone={isWin || isLose}
      />
      <div className="alphabet-section grid grid-cols-5 lg:grid-cols-11 gap-3">
        {alphabets.map((alphabet, index) => (
          <AlphabetButton
            key={alphabet + index}
            alphabet={alphabet}
            wrong={wrong}
            disabled={isWin || isLose}
            onClick={onClick}
          />
        ))}
      </div>
      {(isWin || isLose) && (
        <div>
          <div className="flex gap-4">
            <RestartButton onClick={() => router.reload()} />
          </div>
        </div>
      )}
    </div>
  );
}
