import React, { useState, useEffect } from "react";
import Layout from "../../layouts";
import BreadCrumbComponent from "../../components/Breadcrum";
import MenubarComponent from "../../components/Menubar";
import ToastComponent from "../../components/Toast";
import GraphFilter from "../../components/Graph/GraphFilter";
import DetailDrawer from "../../components/Graph/DetailDrawer";
import HeaderBgImg from "./../../assets/public/logo/goFintel.svg";
import SidebarMenuList from "../../components/SidebarMenuList";
import { getMenuTree } from "../../apis";
import { Utils } from "../../helpers";

const { until } = Utils;

function Dashboard() {
	const headerItems = [
		{
			label: "File",
			items: [
				{
					label: "New",
					items: [
						{
							label: "Bookmark",
						},
						{
							label: "Video",
						},
					],
				},
				{
					label: "Delete",
				},

				{
					label: "Export",
				},
			],
		},
		{
			label: "Edit",
			items: [
				{
					label: "Left",
				},
				{
					label: "Right",
				},
				{
					label: "Center",
				},
				{
					label: "Justify",
				},
			],
		},
		{
			label: "Users",
			items: [
				{
					label: "New",
				},
				{
					label: "Delete",
				},
				{
					label: "Search",
					items: [
						{
							label: "Filter",
							items: [
								{
									label: "Print",
								},
							],
						},
						{
							label: "List",
						},
					],
				},
			],
		},
		{
			label: "Events",
			items: [
				{
					label: "Edit",
					items: [
						{
							label: "Save",
						},
						{
							label: "Delete",
						},
					],
				},
				{
					label: "Archieve",
					items: [
						{
							label: "Remove",
						},
					],
				},
			],
		},
		{
			label: "Quit",
		},
	];
	const start = (
		<img alt="logo" src={HeaderBgImg} height="40" width="120"></img>
	);

	const [menuList, setMenuList] = useState(null);


	useEffect(() => {
		const getMenuTreeData = async () => {
			const [err, result] = await until(getMenuTree());
			if (err) {
				console.error("Error", err);
				return;
			}
			setMenuList(result.data);
		};
		getMenuTreeData();
	}, []);


	return (
		<Layout>
			<BreadCrumbComponent />
			<MenubarComponent headerItems={headerItems} start={start} />
			{/**  end={end} */}
			<ToastComponent />
			<SidebarMenuList menuList={menuList} />
			<GraphFilter />
			<DetailDrawer open={true} />
		</Layout>
	);
}
export default Dashboard;
