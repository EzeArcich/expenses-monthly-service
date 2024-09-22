const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const expensesRoutes = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://lifefinancy', // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/expenses', expensesRoutes);

sequelize.sync().then(() => {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
