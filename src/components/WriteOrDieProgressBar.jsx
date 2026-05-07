'use client';
import React from "react";
import { motion } from "framer-motion";
import { useTimer } from "./useTimer";

const WriteOrDieProgressBar = ({
  duration = 10,
  isRunning = false,
  onComplete,
  height = "3px",
}) => {
  const { progress, remaining } = useTimer({
    duration,
    isRunning,
    onComplete,
  });

  if (!isRunning && progress === 0) return null;

  return (
    <div className="progress-track">
      <motion.div
        className="progress-fill"
        style={{ height }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0.05 }}
      />
    </div>
  );
};

export default WriteOrDieProgressBar;
