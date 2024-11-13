const jwt = require ('jsonwebtoken');

// Middleware function to authenticate incoming requests
const auth = (req, res, next) => {
    // Get the token from the Authorization header and remove "Bearer " prefix
    const token = req.header('Authorization').replace('Bearer ', '');

    // Check if the token is missing; if so, deny access with a 401 status
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        // Verify the token with a secret key ('secret_x') and decode the payload
        const decoded = jwt.verify(token, 'secret_x');
        // Attach the decoded user information to the request object
        req.user = decoded;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, respond with a 401 status and error message
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth ; 