import express from "express";
import {db} from "../database/mysql.js";

export const auth_router = express.Router();

auth_router.get('/login', (req, res) => {
    res.render('login.ejs');
})

auth_router.get('/register', (req, res) => {
    res.render('register.ejs');
})

auth_router.post('/api/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    db.query(
        `
            INSERT INTO user (username, email, password, is_ban, is_admin)  
            VALUES ('${username}', '${email}', '${password}', 0, 0);
        `
        , (err, result) => {
        if (err) throw err;
        console.log('Dữ liệu từ bảng users: ', result);
    });

})