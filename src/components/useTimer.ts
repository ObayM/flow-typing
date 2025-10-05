'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerProps {
  duration?: number;
  isRunning?: boolean;
  onComplete?: () => void; 
}


interface UseTimerReturn {
  progress: number;
  remaining: string; 
  
}


export const useTimer = ({
  duration = 10,
  isRunning = false,
  onComplete,
}: UseTimerProps): UseTimerReturn => {

  const [progress, setProgress] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(duration);


  const animationFrameRef = useRef<number | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const elapsedBeforePauseRef = useRef<number>(0);


  const resetTimer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setProgress(0);
    setRemaining(duration);
    startTimeRef.current = null;
    elapsedBeforePauseRef.current = 0;
  }, [duration]);

  useEffect(() => {
    const update = () => {
      if (startTimeRef.current === null) return;

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

      if (startTimeRef.current === null) {
          startTimeRef.current = Date.now();
      }
      animationFrameRef.current = requestAnimationFrame(update);
    } else {

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (startTimeRef.current) {
        const elapsedSinceLastStart = (Date.now() - startTimeRef.current) / 1000;
        elapsedBeforePauseRef.current += elapsedSinceLastStart;
        startTimeRef.current = null;
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

  }, [isRunning, duration, onComplete, resetTimer]);
  
  useEffect(() => {
    resetTimer();
  }, [duration, resetTimer]);

  return { progress, remaining: remaining.toFixed(1) };
};