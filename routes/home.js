import express from "express";

export const home_router = express.Router();

home_router.get('/', (req, res) => {
    res.render('home.ejs');
})

home_router.get('/write', (req, res) => {
    res.render('write.ejs');
})

home_router.get('/post', (req, res) => {
    res.render('post.ejs');
})

home_router.get('/edit', (req, res) => {
    res.render('edit.ejs');
})