import React from 'react';
import { CHECKBOX_OPTIONS, COMMON_TEXT } from 'src/helper/constants';
import { ICheckbox } from './ICheckbox';
import "./Checkbox.css";

const Checkbox: React.FC<ICheckbox> = ({ onChange, selected }) => {
  const handleChange = (value: string, checked: boolean) => {
    onChange(checked ? value : '');
  };

  return (
    <div className='mainContainerCheckbox'>
      <label className="labelStyle">{COMMON_TEXT.INPUT_CHECKBOX_LABEL}</label>
      <div className='checkboxContainer'>
        {CHECKBOX_OPTIONS?.map((option) => (
          <label key={option} className={`priPill ${option}`}>
            <input
              type="checkbox"
              value={option}
              checked={selected === option}
              onChange={(e) => handleChange(option, e.target.checked)}
            />
            <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;
