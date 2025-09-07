"use client";

import { motion } from "framer-motion";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import WordCount from "@/components/WordCount";
import { IoCreateOutline } from "react-icons/io5";
type HeaderProps = {
  isTyping: boolean;
  wordCount: number;
  speed: number;
  handleReset: () => void;
};

export default function Header({ isTyping, wordCount, speed, handleReset }: HeaderProps) {



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

      <WordCount count={wordCount} speed={speed} />

        <ThemeSwitcher />
      <button className=" " onClick={handleReset}><IoCreateOutline /></button>
      </div>
    </motion.header>
  );
}