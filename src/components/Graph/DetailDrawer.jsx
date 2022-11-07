import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";

const DetailSideBar = (props) => {
	const { items, open } = props;
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(open);
	}, [open]);
	return (
		<Sidebar
			visible={visible}
			position="right"
			onHide={() => setVisible(false)}
		>
			<h3>Right Sidebar</h3>
		</Sidebar>
	);
};

export default DetailSideBar;
