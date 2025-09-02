"use client";

import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";

const Character = React.memo(
  ({
    char,
    onRef,
  }: {
    char: string;
    onRef: (el: HTMLSpanElement | null) => void;
  }) => {
    return (
      <motion.span
        ref={onRef}
        className="inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    );
  }
);

const Caret = ({ position }: { position: { top: number; left: number } }) => {
  return (
    <motion.div
      className="absolute w-1 h-6 bg-blue-500 rounded-full"
      style={{
        top: position.top,
        left: position.left,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, type: "tween" }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full h-full bg-blue-500 rounded-full"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};


const WritingArea = () => {
  const [text, setText] = useState("");

  const [caretIndex, setCaretIndex] = useState(0);

  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {

      const charEl = charRefs.current[caretIndex];

      const containerRect = containerRef.current.getBoundingClientRect();

      if (charEl) {

        const charRect = charEl.getBoundingClientRect();

        setCaretPosition({
          top: charRect.top - containerRect.top ,
          left: charRect.left - containerRect.left,
        });

      } else {
        if (text.length > 0 && charRefs.current[text.length - 1]) {
            const lastCharEl = charRefs.current[text.length - 1]!;
            const lastCharRect = lastCharEl.getBoundingClientRect();
            setCaretPosition({
                top: lastCharRect.top - containerRect.top,
                left: lastCharRect.right - containerRect.left,
            });
        } else {

          const style = window.getComputedStyle(containerRef.current);
            const paddingTop = parseFloat(style.paddingTop);
            const paddingLeft = parseFloat(style.paddingLeft);
            setCaretPosition({ top: paddingTop, left: paddingLeft });
        }
      }
    }
  }, [text, caretIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    charRefs.current = charRefs.current.slice(0, newText.length);
    setText(newText);
    setCaretIndex(e.target.selectionStart);
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setCaretIndex(target.selectionStart);
  };
  
  const focusTextarea = () => {
    textareaRef.current?.focus();
  };

  return (
    <>

      <style>{`
        .custom-writing-area-textarea::selection {
          background-color: transparent;
        }
      `}</style>
    
      <div
        ref={containerRef}
        className="relative w-full p-4 cursor-text"
        onClick={focusTextarea}
        style={{ minHeight: "80vh" }}
      >
        <div className="w-full text-xl text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words select-none">
          {text.split("").map((char, index) => (
            <Character
              key={index}
              char={char}
              onRef={(el) => (charRefs.current[index] = el)}
            />
          ))}
          <span ref={(el) => (charRefs.current[text.length] = el)} className="inline-block" />
        </div>

        <Caret position={caretPosition} />

        <motion.textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onSelect={handleSelect}

          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"

          className="custom-writing-area-textarea absolute top-0 left-0 w-full h-full p-4 text-xl bg-transparent border-none resize-none focus:outline-none text-transparent caret-transparent"
          aria-label="Writing area"
        />
      </div>
    </>
  );
};

export default WritingArea;