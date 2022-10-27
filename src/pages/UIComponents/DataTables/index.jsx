import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './style.css';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

const DataTableComponent = ({
    rows,
    statusFilterTemplate,
    loading,
    filters,
    dataTableList,
    dataTableHeaderList,
    dataTableHeaderTitle,
    globalFilterValue,
    onGlobalFilterChange,
    rowsPerPageOptions}) => {

    const [selectedCustomers, setSelectedCustomers] = useState(null);
    
    const filterFields = [];
    dataTableHeaderList.forEach(el=>{
        return filterFields.push(el.field)
    })

    const dynamicColumns = dataTableHeaderList.map((col, i) => {
        return <Column key={i} field={col.field} header={col.header} sortable={col.sortable} filter={col.filter} 
            filterPlaceholder={col.filterPlaceholder} headerStyle={col.headerStyle} filterMenuStyle={{ width: '14rem' }}/>
    });

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">{dataTableHeaderTitle}</h5>
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
                <Column selectionMode="multiple" selectionAriaLabel="name" headerStyle={{ width: '3em' }}></Column>
                {dynamicColumns}
            </DataTable>
        </div>
    );
}

export default DataTableComponent;