
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';

const Sidebar = () => {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);

    return (
        <div>
            <div className="card">
                <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
                    <h3>Left Sidebar</h3>
                </Sidebar>

                <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <h3>Right Sidebar</h3>
                </Sidebar>

            </div>
        </div>
    )
}
                 