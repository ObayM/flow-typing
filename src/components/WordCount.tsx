"use client";

type WordCountProps = {
  count: number;
  speed: number;
};

const WordCount = ({ count, speed }: WordCountProps) => {
  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {count} {count === 1 ? "word" : "words"}
      {speed > 0 && ` • ${speed} WPM`}
    </div>
  );
};

export default WordCount;

