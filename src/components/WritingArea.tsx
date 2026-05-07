"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";

type WritingAreaProps = {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTypingStateChange?: (isActive: boolean) => void;
};

const WritingArea = ({ text, handleChange, onTypingStateChange }: WritingAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCaretActive, setIsCaretActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPos, setCaretPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  // Auto-resize the textarea to fit content
  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  useEffect(() => {
    autoResize();
  }, [text, autoResize]);

  // Update custom caret position using a canvas for measurement
  const updateCaretPosition = useCallback(() => {
    const textarea = textareaRef.current;
    const caret = caretRef.current;
    if (!textarea || !caret) return;

    const selStart = textarea.selectionStart;
    const textBefore = text.substring(0, selStart);

    const computed = window.getComputedStyle(textarea);
    const font = `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
    const lineHeight = parseFloat(computed.lineHeight) || parseFloat(computed.fontSize) * 2.2;
    const paddingLeft = parseFloat(computed.paddingLeft) || 0;
    const paddingTop = parseFloat(computed.paddingTop) || 0;
    const textareaWidth = textarea.clientWidth - paddingLeft - (parseFloat(computed.paddingRight) || 0);

    // Use canvas to measure text widths
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = font;

    // Split text into lines and handle word-wrap
    const lines = textBefore.split("\n");
    let totalVisualLines = 0;
    let lastLineWidth = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === "") {
        // Empty line
        if (i < lines.length - 1) {
          totalVisualLines += 1;
        }
        lastLineWidth = 0;
        continue;
      }

      // Simulate word wrap by measuring character by character
      let currentLineWidth = 0;
      let wordWidth = 0;
      let linesForThisLine = 0;

      for (let j = 0; j < line.length; j++) {
        const charWidth = ctx.measureText(line[j]).width;

        if (line[j] === " " || line[j] === "\t") {
          // Space - commit word
          if (currentLineWidth + wordWidth > textareaWidth && currentLineWidth > 0) {
            linesForThisLine++;
            currentLineWidth = wordWidth;
          } else {
            currentLineWidth += wordWidth;
          }
          wordWidth = 0;
          currentLineWidth += charWidth;
        } else {
          wordWidth += charWidth;
        }
      }

      // Commit last word
      if (currentLineWidth + wordWidth > textareaWidth && currentLineWidth > 0) {
        linesForThisLine++;
        currentLineWidth = wordWidth;
      } else {
        currentLineWidth += wordWidth;
      }

      if (i < lines.length - 1) {
        totalVisualLines += linesForThisLine + 1;
      } else {
        totalVisualLines += linesForThisLine;
        lastLineWidth = currentLineWidth;
      }
    }

    const caretLeft = paddingLeft + lastLineWidth;
    const caretTop = paddingTop + totalVisualLines * lineHeight;

    setCaretPos({ left: caretLeft, top: caretTop });
  }, [text]);

  // Smooth scroll to keep cursor in view
  const scrollToCursor = useCallback(() => {
    const textarea = textareaRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!textarea || !scrollContainer) return;

    const computed = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(computed.lineHeight) || 40;
    const textBeforeCursor = text.substring(0, textarea.selectionStart);

    // Approximate cursor Y position based on line count
    const lines = textBeforeCursor.split("\n");
    let visualLines = 0;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
    const textareaWidth = textarea.clientWidth - (parseFloat(computed.paddingLeft) || 0) - (parseFloat(computed.paddingRight) || 0);

    for (const line of lines) {
      if (line === "") {
        visualLines += 1;
        continue;
      }
      const measured = ctx.measureText(line).width;
      visualLines += Math.max(1, Math.ceil(measured / textareaWidth));
    }

    const cursorY = visualLines * lineHeight;
    const containerHeight = scrollContainer.clientHeight;
    const targetScroll = cursorY - containerHeight * 0.4;

    scrollContainer.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: "smooth",
    });
  }, [text]);

  useEffect(() => {
    if (isFocused) {
      updateCaretPosition();
      scrollToCursor();
    }
  }, [text, isFocused, updateCaretPosition, scrollToCursor]);

  // Handle caret active state (solid while typing, pulsing when idle)
  const handleKeyActivity = useCallback(() => {
    setIsCaretActive(true);
    onTypingStateChange?.(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsCaretActive(false);
      onTypingStateChange?.(false);
    }, 500);
  }, [onTypingStateChange]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleChange(e);
      handleKeyActivity();
      requestAnimationFrame(() => updateCaretPosition());
    },
    [handleChange, handleKeyActivity, updateCaretPosition]
  );

  const handleKeyDown = useCallback(() => {
    handleKeyActivity();
    requestAnimationFrame(() => updateCaretPosition());
  }, [handleKeyActivity, updateCaretPosition]);

  const handleClick = useCallback(() => {
    requestAnimationFrame(() => updateCaretPosition());
  }, [updateCaretPosition]);

  // Focus textarea on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      textareaRef.current?.focus();
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  // Click anywhere to focus
  const handleContainerClick = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="writing-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onClick={handleContainerClick}
    >
      <div ref={scrollContainerRef} className="writing-scroll-container">
        <div className="flow-container">
          <div style={{ position: "relative" }}>
            {/* Custom Caret */}
            {isFocused && (
              <div
                ref={caretRef}
                className={`custom-caret ${isCaretActive ? "" : "pulse"}`}
                style={{
                  left: `${caretPos.left}px`,
                  top: `${caretPos.top}px`,
                }}
              />
            )}

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              onKeyUp={() => requestAnimationFrame(() => updateCaretPosition())}
              onClick={handleClick}
              onSelect={() => requestAnimationFrame(() => updateCaretPosition())}
              onFocus={() => {
                setIsFocused(true);
                requestAnimationFrame(() => updateCaretPosition());
              }}
              onBlur={() => setIsFocused(false)}
              className="typing-area"
              placeholder="start typing..."
              aria-label="Writing area"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WritingArea;