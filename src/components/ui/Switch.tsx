import React, { useId } from 'react';

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  onColor?: string;      
  className?: string;    
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle, onColor, className = '' }) => {
  const switchId = useId();
  
  const defaultOnColor = 'bg-green-500';

  return (
    <div className={`relative inline-block ${className}`}>

      <input
        checked={isOn}
        onChange={handleToggle}
        className="sr-only peer" 
        id={switchId}
        type="checkbox"
      />


      <label
        htmlFor={switchId}
        className={`
          block w-14 h-8 rounded-full cursor-pointer 
          bg-gray-300 peer-checked:bg-green-500
          transition-colors duration-300 ease-in-out
        `}
        style={isOn && onColor ? { backgroundColor: onColor } : {}}
      >
        <span
          className={`
            inline-block w-6 h-6 m-1 rounded-full bg-white shadow-md
            transform transition-transform duration-300 ease-in-out
            ${isOn ? 'translate-x-6' : 'translate-x-0'}
          `}
        />
      </label>
    </div>
  );
};

export default Switch;