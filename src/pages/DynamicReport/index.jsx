import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import DataTableComponent from "../../components/DataTables";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import moment from "moment";

//  custom components
import Layout from "../../layouts";
import { Utils } from "../../helpers";
import { getReportDetails, getDynamicActionsTableData } from "../../apis";
const { until } = Utils;

function DynamicTableActions() {
	const location = useLocation();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		code: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
		},
		name: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
		},
		category: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
		},
		quantity: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
		},
	});
	const rowsPerPageOptions = [10, 25, 50];
	const pageSize = 10;

	const fetchReportData = async () => {
		const [err, result] = await until(getDynamicActionsTableData());
		setLoading(false);
		if (err) {
			console.error("Error", err);
			return;
		}

		const columns = result.data.cols.map((col) => {
				return {
					...col,
					sortable: true,
					headerStyle: { minWidth: "16rem" },
					report: true,
				};
			});
		const flatColumnsData = {};
			columns.forEach((column) =>{
				const field = (column.field||'').split(".")[0];
				flatColumnsData[field] = column.format;
			})
		console.log("result.data.data", result.data)
		setData({
			rows: result.data.data.map((row) => {
				const newRow = {};
                Object.keys(row).forEach(column => {
					if(flatColumnsData[column] ==='datetime'){
						newRow[column] = {key: column, value:  moment(row[column].value).format("ll HH:mm:ss A")};
					} else {
						newRow[column] = row[column];
					}
				});
				return newRow;
			}),
			columns,
			actions: result.data.actions
		});
	};
	useEffect(() => {
		document.title = "Dynamic Report Actions";
		fetchReportData();
	}, []);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters["global"].value = value;
		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const fetchReportDetails = async(url, entityIds) =>{
		const [err, ] = await until(getReportDetails(url, entityIds));
		setLoading(false);
		if (err) {
			console.error("Error", err);
			return;
		}
	}

	const showOnGraph = (data) =>{
		const params = {};
		Object.keys(data.params).forEach(param=>{
			const key = data.params[param].replace(/[\[\]']+/g,'').split(".")[0];
			const ids = data.rows.map(row=> row[key].value)
			params[param] = ids;
		});
       fetchReportDetails(data.rule, params);
	}


	
	return (
		<Layout headerLinks={null}>
			<div className="breadcrumb-wrapper"></div>
			<div className="table-wrapper">
				{data?.rows && (
					<DataTableComponent
						pageSize={pageSize}
						dataTableHeaderTitle="Reports"
						customers={data.rows}
						dataTableList={data.rows}
						dataTableHeaderList={data.columns}
						loading={loading}
						exportConfig={{
							columnsToBeExported: data.columns.filter((col) => col.report),
							actions: [{type: 'csv', action : null},{action : null, type: 'xls'},{action:null, type: 'pdf'},...data.actions.map(action =>({...action,label: 'Show on Graph', type: "dynamic", action: showOnGraph}))],
							fileName: `${(location.pathname.split("/")[2]) || 'report'}${moment().format("YYYY-MM-DD HH_mm_ss")}`,
						}}
						selectionModeToBeShown={true}
						rowsPerPageOptions={rowsPerPageOptions}
						emptyMessage={"No data found !"}
						globalFilterValue={globalFilterValue}
						filters={filters}
						onGlobalFilterChange={onGlobalFilterChange}
					/>
				)}
			</div>
		</Layout>
	);
}

export default DynamicTableActions;
