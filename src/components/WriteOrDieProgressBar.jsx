import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";


const WriteOrDieProgressBar = ({
  duration = 10,
  color = "#89CFF0",
  height = "4px",
  showTime = true,
  autoStart = false,
  StartOn = true,
  StopOn = false,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(duration);
  const startTimeRef = useRef(null);
  const elapsedBeforePauseRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {

    const update = () => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000 + elapsedBeforePauseRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      setRemaining(Math.max(duration - elapsed, 0).toFixed(1));

      if (elapsed < duration) {
        animationFrameRef.current = requestAnimationFrame(update);
      } else if (onComplete) {
        onComplete();
      }
    };

    if ((autoStart || StartOn) && !StopOn) {
      startTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(update);
    }

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [autoStart, StartOn, StopOn, duration, onComplete]);

  useEffect(() => {
    if (StopOn) {
      cancelAnimationFrame(animationFrameRef.current);

      elapsedBeforePauseRef.current = (progress / 100) * duration;
    } else if (StartOn && !StopOn) {

        startTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(function update() {
        const now = Date.now();
        const elapsed = (now - startTimeRef.current) / 1000 + elapsedBeforePauseRef.current;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        setRemaining(Math.max(duration - elapsed, 0).toFixed(1));

        if (elapsed < duration) {
          animationFrameRef.current = requestAnimationFrame(update);
        } else if (onComplete) {
          onComplete();
        }
      });
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [StartOn, StopOn]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0.1 }}
        style={{
          backgroundColor: color,
          height: height,
        }}
      />
      {showTime && (
        <div className="text-xs text-gray-600 text-right pr-2 mt-1">
          {remaining}s remaining
        </div>
      )}
    </div>
  );
};

export default WriteOrDieProgressBar;


