"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

type WritingContainerProps = {
  children: React.ReactNode;
  textLength: number;
};

const WritingContainer = ({ children, textLength }: WritingContainerProps) => {
  const { theme } = useTheme();
  const gradientIntensity = Math.min(textLength / 200, 1);

  const darkGradient = `radial-gradient(circle, rgba(25, 25, 80, ${gradientIntensity}) 0%, rgba(10, 10, 20, 1) 100%)`;
  const lightGradient = `radial-gradient(circle, rgba(220, 220, 255, ${gradientIntensity}) 0%, rgba(255, 255, 255, 1) 100%)`;

  return (
    <motion.main
      className="relative flex items-center justify-center min-h-screen overflow-x-hidden"
      animate={{
        backgroundImage: theme === "dark" ? darkGradient : lightGradient,
      }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
};

export default WritingContainer;