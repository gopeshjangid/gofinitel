import React, { useRef,useEffect } from 'react';
import { Toast } from 'primereact/toast';

const ToastComponent = (props) => {
    const {severity,position,summary, detail,open}  = props;
    const toast = useRef(null);

    useEffect(() => {
        if(open){
            toast.current.show({severity: severity || 'success', summary, detail, life: 3000});
        } else {
            toast.current.clear();
        }
      
    }, [open]);


    return (
            <Toast ref={toast} position={position || 'top-right'} />
    )
}

export default ToastComponent;