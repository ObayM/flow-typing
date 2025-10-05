'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = ({ duration = 10, isRunning = false, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(duration);

  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedBeforePauseRef = useRef(0);

  const resetTimer = useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current);
    setProgress(0);

    setRemaining(duration);
    startTimeRef.current = null;
    elapsedBeforePauseRef.current = 0;
  }, [duration]);

  useEffect(() => {

    const update = () => {

        const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000 + elapsedBeforePauseRef.current;
      
      if (elapsed < duration) {
        const newProgress = (elapsed / duration) * 100;
        setProgress(newProgress);
        setRemaining(Math.max(duration - elapsed, 0));
        animationFrameRef.current = requestAnimationFrame(update);
      } else {

        setProgress(100);
        setRemaining(0);
        if (onComplete) {
          onComplete();
        }

        resetTimer();
      }
    };

    if (isRunning) {

        startTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(update);
    } else {

        cancelAnimationFrame(animationFrameRef.current);

        if (startTimeRef.current) {
        const elapsedSinceLastStart = (Date.now() - startTimeRef.current) / 1000;
        elapsedBeforePauseRef.current += elapsedSinceLastStart;
      }
    }

    return () => cancelAnimationFrame(animationFrameRef.current);

  }, [isRunning, duration, onComplete, resetTimer]);
  
  useEffect(() => {
    resetTimer();
  }, [duration, resetTimer]);


  return { progress, remaining: remaining.toFixed(1) };
};

