'use client';
import { useState, useEffect, useRef } from 'react';

interface UseTypingTimerReturn {
  timer: number;
  isActive: boolean;
  handleTyping: () => void; 
}


type TimerId = ReturnType<typeof setTimeout>;


export function useTypingTimer(inactivityDelay: number = 10000): UseTypingTimerReturn {

  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  

  const intervalRef = useRef<TimerId | null>(null);
  const inactivityTimeoutRef = useRef<TimerId | null>(null);

  useEffect(() => {

    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (intervalRef.current) {

      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const handleTyping = (): void => {
    if (!isActive) {
      setIsActive(true);
    }

    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    inactivityTimeoutRef.current = setTimeout(() => {
      setIsActive(false);
      setTimer(0); 
    }, inactivityDelay);
  };
  
  return { timer, handleTyping, isActive };
}