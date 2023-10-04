import { HP } from "@/constants/HP";

export default function Words({
  answerChar,
  wrong,
  right,
  isDone,
}: {
  answerChar: string[];
  wrong: string[];
  right: string[];
  isDone: boolean;
}) {
  return (
    <div
      style={{ border: "1px solid #718096" }}
      className="answer-section flex gap-2.5 rounded-lg text-3xl py-2.5 px-6"
    >
      {isDone
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
              {right.indexOf(answer) > -1 || wrong.length >= HP ? answer : "_"}
            </span>
          ))}
    </div>
  );
}
