import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ActionItem from '../ActionItem/ActionItem';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import ClipLoader from "react-spinners/ClipLoader";


const loaderStyle = `
    display: block;
    margin: 50px auto;
    color: #7386D5;
  `;
const DeleteProduct = () => {
    
    const [products, setProducts] = useState([]);
    
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('https://aqueous-mesa-06345.herokuapp.com/product')
          .then(res => {
              setProducts(res.data)
              setLoading(false)
          })

          .catch(error => console.log(error))
    },[])

    return (
        <div className="adminNavBar">
            <AdminNavBar></AdminNavBar>
            <div className="px-5 pt-4 mx-md-4 mt-5 bg-white" style={{ borderRadius: "15px" }}>
            <Table hover borderless responsive>
                <thead className="bg-light">
                    <tr>
                        <th>Product</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <ClipLoader loading={loading} css={loaderStyle} />
                {
                    products?.map(product => <ActionItem product={product}  />)
                }
            </Table>
            </div>
        </div>
    );
};

export default DeleteProduct;