"use client";

import { useState, useMemo, useEffect } from "react";
import WritingContainer from "@/components/WritingContainer";
import ThemeSwitcher from "@/components//ThemeSwitcher";
import WritingArea from "@/components//WritingArea";
import WordCount from "@/components//WordCount";
import useTypingSpeed from "@/hooks/useTypingSpeed";
import Header from "@/components/layout/header";
import { useTypingTimer } from "@/hooks/useTypingTimer"; 
import WriteOrDieProgressBar from "@/components/WriteOrDieProgressBar";

const WritingFlowPage = () => {
  const { text, wordCount, speed, isTyping, handleChange, handleReset } = useTypingSpeed();
  
  const { timer, handleTyping: handleTimerTyping, isActive } = useTypingTimer(10000); 
  const [writeOrDieMode, setWriteOrDieMode] = useState(false);

  const handleWriteOrDieToggle = () => {
    setWriteOrDieMode(!writeOrDieMode);
  };

  useEffect(() => {
    if (writeOrDieMode && !isActive) {
      handleReset();
    }
  }, [isActive, writeOrDieMode, handleReset]);


  const handleTextChange = (e) => {
    handleChange(e);      
    handleTimerTyping(e);
  };

  return (

    <WritingContainer textLength={text.length}>
          <WriteOrDieProgressBar
      duration={.5*60}
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


