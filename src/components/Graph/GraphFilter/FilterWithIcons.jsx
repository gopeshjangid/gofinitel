import React, { useState } from "react";
import { Button } from "primereact/button";

const GraphFilterButtonIcon = () => {
	const [loading1, setLoading1] = useState(false);
	const [icons, setIcons] = useState([
		{
			icon: "Name",
			active: true,
		},
		{
			icon: "Age",
			active: true,
		},
		,
		{
			icon: "Name2",
			active: true,
		},
		,
		{
			icon: "Name1",
			active: true,
		},
	]);

	return (
		<div className="icons-list">
			{icons.map((item, index) => (
				<div key={"icon-" + index} className="p-1">
					<Button label={item.icon} aria-label="Submit" />
				</div>
			))}
		</div>
	);
};

export default GraphFilterButtonIcon;
