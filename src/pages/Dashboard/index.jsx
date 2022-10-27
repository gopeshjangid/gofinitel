import React from 'react';
import BreadCrumbComponent from '../UIComponents/Breadcrum';
import DataTableComponent from '../UIComponents/DataTables';
import MenubarComponent from '../UIComponents/Menubar';
import ToastComponent from '../UIComponents/Toast';
// import HeaderBgImg from "../../assets/public/goFintel.svg";

function Dashboard() {
  return (
    <div>
      <div className='header'>
        {/* <BreadCrumbComponent/> */}
        {/* <MenubarComponent/> */}
        <ToastComponent open={true} detail="Hello" />
        <DataTableComponent/>
      </div>
    </div>
  )
}
export default Dashboard