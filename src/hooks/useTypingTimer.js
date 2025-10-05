import { useState, useEffect, useRef } from 'react';

export function useTypingTimer(inactivityDelay = 10000) {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  const intervalRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const handleTyping = () => {
    if (!isActive) {
      setIsActive(true);
    }
    clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(() => {
      setIsActive(false);
      setTimer(0);
    }, inactivityDelay);
  };
  
  return { timer, handleTyping, isActive };
}
