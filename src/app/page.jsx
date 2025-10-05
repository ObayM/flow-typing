"use client";

import { useState, useMemo } from "react";
import WritingContainer from "@/components/WritingContainer";
import ThemeSwitcher from "@/components//ThemeSwitcher";
import WritingArea from "@/components//WritingArea";
import WordCount from "@/components//WordCount";
import useTypingSpeed from "@/hooks/useTypingSpeed";
import Header from "@/components/layout/header";
import { useTypingTimer } from "@/hooks/useTypingTimer"; 

const WritingFlowPage = () => {
  const { text, wordCount, speed, isTyping, handleChange, handleReset } = useTypingSpeed();
  
  const { timer, handleTyping: handleTimerTyping } = useTypingTimer(10000); 


  const handleTextChange = (e) => {
    handleChange(e);      
    handleTimerTyping(e);
  };

  return (
    <WritingContainer textLength={text.length}>
      <Header
        isTyping={isTyping}
        wordCount={wordCount}
        speed={speed}
        handleReset={handleReset}
        timer={timer} 
      />

      <WritingArea
        text={text}
        handleChange={handleTextChange} 
      />
    </WritingContainer>
  );
};

export default WritingFlowPage;