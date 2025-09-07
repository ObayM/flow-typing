"use client";

import { motion } from "framer-motion";

type WritingAreaProps = {
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const WritingArea = ({ text, handleChange }: WritingAreaProps) => {

  return (
    <motion.div
      className="relative w-full p-4"
      transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror" }}
    >
    

      <motion.textarea
        value={text}
        onChange={handleChange}
        className="w-full p-4 text-xl  bg-transparent border-none rounded-lg resize-none focus:outline-none text-gray-800 dark:text-gray-200"
        style={{ minHeight: "80vh", overflow: "hidden" }}
        placeholder="Start typing to enter the flow…"
        aria-label="Writing area"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}

      />
    </motion.div>
  );
};

export default WritingArea;