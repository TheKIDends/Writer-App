import express from "express";

export const router = express.Router();

router.get('/', (req, res) => {
    res.render('home.ejs');
})

router.get('/write', (req, res) => {
    res.render('write.ejs');
})

router.get('/post', (req, res) => {
    res.render('post.ejs');
})

router.get('/edit', (req, res) => {
    res.render('edit.ejs');
})

router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.get('/register', (req, res) => {
    res.render('register.ejs');
})