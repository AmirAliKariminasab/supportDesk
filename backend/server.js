const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

// Connect to DB
connectDb();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/tickets', require('./Routes/ticketRoutes'));

// serve frontend
if (process.env.NODE_ENV === 'production') {
    // set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started On Port ${port}`));