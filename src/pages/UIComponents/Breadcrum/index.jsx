import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './style.css';

import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';

const BreadCrumbComponent = () => {
    const items = [
        {label: 'Computer'},
        {label: 'Notebook'},
        {label: 'Accessories'},
        {label: 'Backpacks'},
        {label: 'Item'}
    ];

    const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' }

    return (
        <div>
            <div className="card">
                <BreadCrumb model={items} home={home} />
            </div>
        </div>
    );
}

export default BreadCrumbComponent;