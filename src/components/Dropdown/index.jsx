import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import "./style.css";

const PDropdown = (props) => {
	const { options, label, value, onChange, ...restProps } = props;
	const [focus, setFocus] = useState(false); 
	return (
		<div className="dropdown-container">
			<label className={`${(value || focus) && 'focus'}`} htmlFor={label}>{label}</label>
			<Dropdown
				value={value}
				options={options}
				onChange={onChange}
				showFilterClear
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				{...restProps}
			/>
		</div>
	);
};

export default PDropdown;
