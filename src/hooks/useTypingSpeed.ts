'use client';
import { useState, useCallback, ChangeEvent } from 'react';


interface UseTypingSpeedReturn {
  text: string;
  speed: number;
  wordCount: number;
  isTyping: boolean;

  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  handleReset: () => void;
}


const useTypingSpeed = (): UseTypingSpeedReturn => {

  const [text, setText] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);


  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);

    const currentTime = Date.now();


    if (startTime === 0 && value.length > 0) {
      setStartTime(currentTime);
    }

    const currentWordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
    setWordCount(currentWordCount);
    

    const effectiveStartTime = startTime || currentTime;
    const timeElapsedInMinutes = (currentTime - effectiveStartTime) / (1000 * 60);


    if (timeElapsedInMinutes > 0) {
      const wpm = Math.round(currentWordCount / timeElapsedInMinutes);
      setSpeed(wpm);
    } else {

      setSpeed(0); 
    }
  }, [startTime]);

  const handleReset = useCallback(() => {
    setText("");
    setSpeed(0);
    setStartTime(0);
    setWordCount(0);
  }, []); 

  const isTyping = startTime > 0 && text.length > 0;

  return { text, speed, wordCount, isTyping, handleChange, handleReset };
};

export default useTypingSpeed;