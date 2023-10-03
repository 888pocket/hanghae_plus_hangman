import { TimerOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

const Timer = ({ isRunning }: { isRunning: boolean }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000); // 1초마다 작업 수행
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  return (
    <div className="flex items-center justify-center">
      <TimerOutlined className="mr-1" />
      <div>{`${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
        Math.floor(seconds % 60)
      ).padStart(2, "0")}`}</div>
    </div>
  );
};

export default Timer;
