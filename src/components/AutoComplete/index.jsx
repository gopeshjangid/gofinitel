
import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import "./style.css";

const CustomAutoComplete = (props) => {
    const [focus, setFocus] = useState(false);
    const { value, label, suggestions, placeholder, onSearch, onChange = () => { } } = props;
    const itemTemplate = (item) => {
        return (
            <div className="suggest-item">
                <div>{item.label}</div>
            </div>
        );
    };

    return (
        <div className="autocomplete-wrapper">
            <label className={(focus || value) && 'focused'}>{label}</label>
            <AutoComplete onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} value={value?.value || value} suggestions={suggestions} completeMethod={onSearch} field="name" itemTemplate={itemTemplate} onChange={(e) => onChange(e.value)} aria-label="autocomplete" dropdownAriaLabel={placeholder || 'Search'} />
        </div>
    );
};

export default CustomAutoComplete;
