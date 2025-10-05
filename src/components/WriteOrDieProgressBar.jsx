'use client';
import React from "react";
import { motion } from "framer-motion";
import { useTimer } from "./useTimer"; 


const WriteOrDieProgressBar = ({
  duration = 10,
  isRunning = false,
  onComplete,
  color = "#89CFF0",
  height = "4px",
  showTime = true,
}) => {
  const { progress, remaining } = useTimer({
    duration,
    isRunning,
    onComplete,
  });

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <motion.div
        className="progress-bar"
        style={{
          backgroundColor: color,
          height: height,
        }}

        animate={{ width: `${progress}%` }}

        transition={{ ease: "linear", duration: 0.05 }}
      />
      {showTime && progress < 100 && (
        <div className="absolute top-full right-2 mt-1 text-xs text-gray-600">
          {remaining}s
        </div>
      )}
    </div>
  );
};

export default WriteOrDieProgressBar;