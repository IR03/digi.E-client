import React from "react";
import { useState } from "react";
import logo from '../../giphy.gif'

import AdminNavBar from "../AdminNavBar/AdminNavBar";



const Admin = () => {
    const [showSideBar, setShowSideBar] = useState(false);
    return (
        <>
            
            <div className="wrapper">
                <div id="content">
                    <AdminNavBar setShowSidebar={setShowSideBar} show={showSideBar} />
                </div>
                <div>
                <img  src={logo} width="100%" height="500" alt="Logo" />
                </div>
            </div>
            
        </>
    );
};

export default Admin;