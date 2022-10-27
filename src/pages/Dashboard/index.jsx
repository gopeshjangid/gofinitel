import React, { useState, useEffect } from 'react';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';

import BreadCrumbComponent from '../UIComponents/Breadcrum';
import DataTableComponent from '../UIComponents/DataTables';
import MenubarComponent from '../UIComponents/Menubar';
import ToastComponent from '../UIComponents/Toast';
import { CustomerService } from '../../services/CustomerService';

import HeaderBgImg from "./../../assets/public/logo/goFintel.svg";

function Dashboard() {
    const rowsPerPageOptions = [10,25,50];
    const rows=10;
    const headerItems = [
        {
            label: 'File',
            items: [
                {
                    label: 'New',
                    items: [
                        {
                            label: 'Bookmark',
                        },
                        {
                            label: 'Video',
                        },

                    ]
                },
                {
                    label: 'Delete',
                },
                
                {
                    label: 'Export',
                }
            ]
        },
        {
            label: 'Edit',
            items: [
                {
                    label: 'Left',
                },
                {
                    label: 'Right',
                },
                {
                    label: 'Center',
                },
                {
                    label: 'Justify',
                },

            ]
        },
        {
            label: 'Users',
            items: [
                {
                    label: 'New',

                },
                {
                    label: 'Delete',

                },
                {
                    label: 'Search',
                    items: [
                        {
                            label: 'Filter',
                            items: [
                                {
                                    label: 'Print',
                                }
                            ]
                        },
                        {
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            items: [
                {
                    label: 'Edit',
                    items: [
                        {
                            label: 'Save',
                        },
                        {
                            label: 'Delete',
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    items: [
                        {
                            label: 'Remove',
                        }
                    ]
                }
            ]
        },
        {
            label: 'Quit',
        }
    ];
    const start = <img alt="logo" src={HeaderBgImg} height="40" width="120"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    const [customers, setCustomers] = useState(null);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [filters, setFilters] = useState({
		'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'code': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'category': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'quantity': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const dataTableList = [
        {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
        {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
        {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
        {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
        {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
    ];
    const dataTableHeaderList = [
        {field: 'code', header: 'Code', sortable:true, filter:true, headerStyle: { minWidth: '14rem' }, filterPlaceholder:"Search by code"},
        {field: 'name', header: 'Name', sortable:true, filter:true, headerStyle: { minWidth: '14rem' }, filterPlaceholder:"Search by name"},
        {field: 'category', header: 'Category', sortable:true, filter:true, headerStyle: { minWidth: '6rem' }, filterPlaceholder:"Search by category"},
        {field: 'quantity', header: 'Quantity', sortable:true, filter:true, headerStyle: { minWidth: '6rem' }, filterPlaceholder:"Search by quantity"}
    ];
	const cols = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];
    const customerService = new CustomerService();

    useEffect(() => {
        customerService.getCustomersLarge().then(data => { setCustomers(getCustomers(data)); setLoading(false) });
    }, []);

    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    }

  return (
    <div>
      <div className='header'>
        <BreadCrumbComponent/>
        <MenubarComponent headerItems={headerItems} start={start}/>{/**  end={end} */}
        <ToastComponent/>
        <DataTableComponent 
            rows={rows}
            dataTableHeaderTitle="Products"
            customers={customers}
            dataTableList={dataTableList}
            dataTableHeaderList={dataTableHeaderList}
            loading={loading}
            filters={filters}
			exportConfig={{
				columnsToBeExported:cols
			}}
			selectionModeToBeShown={true}
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            rowsPerPageOptions={rowsPerPageOptions}
            />
      </div>
    </div>
  )
}
export default Dashboard