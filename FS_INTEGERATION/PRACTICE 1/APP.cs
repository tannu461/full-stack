body {
    background-color: #242424;
    color: #f0f0f0;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

.product-container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 2.5em;
    color: #fff;
    margin-bottom: 40px;
}

.product-cards {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
}

.product-card {
    background-color: #333;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    width: 300px;
    text-align: center;
    border: 1px solid #444;
}

.product-card h2 {
    color: #fff;
    font-size: 1.8em;
    margin-top: 0;
}

.price {
    color: #bbb;
    font-size: 1.2em;
    margin: 15px 0;
}

.buy-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;
}

.buy-button:hover {
    background-color: #0056b3;
}

.loading, .error {
    text-align: center;
    font-size: 1.5em;
    margin-top: 50px;
}

.error {
    color: #ff4d4d;
}
