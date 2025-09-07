"use client";

import { useState, useMemo } from "react";
import WritingContainer  from "@/components/WritingContainer";
import ThemeSwitcher  from "@/components//ThemeSwitcher";
import WritingArea  from "@/components//WritingArea";
import WordCount  from "@/components//WordCount";
import useTypingSpeed from "@/hook/TypingSpeed";
import Header from "@/components/layout/header";

const WritingFlowPage = () => {

  const { text, wordCount, speed, isTyping, handleChange, handleReset } = useTypingSpeed();

  return (
    <WritingContainer textLength={text.length}>
      <Header isTyping={isTyping} wordCount={wordCount} speed={speed} handleReset={handleReset} />

      <WritingArea
        text={text}
        handleChange={handleChange}
      />
    </WritingContainer>
  );
};

export default WritingFlowPage;