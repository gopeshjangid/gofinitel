import React from 'react';
import DataTableComponent from '../UIComponents/DataTables';
import HeaderComponent from './Header';
// import HeaderBgImg from "../../assets/public/goFintel.svg";

function Dashboard() {
  return (
    <div>
      <div className='header'>
        <DataTableComponent/>
      </div>
    </div>
  )
}
export default Dashboard