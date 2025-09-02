"use client";

import { useState, useMemo } from "react";
import WritingContainer  from "@/components/WritingContainer";
import ThemeSwitcher  from "@/components//ThemeSwitcher";
import WritingArea  from "@/components//WritingArea";
import WordCount  from "@/components//WordCount";
import useTypingSpeed from "@/hook/TypingSpeed";

const WritingFlowPage = () => {

  const { text, wordCount, speed, isTyping, handleChange, handleReset } = useTypingSpeed();

  return (
    <WritingContainer textLength={text.length}>
      <ThemeSwitcher />
      <WritingArea
        text={text}
        handleChange={handleChange}
      />
      <WordCount count={wordCount} speed={speed} />
    </WritingContainer>
  );
};

export default WritingFlowPage;