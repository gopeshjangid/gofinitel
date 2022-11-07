import { useEffect, useState } from "react";
import DataTableComponent from "../../components/DataTables";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import moment from "moment";

//  custom components
import Layout from "../../layouts";
import { Utils } from "../../helpers";
import { getReportData } from "../../apis";
import { useTranslation } from "react-i18next";
const { until } = Utils;

function ReportList() {
	const { t } = useTranslation();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const pageTitle = t("Latest reports");
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
		const [err, result] = await until(getReportData());
		setLoading(false);
		if (err) {
			console.error("Error", err);
			return;
		}
		console.log("result.data.data", result.data);
		setData({
			rows: result.data.data.map((row) => {
				row.submissionDate.value = moment(row.submissionDate.value).format(
					"ll HH:mm:ss A"
				);
				return row;
			}),
			columns: result.data.cols.map((col) => {
				return {
					...col,
					sortable: true,
					headerStyle: { minWidth: "16rem" },
					report: true,
				};
			}),
		});
	};
	useEffect(() => {
		document.title = pageTitle;
		fetchReportData();
	}, []);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters["global"].value = value;
		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	return (
		<Layout headerLinks={null}>
			<div className="breadcrumb-wrapper"></div>
			<div className="table-wrapper">
				{data?.rows && (
					<DataTableComponent
						pageSize={pageSize}
						dataTableHeaderTitle={pageTitle}
						dataTableList={data.rows}
						dataTableHeaderList={data.columns}
						loading={loading}
						exportConfig={{
							columnsToBeExported: data.columns.filter((col) => col.report),
							actions: [{ type: 'csv', action: null }, { action: null, type: 'xls' }, { action: null, type: 'pdf' }],
							fileName: `${pageTitle} ${moment().format("YYYY-MM-DD HH_mm_ss")}`,
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

export default ReportList;
