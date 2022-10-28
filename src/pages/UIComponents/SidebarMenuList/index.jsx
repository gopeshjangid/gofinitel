import React from 'react';
import './style.css'

function SidebarMenuList({
    menuList
}) {
    console.log(menuList)
  return (
    <div className='menuListContainer'>
        {Array.isArray(menuList) && menuList.map((menuItem, i) => {
            return <div key={i}>
                        <label className='menuHeading'>{ menuItem?.label }</label>
                        <div className='menuHeadingSublistContainer'>
                            {menuItem?.items && menuItem?.items.map((menuSubitem, i)=>(
                                <div key={i} className="menuHeadingSublist">
                                    {menuSubitem?.label}
                                </div>
                            ))}
                        </div>
                </div>
            }
        )}
    </div>
  )
}

export default SidebarMenuList