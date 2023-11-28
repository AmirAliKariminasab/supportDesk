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

app.get('/', (req, res) => {
    res.status(200).json({ message: 'hello' })
})

// Routes
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/tickets', require('./Routes/ticketRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started On Port ${port}`));