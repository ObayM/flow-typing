"use client";

import { motion } from "framer-motion";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import WordCount from "@/components/WordCount";
import { IoCreateOutline } from "react-icons/io5";
import Switch from "@/components/ui/Switch";

type HeaderProps = {
  isTyping: boolean;
  wordCount: number;
  speed: number;
  timer: number;
  handleReset: () => void;
  handleWriteOrDieToggle: () => void;
  writeOrDieMode: boolean;
};


export default function Header({ isTyping, wordCount, speed, timer, handleReset, handleWriteOrDieToggle, writeOrDieMode}: HeaderProps) {
  return (
    <motion.header
      className="absolute top-0 left-0 right-0 z-10 p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isTyping ? 0.3 : 1, 
        y: 0,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto flex items-center justify-between max-w-4xl">
        <h1 className="text-lg font-medium text-gray-500 dark:text-gray-400">
          Flow
        </h1>

        <button onClick={handleWriteOrDieToggle} 
          className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
        >
          {writeOrDieMode ? "Stop " : "Start "}
          Write OR Die

        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">{timer}s</span>
        
        <ThemeSwitcher />
        <button className=" " onClick={handleReset}><IoCreateOutline /></button>
      </div>
    </motion.header>
  );
}
