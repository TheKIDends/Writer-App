import express from "express";
import {authenticateToken} from "../public/js/utilities/tokens.js";
import {addPost, getPost} from "../public/js/utilities/mysql.js";

export const home_router = express.Router();

home_router.get('/', (req, res) => {
    res.render('home.ejs');
})

home_router.post('/api/home', async (req, res) => {
    const data = await getPost();
    return res.send(data);
})

home_router.post('/api', (req, res) => {
    const token = req.body.token;
    let accessToken = authenticateToken(token);
    return res.send({ message: accessToken });
})

home_router.get('/write', (req, res) => {
    res.render('write.ejs');
})

home_router.post('/api/write', async (req, res) => {
    const data = req.body;
    const post = {
        title: data.title,
        content: data.content,
        date_opened: data.date_opened,
        date_modified: data.date_modified
    }
    const resultAddPost = await addPost(post);
    return res.send({ message: resultAddPost});
})

home_router.get('/post', (req, res) => {
    res.render('post.ejs');
})

home_router.get('/edit', (req, res) => {
    res.render('edit.ejs');
})

home_router.post('/api/edit', async (req, res) => {
    const data = await getPost();
    return res.send(data);
})
