import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Product from '../Product/Product';
import ClipLoader from "react-spinners/ClipLoader";

const loaderStyle = `
    display: block;
    margin: 50px auto;
    color: #7386D5;
  `;
const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://aqueous-mesa-06345.herokuapp.com/product')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, [])

    return (
        <Container>
            <ClipLoader loading={loading} css={loaderStyle} />
            <Row xs={1} md={2} lg={3} >
                {
                    products.map(product => <Product product={product} key={product._id}></Product>)
                }
            </Row>
        </Container>
    );
};

export default Home;