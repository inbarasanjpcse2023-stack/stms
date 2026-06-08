import React from 'react';
import { IDateProps } from './IDateProps';
import { COMMON_TEXT } from 'src/helper/constants';
import "./DateInput.css";
const DateInput: React.FC<IDateProps> = ({ onDateChange, selected }) => {
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="inputContainer">
      <label className="labelStyle">{COMMON_TEXT.INPUT_DATE_LABEL}</label>
      <input className="input" type="date" min={today} value={selected} onChange={e => onDateChange(e.target.value)} />
    </div>
  );
};
export default DateInput;
