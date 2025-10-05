"use client";

import React, { useState, useEffect, FC } from "react";
import WritingContainer from "@/components/WritingContainer";

import WritingArea from "@/components//WritingArea";
import useTypingSpeed from "@/hooks/useTypingSpeed";
import Header from "@/components/layout/header";
import { useTypingTimer } from "@/hooks/useTypingTimer";
import WriteOrDieProgressBar from "@/components/WriteOrDieProgressBar";

const WritingFlowPage: FC = () => {
  const { text, wordCount, speed, isTyping, handleChange, handleReset } = useTypingSpeed();
  
  const { timer, handleTyping: handleTimerTyping, isActive } = useTypingTimer(10000);
  
  const [writeOrDieMode, setWriteOrDieMode] = useState<boolean>(false);

  const handleWriteOrDieToggle = (): void => {
    setWriteOrDieMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (writeOrDieMode) {
      
      const timerId = setTimeout(() => {
        setWriteOrDieMode(false);
      }, 0.5 * 60 * 1000);

      return () => clearTimeout(timerId);
    }
  }, [writeOrDieMode]);


  useEffect(() => {
    if (writeOrDieMode && !isActive) {
      handleReset();
      setWriteOrDieMode(false);
    }
  }, [isActive, writeOrDieMode, handleReset]);


  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    handleChange(e);
    handleTimerTyping(e);
  };

  return (
    <WritingContainer textLength={text.length}>
      <WriteOrDieProgressBar
        duration={0.5 * 60} 
        height="4px"
        isRunning={writeOrDieMode}
        onComplete={() => { setWriteOrDieMode(false); }}
      />
      <Header
        isTyping={isTyping}
        wordCount={wordCount}
        speed={speed}
        handleReset={handleReset}
        timer={timer}
        handleWriteOrDieToggle={handleWriteOrDieToggle}
        writeOrDieMode={writeOrDieMode}
      />
      <WritingArea
        text={text}
        handleChange={handleTextChange}
      />
    </WritingContainer>
  );
};

export default WritingFlowPage;