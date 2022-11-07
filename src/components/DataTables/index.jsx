import React, { useRef, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const DataTableComponent = ({
	pageSize,
	loading,
	filters,
	emptyMessage,
	dataTableList = [],
	dataTableHeaderList,
	globalFilterValue,
	isPaginator,
	onGlobalFilterChange,
	exportConfig = {},
	selectionModeToBeShown = false,
	rowsPerPageOptions,
	onSelectedRows = () => { }
}) => {
	const dt = useRef(null);
	const [selectedRows, setSelectedRows] = useState([]);
	const filterFields = [];
	dataTableHeaderList.forEach((el) => {
		return filterFields.push(el.field);
	});

	const exportColumns = exportConfig?.columnsToBeExported?.map((col) => ({
		title: col.header,
		dataKey: col.field,
	}));
	const exportCSV = (selectionOnly) => {
		dt.current.exportCSV({ selectionOnly });
	};

	useEffect(() => {
		onSelectedRows(selectedRows);
	}, [selectedRows]);
	const exportFormattedData = () => {
		return dataTableList.map(row => {
			const newRow = {};
			Object.keys(row).forEach(fieldName => {
				const key = `${fieldName}.${row[fieldName].valueLabel ? 'valueLabel' : 'value'}`;
				newRow[key] = row[fieldName].valueLabel || row[fieldName].value;
			});
			return newRow;
		});
	};

	const getHeadingNames = (row) => {
		return [Object.keys(row).map(head => {
			const header = exportColumns.find(item => item.dataKey === head);
			return header.title;
		})];
	};

	const exportPdf = () => {
		import("jspdf").then((jsPDF) => {
			import("jspdf-autotable").then(() => {
				const doc = new jsPDF.default(0, 0);
				const data = exportFormattedData();
				doc.autoTable(exportColumns, data);
				doc.save(exportConfig?.fileName || "file.pdf");
			});
		});
	};

	const exportExcel = () => {
		import("xlsx").then((xlsx) => {
			const data = exportFormattedData();
			const headings = getHeadingNames(data[0] || {});
			const worksheet = xlsx.utils.json_to_sheet(data);
			xlsx.utils.sheet_add_aoa(worksheet, headings, { origin: 'A1' });
			const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
			const excelBuffer = xlsx.write(workbook, {
				bookType: "xlsx",
				type: "array",
			});

			saveAsExcelFile(excelBuffer, exportConfig?.fileName || "file");
		});
	};

	const saveAsExcelFile = (buffer, fileName) => {
		import("file-saver").then((module) => {
			if (module && module.default) {
				let EXCEL_TYPE =
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
				let EXCEL_EXTENSION = ".xlsx";
				const data = new Blob([buffer], {
					type: EXCEL_TYPE,
				});

				module.default.saveAs(
					data,
					fileName + EXCEL_EXTENSION
				);
			}
		});
	};

	const dynamicColumns = dataTableHeaderList.map((col, i) => {
		return (
			<Column
				key={i}
				field={col.field}
				header={col.header}
				sortable={col.sortable}
				filter={col.filter}
				filterPlaceholder={col.filterPlaceholder}
				headerStyle={col.headerStyle}
				filterMenuStyle={{ width: "14rem" }}
			/>
		);
	});

	const getActionButton = (actionParams) => {
		const { type, action, label, icon } = actionParams;

		switch (type) {
			case 'pdf':
				return <Button
					type="button"
					icon="pi pi-file-pdf"
					onClick={exportPdf}
					className="p-button-warning mr-2"
					data-pr-tooltip="PDF"
				/>;
			case 'xls':
				return <Button
					type="button"
					icon="pi pi-file-excel"
					onClick={exportExcel}
					className="p-button-success mr-2"
					data-pr-tooltip="XLS"
				/>;
			case 'csv':
				return <Button
					type="button" icon="pi pi-file" onClick={() => exportCSV(false)} className="mr-2" data-pr-tooltip="CSV"
				/>;

			default:
				return <Button
					type="button"
					icon={icon}
					label={label}
					onClick={() => action({ ...actionParams, rows: selectedRows })}
					data-pr-tooltip={label}
					disabled={!selectedRows || selectedRows?.length === 0}
				/>;
		}
	};

	const renderHeader = () => {
		return (
			<div className="flex justify-content-between align-items-center">
				<div className="flex">
					{
						(exportConfig?.actions || []).map((action, index) => <React.Fragment key={`action-${index}`}>{getActionButton(action)}</React.Fragment>)
					}

				</div>
				{/* <h5 className="m-0">{dataTableHeaderTitle}</h5> */}
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText
						value={globalFilterValue}
						onChange={onGlobalFilterChange}
						placeholder="Keyword Search"
					/>
				</span>
			</div>
		);
	};
	const header = renderHeader();

	return (
		<div className="card">
			<DataTable
				ref={dt}
				className="p-datatable-report"
				dataKey="id"
				value={dataTableList}
				responsiveLayout="scroll"
				paginator={!!isPaginator}
				header={header}
				rows={pageSize}
				paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
				rowsPerPageOptions={rowsPerPageOptions}
				rowHover
				filterDisplay="menu"
				loading={loading}
				emptyMessage={emptyMessage}
				currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
				selection={selectedRows}
				onSelectionChange={(e) => setSelectedRows(e.value)}
				globalFilterFields={filterFields}
				filters={filters}
			>
				{selectionModeToBeShown && (
					<Column
						selectionMode="multiple"
						selectionAriaLabel="name"
						headerStyle={{ width: "3em" }}
					></Column>
				)}
				{dynamicColumns}
			</DataTable>
		</div>
	);
};

export default DataTableComponent;
