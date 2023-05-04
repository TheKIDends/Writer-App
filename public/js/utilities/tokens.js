import jwt from  'jsonwebtoken';
import {getRefreshToken} from "./mysql.js";

export function generateAccessToken(jsonInfo) {
    // return jwt.sign(jsonInfo, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
    return jwt.sign(jsonInfo, process.env.TOKEN_SECRET, { expiresIn: '5s' });
}

export function generateRefreshToken(jsonInfo) {
    return jwt.sign(jsonInfo, process.env.TOKEN_SECRET, { expiresIn: '604800s' });
}

export function authenticateRefreshToken(refresh_token) {
    try {
        const decodedToken = jwt.verify(refresh_token, process.env.TOKEN_SECRET);
        const email = decodedToken.email;
        const password = decodedToken.password;
        return { message: 'true', email: email, password: password};
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return { message: 'Token expired' };
        } else {
            console.log(err);
            return { message: 'false' };
        }
    }
}

export async function authenticateToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return { message: 'true' };
    } catch (err) {
        if (err.name === 'TokenExpiredError') {

            const resultGetRefreshToken = await getRefreshToken(token);
            if (resultGetRefreshToken.message === 'false') {
                return { message: resultGetRefreshToken.message};
            } else {
                const refresh_token = resultGetRefreshToken.refresh_token;
                const resultAuthenticateRefreshToken = authenticateRefreshToken(refresh_token);
                if (resultAuthenticateRefreshToken.message === "Token expired" ||
                    resultAuthenticateRefreshToken.message === "false") {
                    return { message: resultAuthenticateRefreshToken.message};
                } else {
                    const email = resultAuthenticateRefreshToken.email;
                    const password = resultAuthenticateRefreshToken.password;
                    const token = generateAccessToken({ email: email, password: password });
                    return { message: 'New token', token: token};
                }
            }
        } else {
            return { message: 'false' };
        }
    }
}