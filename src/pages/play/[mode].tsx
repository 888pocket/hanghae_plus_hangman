import MetaConfig from "@/components/MetaConfig";
import { alphabets } from "@/constants/alphabets";
import { answerList, categoryList } from "@/constants/answerList";
import { domain } from "@/constants/domain";
import { imageList } from "@/constants/imageList";
import { Help } from "@mui/icons-material";
import { Backdrop, Button, CircularProgress, Tooltip } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// export async function getServerSideProps(context: any) {
//   console.log("server side");
//   const { query } = context;
//   const category = query.category || "all";

//   const response = await fetch(`${domain}/api/openAi?category=${category}`);
//   const data = await response.json();

//   return {
//     props: {
//       initialData: data.result,
//     },
//   };
// }

export default function Test() {
  const router = useRouter();
  const { mode, category } = router.query;
  const { asPath } = useRouter();

  const [selected, setSeleted] = useState([] as string[]);
  const [wrong, setWrong] = useState([] as string[]);
  const [right, setRight] = useState([] as string[]);
  const [answerChar, setAnswerChar] = useState([] as string[]);
  const [toggleBackDrop, setToggleBackDrop] = useState(true);
  const [answer, setAnswer] = useState("color");

  useEffect(() => {
    let answers = [] as string[];
    switch (category) {
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
    setAnswer(
      answers[Math.floor(Math.random() * answers.length)].toUpperCase()
    );
  }, [category, mode]);

  useEffect(() => {
    const temp: string[] = [];
    for (let i = 0; i < answer.length; i++) {
      temp.push(answer.charAt(i));
    }
    setAnswerChar(temp);
    setToggleBackDrop(false);
  }, [answer]);

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

  const meta = {
    title: "행맨 | 플레이",
    image: "/og_800.png",
    description: `행맨 플레이하기 / 카테고리 : ${category}`,
    url: domain + asPath,
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-12">
      <MetaConfig {...meta} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={toggleBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="dashboard-section flex-row lg:flex-col justify-between">
        <div>틀린 횟수 : {wrong.length}</div>
        <div>디버깅을 위한 정답 : {answer}</div>
      </div>
      <div className="image-section">
        <Image
          src={imageList[wrong.length]}
          alt={"hangman"}
          width={600}
          height={600}
        />
      </div>
      {wrong.length >= 8 && (
        <div className="result-section text-red-500">실패 했습니다.</div>
      )}
      {answerChar.length > 0 &&
        answerChar.filter((answer) => right.indexOf(answer) < 0).length < 1 && (
          <div className="result-section text-blue-500">성공 했습니다.</div>
        )}
      <div className="answer-section flex gap-1 text-3xl">
        {wrong.length >= 8
          ? answerChar.map((answer, index) => (
              <span
                key={index + answer}
                className={
                  right.indexOf(answer) > -1 ? "" : "text-red-500 underline"
                }
              >
                {answer}
              </span>
            ))
          : answerChar.map((answer, index) => (
              <span key={answer + index}>
                {right.indexOf(answer) > -1 || wrong.length >= 8 ? answer : "_"}
              </span>
            ))}
      </div>
      <div className="alphabet-section grid grid-cols-5 lg:grid-cols-8 gap-2">
        {alphabets.map((alphabet, index) => (
          <Button
            key={index}
            onClick={() => onClick(alphabet)}
            disabled={
              wrong.length >= 8 ||
              (answerChar.length > 0 &&
                answerChar.filter((answer) => right.indexOf(answer) < 0)
                  .length < 1) ||
              selected.indexOf(alphabet) > -1
            }
            style={{ backgroundColor: "red" }}
          >
            {alphabet}
          </Button>
        ))}
      </div>
      {mode == "single" &&
      (wrong.length >= 8 ||
        (answerChar.length > 0 &&
          answerChar.filter((answer) => right.indexOf(answer) < 0).length <
            1)) ? (
        <div>
          <div className="flex gap-4">
            <Button onClick={() => router.push("/")}>처음으로</Button>
            <Button onClick={() => router.reload()}>다시하기</Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
