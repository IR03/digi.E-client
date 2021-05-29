import React from 'react';
import logo from '../../firefly2.gif'
import AdminNavBar from '../AdminNavBar/AdminNavBar';

const UpdateProduct = () => {
    return (
        <div>
            <AdminNavBar></AdminNavBar>
             <div>
                <img  src={logo} width="100%" height="500" alt="Logo" />
             </div>
        </div>
    );
};

export default UpdateProduct;