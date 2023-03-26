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