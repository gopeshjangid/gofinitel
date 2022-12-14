import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './style.css';

import React from 'react';
import { Menubar } from 'primereact/menubar';

const MenubarComponent = ({headerItems, start, end}) => {

    return (
        <div>
            <div className="card">
                <Menubar model={headerItems} start={start} end={end} />
            </div>
        </div>
    );
}

export default MenubarComponent;