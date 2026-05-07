"use client";

import React, { useState, useEffect, useCallback, useRef, FC } from "react";
import WritingContainer from "@/components/WritingContainer";
import WritingArea from "@/components/WritingArea";
import useTypingSpeed from "@/hooks/useTypingSpeed";
import Header from "@/components/layout/header";
import { useTypingTimer } from "@/hooks/useTypingTimer";
import WriteOrDieProgressBar from "@/components/WriteOrDieProgressBar";
import SettingsModal from "@/components/SettingsModal";

const SETTINGS_STORAGE_KEY = "flow_typing_settings";

const WritingFlowPage: FC = () => {
  const [settings, setSettings] = useState({
    inactivityTimeout: 5,
    sessionDuration: 60,
  });

  const [writeOrDieMode, setWriteOrDieMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTypingActive, setIsTypingActive] = useState(false);

  // Track whether user has typed at least once since enabling Write or Die
  const hasTypedInSessionRef = useRef(false);

  const { text, wordCount, speed, isTyping, handleChange, handleReset } = useTypingSpeed();
  const { timer, handleTyping: handleTimerTyping, isActive } = useTypingTimer(settings.inactivityTimeout * 1000);

  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Failed to parse settings:", error);
      }
    }
  }, []);

  const updateSettings = (newSettings: { inactivityTimeout: number; sessionDuration: number }) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
  };

  // Session duration timer for Write or Die
  useEffect(() => {
    if (writeOrDieMode) {
      const timerId = setTimeout(() => {
        setWriteOrDieMode(false);
        hasTypedInSessionRef.current = false;
      }, settings.sessionDuration * 1000);

      return () => clearTimeout(timerId);
    }
  }, [writeOrDieMode, settings.sessionDuration]);

  // Write or Die: reset text when user stops typing (goes inactive)
  // Only triggers AFTER user has typed at least once in this session
  useEffect(() => {
    if (writeOrDieMode && !isActive && hasTypedInSessionRef.current && text.length > 0) {
      handleReset();
      hasTypedInSessionRef.current = false;
    }
  }, [isActive, writeOrDieMode, handleReset, text.length]);

  const handleWriteOrDieToggle = (): void => {
    setWriteOrDieMode((prev: boolean) => {
      if (!prev) {
        // Turning on — reset the session flag
        hasTypedInSessionRef.current = false;
      }
      return !prev;
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    handleChange(e);
    handleTimerTyping();

    // Mark that the user has typed in this Write or Die session
    if (writeOrDieMode) {
      hasTypedInSessionRef.current = true;
    }
  };

  const handleTypingStateChange = useCallback((active: boolean) => {
    setIsTypingActive(active);
  }, []);

  return (
    <WritingContainer textLength={text.length} isTypingActive={isTypingActive}>
      <WriteOrDieProgressBar
        duration={settings.sessionDuration}
        height="3px"
        isRunning={writeOrDieMode}
        onComplete={() => {
          setWriteOrDieMode(false);
          hasTypedInSessionRef.current = false;
        }}
      />

      <Header
        isTyping={isTypingActive}
        wordCount={wordCount}
        speed={speed}
        handleReset={handleReset}
        timer={timer}
        handleWriteOrDieToggle={handleWriteOrDieToggle}
        writeOrDieMode={writeOrDieMode}
        setIsModalOpen={setIsModalOpen}
      />

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        settings={settings}
        onSave={updateSettings}
      />

      <WritingArea
        text={text}
        handleChange={handleTextChange}
        onTypingStateChange={handleTypingStateChange}
      />
    </WritingContainer>
  );
};

export default WritingFlowPage;
