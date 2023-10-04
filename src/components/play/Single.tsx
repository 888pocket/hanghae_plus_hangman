import { alphabets } from "@/constants/alphabets";
import { domain } from "@/constants/domain";
import { HP } from "@/constants/HP";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RestartButton from "./RestartButton";
import DashBoard from "./DashBoard";
import Words from "./Words";
import AlphabetButton from "./AlphabetButton";
import { useQuery } from "react-query";

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
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);

  const { data, isLoading, isError } = useQuery("fetchData", async () => {
    const response = await fetch(
      `${domain}/api/hints?answer=${answer}&category=${category}`
    );
    const jsonData = await response.json();
    return jsonData;
  });

  useEffect(() => {
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
