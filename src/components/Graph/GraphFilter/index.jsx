import React, { useState, useEffect } from "react";
import Dropdown from "../../Dropdown";
import FilterIcons from "./FilterWithIcons";
import "./style.css";

export default () => {
	const [lazyItems, setLazyItems] = useState([]);
	const [selectedCity1, setSelectedCity1] = useState(null);

	const cities = [
		{ name: "New York", code: "NY" },
		{ name: "Rome", code: "RM" },
		{ name: "London", code: "LDN" },
		{ name: "Istanbul", code: "IST" },
		{ name: "Paris", code: "PRS" },
	];
	

	useEffect(() => {
		setLazyItems(Array.from({ length: 100000 }));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const onCityChange = (e) => {
		setSelectedCity1(e.value);
	};

	
	return (
		<div className="graph-container flex">
			<div className="flex">
				<div className="flex-items p-2">
					<Dropdown
						value={selectedCity1}
						options={cities}
						onChange={onCityChange}
						optionLabel="name"
						placeholder="Select Visual Profile"
						showFilterClear
					/>
				</div>{" "}
				<div className="flex-items p-2">
					<Dropdown
						value={selectedCity1}
						options={cities}
						onChange={onCityChange}
						optionLabel="name"
						placeholder="Select Highlighted nodes"
					/>
				</div>{" "}
				<div className="flex-items p-2">
					<Dropdown
						value={selectedCity1}
						options={cities}
						onChange={onCityChange}
						optionLabel="name"
						placeholder="Select Highlighted edges"
					/>
				</div>
				<div className="flex-items p-2">
					<Dropdown
						value={selectedCity1}
						options={cities}
						onChange={onCityChange}
						optionLabel="name"
						placeholder="Depth"
					/>
				</div>
				<div className="flex-items p-2">
					<Dropdown
						value={selectedCity1}
						options={cities}
						onChange={onCityChange}
						optionLabel="name"
						placeholder="Limit"
					/>
				</div>
			</div>
			<div className="flex p-2">
				<FilterIcons />
			</div>
		</div>
	);
};
