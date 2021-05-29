import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AiOutlineCloudUpload } from "react-icons/ai";
import swal from 'sweetalert';
import AdminNavBar from '../AdminNavBar/AdminNavBar';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const [imageUrl, setImageUrl] = useState(null);

    const onSubmit = data => {
        swal("Product Upload successfully", "Your can see it at Homepage!", "success").then(function() {
            window.location = "/";
        })
        const productInfo = {
            productName : data.name,
            price : data.price,
            category : data.category,
            productImage : imageUrl
        };
        axios.post('https://aqueous-mesa-06345.herokuapp.com/addProduct', productInfo)
        
    };
    const handleImageUpload = event => {
        
        const imageData = new FormData();
        imageData.set('key', 'c6d14e3addc2effc4f2f2eb441b09e2c');
        imageData.append('image', event.target.files[0]);
    
    
        axios.post('https://api.imgbb.com/1/upload',imageData)
          .then(function (response) {
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            
          });
    
      }
      
    
    return (
        <div>
            <AdminNavBar/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-5 mx-md-5 mt-5 bg-white" style={{ borderRadius: "15px" }}>
                    <Form.Row>
                        <Form.Group as={Col} md={6} sm={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Product Name</Form.Label>
                            <Form.Control
                                className="shadow-none"
                                name="name"
                                type="text"
                                // defaultValue={editProduct?.productName}
                                {...register("name", { required: true })}
                                placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight: "bold" }}>Category</Form.Label>
                            <Form.Control className="shadow-none"
                                name="category"
                                type="text"
                                // defaultValue={editProduct?.category}
                                {...register("category", { required: true })}
                                placeholder="Enter Category" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{ fontWeight: "bold" }}>Add Price</Form.Label>
                            <Form.Control
                                className="shadow-none"
                                name="price"
                                type="text"
                                // defaultValue={editProduct?.price}
                                {...register("price", { required: true })}
                                placeholder="Enter Price" />
                        </Form.Group>

                        <Form.Group as={Col}>
                             <Form.Label style={{ fontWeight: "bold" }}>Add Photo</Form.Label>
                        
                                <Button
                                    as={"label"}
                                    htmlFor="upload"
                                    variant="outline-info"
                                    className="d-block px-3 upload-btn">
                                    <AiOutlineCloudUpload style={{ fontSize: "1.5rem" }} /> Upload Photo
                                </Button>
                              <Form.Control
                                hidden="hidden"
                                id="upload"
                                name="photo"
                                type="file"
                                {...register("photo", { required: true })}
                                onChange={handleImageUpload}
                                placeholder="Upload photo" />
                        </Form.Group>
                    </Form.Row>
                </div>

                <div className="text-right mr-5 mt-4">
                    <Button type="submit" variant="outline-danger" className="shadow-none">
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddProduct;