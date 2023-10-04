import { imageList } from "@/constants/imageList";
import Timer from "./Timer";
import { Favorite } from "@mui/icons-material";
import Image from "next/image";
import { HP } from "@/constants/HP";

export default function DashBoard({
  wrongNum,
  hints,
  isLoading,
  isWin,
  isLose,
}: {
  wrongNum: number;
  hints: string[];
  isLoading: boolean;
  isWin: boolean;
  isLose: boolean;
}) {
  return (
    <div
      style={{ border: "1px solid #E2E8F0" }}
      className="dashboard-section flex rounded-2xl flex-col items-center gap-6 justify-between py-8 px-10"
    >
      <div className="text-center flex flex-col gap-2">
        <div className="text-base font-bold flex items-center justify-center">
          <Favorite className="text-red-400 mr-1" /> 남은 목숨 : {HP - wrongNum}
          개
        </div>
        <div className="text-base font-bold">
          <Timer isRunning={!(isWin || isLose)} />
        </div>
      </div>
      <div className="image-section">
        <Image
          src={imageList[wrongNum]}
          alt={"hangman"}
          width={387.273}
          height={240}
        />
      </div>
      {!isLoading && wrongNum > 0 && wrongNum < HP && (
        <div className="text-sm lg:text-base text-white font-semibold bg-black px-4 py-2 rounded-lg">
          힌트 {hints[wrongNum - 1]}
        </div>
      )}
      {isLose && (
        <div className="result-section text-red-500">실패 했습니다.</div>
      )}
      {isWin && (
        <div className="result-section text-blue-500">성공 했습니다.</div>
      )}
    </div>
  );
}
