import { useEffect, useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataTableComponent from "../../components/DataTables";
import moment from "moment";

function SearchReportTableView(props) {
    const { cols, rows, actions = [], pageTitle } = props;
    const [data, setData] = useState(null);
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
        setData({
            rows: rows.map((row) => {
                row.submissionDate.value = moment(row.submissionDate.value).format(
                    "ll HH:mm:ss A"
                );
                return row;
            }),
            columns: cols.map((col) => {
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
        if (rows) {
            fetchReportData();
        }

    }, [rows]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    return (
        <div className="table-wrapper">
            {data?.rows && (
                <DataTableComponent
                    pageSize={pageSize}
                    dataTableHeaderTitle={pageTitle}
                    dataTableList={data.rows}
                    dataTableHeaderList={data.columns}
                    loading={false}
                    exportConfig={{
                        columnsToBeExported: data.columns.filter((col) => col.report),
                        actions: [{ type: 'csv', action: null }, { action: null, type: 'xls' }, { action: null, type: 'pdf' }, ...actions],
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
    );
}

export default SearchReportTableView;
