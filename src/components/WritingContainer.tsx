"use client";

import { motion } from "framer-motion";

type WritingContainerProps = {
  children: React.ReactNode;
  textLength: number;
  isTypingActive?: boolean;
};

const WritingContainer = ({ children, textLength, isTypingActive = false }: WritingContainerProps) => {
  return (
    <div className={`relative min-h-screen ${isTypingActive ? "focus-mode" : ""}`}>
      {/* Subtle background gradient that responds to typing */}
      <div className={`bg-gradient ${textLength > 0 ? "active" : ""}`} />

      <motion.div
        className="relative z-10 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default WritingContainer;
