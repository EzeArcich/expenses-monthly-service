require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
console.log('JWT_SECRET:', jwtSecret);


// Middleware para verificar el token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Guarda la información del usuario en la request
        next();
    });
}


module.exports = { authenticateToken };

