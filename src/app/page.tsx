"use client";

import React, { useState, useEffect, FC } from "react";
import WritingContainer from "@/components/WritingContainer";

import WritingArea from "@/components//WritingArea";
import useTypingSpeed from "@/hooks/useTypingSpeed";
import Header from "@/components/layout/header";
import { useTypingTimer } from "@/hooks/useTypingTimer";
import WriteOrDieProgressBar from "@/components/WriteOrDieProgressBar";
import { supabase } from "@/lib/supabase";

const WritingFlowPage: FC = () => {
  const [config, setConfig] = useState<{ preDelete: number; duration: number } | null>(null)

  useEffect(() => {
    async function fetchConfig() {
      const { data, error } = await supabase
        .from('configs')
        .select('config_key, config_value')

      if (error) {
        console.error('Error fetching configs:', error)
        return
      }

      const configMap: Record<string, any> = {}
      data.forEach(row => {
        configMap[row.config_key] = row.config_value
      })

      setConfig({
        preDelete: configMap['write_or_die_pre_delete_time']?.seconds || 5,
        duration: configMap['write_or_die_duration']?.seconds || 60,
      })
    }

    fetchConfig()
  }, [])
  const { text, wordCount, speed, isTyping, handleChange, handleReset } = useTypingSpeed();
  
  const { timer, handleTyping: handleTimerTyping, isActive } = useTypingTimer(10000);
  
  const [writeOrDieMode, setWriteOrDieMode] = useState<boolean>(false);

  const handleWriteOrDieToggle = (): void => {
    setWriteOrDieMode(!writeOrDieMode);
  };

  useEffect(() => {
    if (writeOrDieMode && config) {
      const timerId = setTimeout(() => {
        setWriteOrDieMode(false);
      }, config.duration * 1000);

      return () => clearTimeout(timerId);
    }
  }, [writeOrDieMode, config]);



  useEffect(() => {
    if (writeOrDieMode && !isActive) {
      handleReset();
    }
  }, [isActive, writeOrDieMode, handleReset]);


  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    handleChange(e);
    handleTimerTyping(e);
  };

  return (
    <WritingContainer textLength={text.length}>
      <WriteOrDieProgressBar
        duration={config ? config.duration : 60} 
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

