
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import "./style.css";

const Datepicker = (props) => {
    const { format = "mm-dd-yy", value, label, onChange = () => { } } = props;
    const [focus, setFocus] = useState(false);
    return (
        <div className="datepicker-container">
            <label className={`${(value || focus) && 'focus'}`} htmlFor={label}>{label}</label>
            <Calendar onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} id={label} value={value} onChange={(e) => onChange(e.value)} dateFormat={format} />
        </div>
    );
};

export default Datepicker;
