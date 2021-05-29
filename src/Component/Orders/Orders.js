import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { USerContext } from '../../App';
import './Orders.css';

const Orders = () => {

    const { loggedInUser } = useContext(USerContext)
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        axios.get(`https://aqueous-mesa-06345.herokuapp.com/orders?email=${loggedInUser.email}`)
            .then(res => setOrderDetails(res.data))
            .catch(error => console.log(error.message))
    }, [loggedInUser.email])

    return (
        <Container>
            {orderDetails.length ?
                <>
                    <h1 className="text-center" style={{ fontSize: '2rem' }}>Thanks for your order</h1>
                    <h6 className="text-center mb-5">Your Order is being processed</h6>
                    <h5>Order List</h5>
                    <Row>
                        <div className=" allOrders orderScroll ">
                            {
                                orderDetails.map(order => {

                                    return (
                                        <div className="orderItemBox text-center">
                                            <p>
                                                Order Id:{" "}
                                                {order._id}
                                            </p>
                                            <p>
                                                {order.shipment?.name}
                                            </p>
                                            <p>
                                                {order.shipment?.Address}
                                            </p>
                                            <p>
                                                Order Date:{" "}
                                                {new Date(
                                                    order.orderTime
                                                ).toDateString(
                                                    "dd/MM/yyyy"
                                                )}
                                            </p>
                                            <p>
                                                {order.product?.productName}
                                            </p>
                                            <p>
                                                ${order.product?.price}
                                            </p>

                                        </div>

                                    );
                                })
                            }

                        </div>
                    </Row>
                </>
                :
                <>
                    <h1 className="text-center" style={{ fontSize: '2rem' }}>You haven't ordered anything yet!</h1>
                </>
            }
        </Container>
    );
};

export default Orders;