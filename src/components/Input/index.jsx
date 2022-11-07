import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import "./style.css";

const Input = (props) => {
    const { value, onChange, label, ...rest } = props;
    const [focus, setFocus] = useState(false); 
    return <div className="field-wrapper">
        <label className={`${(value || focus) && 'focus'}`} htmlFor={label}>{label}</label>
        <InputText onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)} id={label} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
    </div>;

};

export default Input;