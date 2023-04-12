import express from "express";
import {authenticateToken} from "../public/js/utilities/tokens.js";

export const home_router = express.Router();

home_router.get('/', (req, res) => {
    res.render('home.ejs');
})

home_router.post('/api/home', (req, res) => {
    const token = req.body.token;
    let accessToken = authenticateToken(token);
    return res.send({ message: accessToken});
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