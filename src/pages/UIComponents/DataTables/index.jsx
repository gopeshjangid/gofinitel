import React, { useRef, useState } from 'react';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const DataTableComponent = ({
    rows,
    loading,
    filters,
    dataTableList=[],
    dataTableHeaderList,
    dataTableHeaderTitle="",
    globalFilterValue,
    onGlobalFilterChange,
    exportConfig={},
    selectionModeToBeShown=false,
    rowsPerPageOptions}) => {
    const dt = useRef(null);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const filterFields = [];
    dataTableHeaderList.forEach(el=>{
        return filterFields.push(el.field)
    })

    const exportColumns = exportConfig?.columnsToBeExported?.map(col => ({ title: col.header, dataKey: col.field }));

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    }

    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, dataTableList);
                doc.save('products.pdf');
            })
        })
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(dataTableList);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'products');
        });
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }

    const dynamicColumns = dataTableHeaderList.map((col, i) => {
        return <Column key={i} field={col.field} header={col.header} sortable={col.sortable} filter={col.filter} 
            filterPlaceholder={col.filterPlaceholder} headerStyle={col.headerStyle} filterMenuStyle={{ width: '14rem' }}/>
    });

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <div className='flex'>
                    <Button type="button" icon="pi pi-file" onClick={() => exportCSV(false)} className="mr-2" data-pr-tooltip="CSV" />
                    <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
                    <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
                </div>
                {/* <h5 className="m-0">{dataTableHeaderTitle}</h5> */}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }
    const header = renderHeader();

    return (
        <div className="card">
            <DataTable 
                className="p-datatable-customers" dataKey="id" value={dataTableList} responsiveLayout="scroll" paginator header={header} rows={rows}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                rowsPerPageOptions={rowsPerPageOptions} rowHover filterDisplay="menu" loading={loading} emptyMessage="No customers found."
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" selection={selectedCustomers} 
                onSelectionChange={e => setSelectedCustomers(e.value)} globalFilterFields={filterFields} filters={filters}
                >
                {selectionModeToBeShown && <Column selectionMode="multiple" selectionAriaLabel="name" headerStyle={{ width: '3em' }}></Column>}
                {dynamicColumns}
            </DataTable>
        </div>
    );
}

export default DataTableComponent;