import React from "react";
import {useNavigate} from "react-router-dom";
import { Button } from 'primereact/button';

import "./style.css";

function SidebarMenuList({ menuList }) {
	const navigate = useNavigate();
	const getPathName = (rule) =>{
		const pathArray = rule.split("/");
		const pathName  = pathArray[pathArray.length-1];
		return pathName ==='dashboard' ? "/dashboard" : `/dashboard/${pathName}`;
	}
	return (
		<div className="menuListContainer">
			{Array.isArray(menuList) &&
				menuList.map((menuItem, i) => {
					return (
						<div key={i}>
							<label className="menuHeading">{menuItem?.label}</label>
							<div className="menuHeadingSublistContainer">
								{menuItem?.items &&
									menuItem?.items.map((menuSubitem, i) => (
										<div key={i} className="menuHeadingSublist">
											<Button label={menuSubitem?.label} className="p-button-text" onClick={()=>navigate(getPathName(menuSubitem.rule))} />
										</div>
									))}
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default SidebarMenuList;
