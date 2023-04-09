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
            SELECT * FROM user WHERE email = '${email}';
        `
        , async (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                console.log('Email đã được sử dụng');
                return res.send('Email đã được sử dụng');
            }

            db.query(
                `
                    INSERT INTO user (username, email, password, is_ban, is_admin)  
                    VALUES ('${username}', '${email}', '${password}', 0, 0);
                `
                , async (err, result) => {
                    if (err) throw err;
                    console.log('Dữ liệu từ bảng users: ', result);
                }
            );
            console.log('Đăng kí thành công');
            return res.send('Đăng kí thành công hãy đăng nhập');
        }
    );

})