import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
const BreadCrumbComponent = (props) => {
    const { items = [], home } = props;
    const navigate = useNavigate();

    const clickHandler = (url, item, click) => {
        if (url) {
            navigate(url);
        } else if (click) {
            click(item);
        }

    };

    return (
        <div>
            <div class="card"><nav class="p-breadcrumb p-component" aria-label="Breadcrumb">
                <ul>
                    <li class="p-breadcrumb-home">
                        <a onClick={() => navigate(home?.url)} class="p-menuitem-link">
                            <span class="p-menuitem-icon pi pi-home"></span>
                        </a>
                    </li>
                    {
                        items.map((item, index) => <React.Fragment key={`key--${index}`}>
                            <li class="p-breadcrumb-chevron pi pi-chevron-right"></li>
                            <li class=""><a onClick={() => clickHandler(item.url, item, item.onClick)} class="p-menuitem-link"><span class="p-menuitem-text">{item.label}</span></a></li>
                        </React.Fragment>)
                    }
                </ul></nav></div>
        </div>
    );
};

export default BreadCrumbComponent;