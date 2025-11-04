const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware: Enable CORS for the React app running on port 3001
app.use(cors({
    origin: 'http://localhost:3001' 
}));
app.use(express.json());

const products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 45 }
];

// API Route to get the list of products
app.get('/api/products', (req, res) => {
    // Simulate a network delay for better testing experience
    setTimeout(() => {
        res.json(products);
    }, 500);
});

app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
});
