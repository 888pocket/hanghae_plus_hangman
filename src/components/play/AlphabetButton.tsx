import { CloseOutlined } from "@mui/icons-material";
import { useState } from "react";

export default function AlphabetButton({
  key,
  alphabet,
  wrong,
  disabled,
  onClick,
}: {
  key: string;
  alphabet: string;
  wrong: string[];
  disabled: boolean;
  onClick: any;
}) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <button
      key={key}
      onClick={() => {
        setIsSelected(true);
        onClick(alphabet);
      }}
      disabled={disabled}
      className="text-lg aspect-square rounded-2xl font-semibold p-2.5 relative"
      style={{
        color: !isSelected
          ? "#4A5568"
          : wrong.indexOf(alphabet) > -1
          ? "#FEB2B2"
          : "#4299E1",
        backgroundColor: !isSelected
          ? "#F7FAFC"
          : wrong.indexOf(alphabet) > -1
          ? "#FFF5F5"
          : "#EBF8FF",
      }}
    >
      <span className="block w-6 h-6" style={{ lineHeight: "normal" }}>
        {alphabet}
      </span>
      {wrong.indexOf(alphabet) > -1 && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400">
          <CloseOutlined fontSize="large" />
        </span>
      )}
    </button>
  );
}
