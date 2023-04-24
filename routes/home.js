import express from "express";
import {authenticateToken} from "../public/js/utilities/tokens.js";
import {addPost, editPost, getPostById, getPosts} from "../public/js/utilities/mysql.js";

export const home_router = express.Router();

home_router.get('/', (req, res) => {
    res.render('home.ejs');
})

home_router.post('/api/home', async (req, res) => {
    const data = await getPosts();
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
    return res.send(resultAddPost);
})

home_router.get('/post', (req, res) => {
    res.render('post.ejs');
})

home_router.get('/edit', (req, res) => {
    res.render('edit.ejs');
})

home_router.post('/api/edit/get_post', async (req, res) => {
    const postId = req.body.post_id;
    const data = await getPostById(postId);
    return res.send(data);
})

home_router.post('/api/edit/edit_post', async (req, res) => {
    const postId = req.body.post_id;
    const data = JSON.parse(req.body.data);
    const resultEditPost = await editPost(postId, data);
    return res.send(resultEditPost);
})