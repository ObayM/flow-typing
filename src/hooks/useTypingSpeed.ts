'use client';
import { useState, useCallback, ChangeEvent, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'text_writing_flow_app';

interface UseTypingSpeedReturn {
  text: string;
  speed: number;
  wordCount: number;
  isTyping: boolean;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleReset: () => void;
}


const useTypingSpeed = (): UseTypingSpeedReturn => {
  const [text, setText] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return "";
    }
    try {
      const savedText = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedText || "";
    } catch (error) {
      console.error("Failed to read from localStorage", error);
      return "";
    }
  });

  const [startTime, setStartTime] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);


  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, text);
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, [text]);


  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);

    const currentTime = Date.now();

    // Set start time on first keystroke only
    if (startTime === 0 && value.length > 0) {
      setStartTime(currentTime);
      // Don't calculate speed on the very first keystroke
      const currentWordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
      setWordCount(currentWordCount);
      setSpeed(0);
      return;
    }

    const currentWordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
    setWordCount(currentWordCount);
    
    const timeElapsedInMinutes = (currentTime - startTime) / (1000 * 60);

    // Only show WPM after at least 1 second of typing to avoid wild spikes
    if (timeElapsedInMinutes > 0.0167) {
      const wpm = Math.round(currentWordCount / timeElapsedInMinutes);
      // Cap WPM at a reasonable maximum to prevent display issues
      setSpeed(Math.min(wpm, 300));
    } else {
      setSpeed(0); 
    }
  }, [startTime]);

  const handleReset = useCallback(() => {
    setText("");
    setSpeed(0);
    setStartTime(0);
    setWordCount(0);
    try {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove from localStorage", error);
    }
  }, []);

  const isTyping = startTime > 0 && text.length > 0;

  return { text, speed, wordCount, isTyping, handleChange, handleReset };
};

export default useTypingSpeed;
