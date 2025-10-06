'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdClose } from "react-icons/io";
import { FiSettings } from "react-icons/fi";


const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900";

  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-700 focus:ring-stone-500",
    secondary: "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 focus:ring-neutral-500",
    ghost: "hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:ring-neutral-500",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SettingSlider = ({ label, description, value, onChange, min, max, step, unit = '' }) => (
  <div>
    <div className="flex justify-between items-center">
      <label className="font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
      <span className="text-sm font-mono px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-md text-neutral-800 dark:text-neutral-200">
        {value}{unit}
      </span>
    </div>
    {description && <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{description}</p>}
    <input
      type="range"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className="w-full h-2 mt-3 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-zinc-600"
    />
  </div>
);



function SettingsModal({ isOpen, onClose }) {
  const [inactivityTimeout, setInactivityTimeout] = useState(5);
  const [sessionDuration, setSessionDuration] = useState(180);

  const handleSave = () => {
    console.log('Saved settings:', {
      inactivityTimeout,
      sessionDuration,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-2xl shadow-xl w-full max-w-md"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-lg font-semibold">Write or Die Settings</h2>
              <Button onClick={onClose} variant="ghost" className="p-2 rounded-full">
                <IoMdClose size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-8">
              <SettingSlider
                label="Inactivity Timeout"
                description="Time before text starts deleting."
                value={inactivityTimeout}
                onChange={setInactivityTimeout}
                min={1}
                max={30}
                step={1}
                unit="s"
              />
              <SettingSlider
                label="Session Duration"
                description="Total length of the writing session."
                value={sessionDuration}
                onChange={setSessionDuration}
                min={30} 
                max={1800} 
                step={30}
                unit="s"
              />
            </div>

            <div className="flex justify-end gap-3 p-4 bg-neutral-50 dark:bg-neutral-950/50 border-t border-neutral-200 dark:border-neutral-800 rounded-b-2xl">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



export default  SettingsModal;
