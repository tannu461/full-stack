import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you create a CSS file for styling

// Component to fetch and display products
function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect runs once after the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Use Axios to send a GET request to the Express API
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError("Failed to fetch products. Is the backend running?");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures it runs only once

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="product-container">
            <h1>Product List</h1>
            <div className="product-cards">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
                        <h2>{product.name}</h2>
                        <p className="price">Price: ${product.price}</p>
                        <button className="buy-button">Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <ProductList />
        </div>
    );
}

export default App;
