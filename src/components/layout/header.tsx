"use client";

import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { IoCreateOutline } from "react-icons/io5";
import { FiSettings, FiZap, FiZapOff } from "react-icons/fi";

type HeaderProps = {
  isTyping: boolean;
  wordCount: number;
  speed: number;
  timer: number;
  handleReset: () => void;
  handleWriteOrDieToggle: () => void;
  writeOrDieMode: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

export default function Header({
  isTyping,
  wordCount,
  speed,
  timer,
  handleReset,
  handleWriteOrDieToggle,
  writeOrDieMode,
  setIsModalOpen,
}: HeaderProps) {
  return (
    <>
      {/* Top Header */}
      <motion.header
        className={`flow-header ${isTyping ? "faded" : ""}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="header-inner">
          <span className="header-logo">flow</span>

          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <button
              onClick={handleWriteOrDieToggle}
              className={`header-btn ${writeOrDieMode ? "active" : ""}`}
              title="Write or Die mode"
            >
              {writeOrDieMode ? <FiZap className="header-btn-icon" /> : <FiZapOff className="header-btn-icon" />}
              <span>{writeOrDieMode ? "stop" : "write or die"}</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="header-btn"
              title="Settings"
            >
              <FiSettings className="header-btn-icon" />
            </button>

            <ThemeSwitcher />

            <button
              onClick={handleReset}
              className="header-btn"
              title="New document"
            >
              <IoCreateOutline className="header-btn-icon" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Bottom Stats Bar */}
      <AnimatePresence>
        {(wordCount > 0 || speed > 0 || timer > 0) && (
          <motion.footer
            className={`stats-bar ${isTyping ? "faded" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="stats-inner">
              <div className="stat-item">
                <span className="stat-value">{wordCount}</span>
                <span className="stat-label">words</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{speed}</span>
                <span className="stat-label">wpm</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{timer}</span>
                <span className="stat-label">sec</span>
              </div>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </>
  );
}
