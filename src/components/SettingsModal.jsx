'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from "react-icons/io";

const SettingSlider = ({ label, description, value, onChange, min, max, step, unit = '' }) => (
  <div className="setting-slider">
    <label>
      <span>{label}</span>
      <span className="value-badge">
        {value}{unit}
      </span>
    </label>
    {description && <p className="description">{description}</p>}
    <input
      type="range"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
    />
  </div>
);

function SettingsModal({ isOpen, onClose, settings, onSave }) {
  const [inactivityTimeout, setInactivityTimeout] = useState(settings?.inactivityTimeout || 5);
  const [sessionDuration, setSessionDuration] = useState(settings?.sessionDuration || 180);

  const handleSave = () => {
    onSave?.({
      inactivityTimeout,
      sessionDuration,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">settings</h2>
              <button onClick={onClose} className="header-btn" style={{ padding: '0.3rem' }}>
                <IoMdClose size={18} />
              </button>
            </div>

            <div className="modal-body">
              <SettingSlider
                label="inactivity timeout"
                description="Time before text starts deleting in Write or Die mode."
                value={inactivityTimeout}
                onChange={setInactivityTimeout}
                min={1}
                max={30}
                step={1}
                unit="s"
              />
              <SettingSlider
                label="session duration"
                description="Total length of the writing session."
                value={sessionDuration}
                onChange={setSessionDuration}
                min={30}
                max={1800}
                step={30}
                unit="s"
              />
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={onClose}>
                cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SettingsModal;
