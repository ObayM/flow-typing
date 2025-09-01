import { useState, useCallback } from "react";

const useTypingSpeed = () => {
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [speed, setSpeed] = useState(0); 

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setText(value);

    
    const currentTime = Date.now();

    if (startTime === 0) {
      setStartTime(currentTime);
    }

    const currentWordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
    setWordCount(currentWordCount);
    
    const effectiveStartTime = startTime || currentTime;
    const timeElapsedInMinutes = (currentTime - effectiveStartTime) / 1000 / 60;

    if (timeElapsedInMinutes > 0) {
      const wpm = Math.round(currentWordCount / timeElapsedInMinutes);
      setSpeed(wpm);
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