import jwt from  'jsonwebtoken';

export function generateAccessToken(jsonInfo) {
    return jwt.sign(jsonInfo, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

export function authenticateToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return "true";
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return "Token expired";
        } else {
            return "false";
        }
    }
}