"use client"; 

import { useState, useEffect, useRef } from "react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import { useTheme } from "next-themes"; 

export default function WritingFlow() { 
  const [text, setText] = useState(""); 
  const [isTyping, setIsTyping] = useState(false); 
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length; 
  const { theme, setTheme } = useTheme(); 
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null); 

  useEffect(() => { 
    if (inactivityTimer.current) { 
      clearTimeout(inactivityTimer.current); 
    } 
    if (text.length > 0) { 
      setIsTyping(true); 
      inactivityTimer.current = setTimeout(() => { 
        setIsTyping(false); 
      }, 3000); 
    } 
    return () => { 
      if (inactivityTimer.current) { 
        clearTimeout(inactivityTimer.current); 
      } 
    }; 
  }, [text]); 

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => { 
    setText(event.target.value); 
  }; 

  const gradientIntensity = Math.min(text.length / 500, 0.5); 

  const darkGradient = `radial-gradient(circle, rgba(20, 20, 40, ${gradientIntensity}) 0%, rgba(10, 10, 20, 1) 100%)`; 
  const lightGradient = `radial-gradient(circle, rgba(230, 230, 255, ${gradientIntensity}) 0%, rgba(255, 255, 255, 1) 100%)`; 

  return ( 
    <motion.main 
      className="relative flex items-center justify-center min-h-screen overflow-hidden" 
      animate={{ 
        backgroundImage: theme === "dark" ? darkGradient : lightGradient, 
      }} 
      transition={{ duration: 1.5 }} 
    > 
      <div className="absolute top-4 right-4"> 
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
          className="px-3 py-1 text-sm transition-colors rounded-md bg-black/10 dark:bg-white/10" 
        > 
          {theme === "dark" ? "Light" : "Dark"} 
        </button> 
      </div> 

      <motion.div 
        className="relative w-full max-w-4xl p-4" 
        animate={!isTyping && text.length > 0 ? { scale: [1, 1.01, 1] } : {}} 
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }} 
      > 
        <AnimatePresence> 
          {text.length === 0 && ( 
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400 pointer-events-none dark:text-gray-600" 
              initial={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
            > 
              Start typing to enter flow… 
            </motion.div> 
          )} 
        </AnimatePresence> 

        <motion.textarea 
          className="w-full h-full p-4 text-4xl text-center bg-transparent border-none rounded-lg resize-none focus:outline-none md:text-5xl lg:text-6xl text-gray-800 dark:text-gray-200" 
          style={{ minHeight: "80vh" }} 
          value={text} 
          onChange={handleTextChange} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
        /> 
      </motion.div> 

      <div className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-400"> 
        {wordCount} {wordCount === 1 ? "word" : "words"} 
      </div> 
    </motion.main> 
  ); 
}