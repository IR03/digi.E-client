import axios from 'axios';
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


const ActionItem = ({product}) => {
    const { productImage, productName, category, price, _id } = product;
    const deleteProduct = (id)=> {
        swal("Order successfully deleted", "Your order successfully deleted!", "success")
        axios.delete(`https://aqueous-mesa-06345.herokuapp.com/deleteProduct/${id}`)
        
    };
    return (
        <>
            <tbody style={{ fontWeight: "500" }}>
                <tr>
                    <td>
                        <Image height="50" src={productImage} rounded />
                    </td>
                    <td>{productName}</td>
                    <td>{category || ""}</td>
                    <td>${price}</td>
                    <td>
                        <Button
                            as={Link} to ='/home'
                            variant="outline-danger"
                            className="p-1 ml-2 mb-0 shadow-none"
                            onClick={(event) => deleteProduct(_id)}>
                            <RiDeleteBinLine style={{ fontSize: "1.3rem" }} />
                        </Button>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default ActionItem;