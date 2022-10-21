import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import './style.css';

const ToastComponent = () => {
    const toast = useRef(null);
    const toastTL = useRef(null);
    const toastBC = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});
    }

    const showWarn = () => {
        toast.current.show({severity:'warn', summary: 'Warn Message', detail:'Message Content', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    const showConfirm = () => {
        toastBC.current.show({ severity: 'warn', sticky: true, content: (
            <div className="flex flex-column" style={{flex: '1'}}>
                <div className="text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    <h4>Are you sure?</h4>
                    <p>Confirm to proceed</p>
                </div>
                <div className="grid p-fluid">
                    <div className="col-6">
                        <Button type="button" label="Yes" className="p-button-success" />
                    </div>
                    <div className="col-6">
                        <Button type="button" label="No" className="p-button-secondary" />
                    </div>
                </div>
            </div>
        ) });
    }

    return (
        <div>
            <Toast ref={toast} />
            <Toast ref={toastTL} position="top-left" />
            <Toast ref={toastBC} position="bottom-center" />

            <div className="card toast-demo">
                <h5>Severities</h5>
                <Button label="Success" className="p-button-success" onClick={showSuccess} />
                <Button label="Info" className="p-button-info" onClick={showInfo} />
                <Button label="Warn" className="p-button-warning" onClick={showWarn} />
                <Button label="Error" className="p-button-danger" onClick={showError} />

                <h5>Custom</h5>
                <Button type="button" onClick={showConfirm} label="Confirm" className="ui-button-warning" />
            </div>
        </div>
    )
}

export default ToastComponent;