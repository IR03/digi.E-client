import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Col, Container, Form, Image, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { USerContext } from '../../App';

const Checkout = () => {
    const { loggedInUser } = useContext(USerContext);
    const { cart } = useContext(USerContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        const orderDetails = { ...loggedInUser, product: cart, shipment: data, orderTime: new Date() }

        axios.post('https://aqueous-mesa-06345.herokuapp.com/addOrder', orderDetails)
            .then(res => res.data && swal("Order place successfully", "Your order place successfully!", "success"))
            .catch(error => console.log(error.message));
    }

    return (
        <Container>
            <h2>Checkout</h2>
            <div className="shadow px-4 pt-4 my-4" style={{ borderRadius: '15px' }}>
                <div className="row">
                    <div className="col-md-6 mt-5 ">
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{cart.productName}</td>
                                    <td><Image height="30" src={cart.productImage} /></td>
                                    <td>1</td>
                                    <td>${cart.price}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3">Total</td>
                                    <td>${cart.price}</td>
                                </tr>
                            </tfoot>
                        </Table>
                    </div>
                    <div className="col-md-6 mt-2">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group as={Col} >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    {...register("name", { required: true })}
                                    defaultValue={loggedInUser.userName}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    {...register("Address", { required: true })}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Mobile Number"
                                    name="mobileNumber"
                                    {...register("mobileNumber", { required: true })}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
            <div>
                <Button 
                     onClick={handleSubmit(onSubmit)} variant="outline-danger" type="submit" >
                    Place Order
				</Button>
            </div>
        </Container>
    );
};

export default Checkout;