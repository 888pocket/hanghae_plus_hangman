import MetaConfig from "@/components/MetaConfig";
import { alphabets } from "@/constants/alphabets";
import { answerList, categoryList } from "@/constants/answerList";
import { domain } from "@/constants/domain";
import { imageList } from "@/constants/imageList";
import { Favorite, Help } from "@mui/icons-material";
import { Backdrop, Button, CircularProgress, Tooltip } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const HP = 8;

export default function Single({
  answer,
  category,
}: {
  answer: string;
  category: string;
}) {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery("fetchData", async () => {
    const response = await fetch(
      `${domain}/api/hints?answer=${answer}&category=${category}`
    );
    const jsonData = await response.json();
    setToggleBackDrop(false);
    return jsonData;
  });

  const [selected, setSeleted] = useState([] as string[]);
  const [wrong, setWrong] = useState([] as string[]);
  const [right, setRight] = useState([] as string[]);
  const [answerChar, setAnswerChar] = useState([] as string[]);
  const [toggleBackDrop, setToggleBackDrop] = useState(true);

  useEffect(() => {
    const temp: string[] = [];
    for (let i = 0; i < answer.length; i++) {
      temp.push(answer.charAt(i));
    }
    setAnswerChar(temp);
  }, []);

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

  return isLoading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={toggleBackDrop}
    >
      힌트를 불러오는 중...
      <CircularProgress color="inherit" className="ml-4" />
    </Backdrop>
  ) : (
    <div className="flex min-h-screen flex-col items-center gap-8 p-12 lg:p-14">
      <div
        style={{ border: "1px solid #E2E8F0" }}
        className="dashboard-section flex rounded-2xl flex-row items-center gap-6 lg:flex-col justify-between py-8 px-10"
      >
        <div className="text-center">
          <div className="text-base font-bold flex items-center justify-center">
            <Favorite className="text-red-400 mr-1" /> 남은 목숨 :{" "}
            {HP - wrong.length}개
          </div>
          <div className="text-base font-bold">
            디버깅을 위한 정답 : {answer}
          </div>
        </div>
        <div className="image-section">
          <Image
            src={imageList[wrong.length]}
            alt={"hangman"}
            width={387.273}
            height={240}
          />
        </div>
        {wrong.length > 0 && wrong.length < HP && (
          <div className="text-sm lg:text-base text-white font-semibold bg-black px-4 py-2 rounded-lg">
            힌트 {data.result.split("\n")[wrong.length - 1]}
          </div>
        )}
        {wrong.length >= 8 && (
          <div className="result-section text-red-500">실패 했습니다.</div>
        )}
        {answerChar.length > 0 &&
          answerChar.filter((answer) => right.indexOf(answer) < 0).length <
            1 && (
            <div className="result-section text-blue-500">성공 했습니다.</div>
          )}
      </div>
      <div
        style={{ border: "1px solid #718096" }}
        className="answer-section flex gap-2.5 rounded-lg text-3xl py-2.5 px-6"
      >
        {wrong.length >= HP
          ? answerChar.map((answer, index) => (
              <span
                key={index + answer}
                className={
                  right.indexOf(answer) > -1
                    ? "text-blue-500"
                    : "text-red-500 underline"
                }
              >
                {answer}
              </span>
            ))
          : answerChar.map((answer, index) => (
              <span key={answer + index}>
                {right.indexOf(answer) > -1 || wrong.length >= HP
                  ? answer
                  : "_"}
              </span>
            ))}
      </div>
      <div className="alphabet-section grid grid-cols-5 lg:grid-cols-11 gap-3">
        {alphabets.map((alphabet, index) => (
          <Button
            key={index}
            onClick={() => onClick(alphabet)}
            disabled={
              wrong.length >= HP ||
              (answerChar.length > 0 &&
                answerChar.filter((answer) => right.indexOf(answer) < 0)
                  .length < 1) ||
              selected.indexOf(alphabet) > -1
            }
            className="text-lg aspect-square rounded-2xl font-semibold"
            style={{
              color:
                selected.indexOf(alphabet) < 0
                  ? "#4A5568"
                  : wrong.indexOf(alphabet) > -1
                  ? "#FEB2B2"
                  : "#4299E1",
              backgroundColor:
                selected.indexOf(alphabet) < 0
                  ? "#F7FAFC"
                  : wrong.indexOf(alphabet) > -1
                  ? "#FFF5F5"
                  : "#EBF8FF",
            }}
          >
            <span>{alphabet}</span>
          </Button>
        ))}
      </div>
      {wrong.length >= HP ||
      (answerChar.length > 0 &&
        answerChar.filter((answer) => right.indexOf(answer) < 0).length < 1) ? (
        <div>
          <div className="flex gap-4">
            <Button onClick={() => router.reload()}>다시하기</Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
