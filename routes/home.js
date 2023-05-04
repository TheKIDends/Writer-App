import express from "express";
import {authenticateToken} from "../public/js/utilities/tokens.js";
import {
    addPost, deletePostById,
    editPost,
    getPostById,
    getPosts,
    getRefreshToken,
    setTokenByRefreshToken
} from "../public/js/utilities/mysql.js";
import jwt from "jsonwebtoken";

export const home_router = express.Router();

home_router.get('/', (req, res) => {
    res.render('home.ejs');
})

home_router.post('/api/home', async (req, res) => {
    let token = req.body.token;
    const resultAuthenticateToken = await authenticateToken(token);

    if (resultAuthenticateToken.message === "Token expired" ||
        resultAuthenticateToken.message === "false") {
        return res.send({ message: resultAuthenticateToken.message });
    }

    if (resultAuthenticateToken.message === 'New token') {
        const resultGetRefreshToken = await getRefreshToken(token);
        const refresh_token = resultGetRefreshToken.refresh_token;

        token = resultAuthenticateToken.token;
        const resultSetTokenByRefreshToken = await setTokenByRefreshToken(refresh_token, token)
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const email = decodedToken.email;
    const data = await getPosts(email);
    return res.send(JSON.stringify({ message: 'true', token: token, data: data }));
})

home_router.post('/api', async (req, res) => {
    let token = req.body.token;
    const resultAuthenticateToken = await authenticateToken(token);

    if (resultAuthenticateToken.message === "Token expired" ||
        resultAuthenticateToken.message === "false") {
        return res.send({ message: resultAuthenticateToken.message });
    }

    if (resultAuthenticateToken.message === 'New token') {
        const resultGetRefreshToken = await getRefreshToken(token);
        const refresh_token = resultGetRefreshToken.refresh_token;

        token = resultAuthenticateToken.token;
        const resultSetTokenByRefreshToken = await setTokenByRefreshToken(refresh_token, token)
    }
    return res.send(JSON.stringify({ message: 'true', token: token }));
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
    const resultAddPost = await addPost(data.token, post);
    return res.send(resultAddPost);
})

home_router.get('/post', (req, res) => {
    res.render('post.ejs');
})

home_router.post('/api/post', async (req, res) => {
    let token = req.body.token;
    const resultAuthenticateToken = await authenticateToken(token);
    if (resultAuthenticateToken.message === "Token expired" ||
        resultAuthenticateToken.message === "false") {
        return res.send({ message: resultAuthenticateToken.message });
    }
    if (resultAuthenticateToken.message === 'New token') {
        const resultGetRefreshToken = await getRefreshToken(token);
        const refresh_token = resultGetRefreshToken.refresh_token;
        token = resultAuthenticateToken.token;
        const resultSetTokenByRefreshToken = await setTokenByRefreshToken(refresh_token, token)
    }

    const postId = req.body.post_id;
    const data = await getPostById(postId);
    return res.send(JSON.stringify({ message: 'true', token: token, data: data }));
})

home_router.post('/api/delete_post', async (req, res) => {
    let token = req.body.token;
    const resultAuthenticateToken = await authenticateToken(token);
    if (resultAuthenticateToken.message === "Token expired" ||
        resultAuthenticateToken.message === "false") {
        return res.send({ message: resultAuthenticateToken.message });
    }
    if (resultAuthenticateToken.message === 'New token') {
        const resultGetRefreshToken = await getRefreshToken(token);
        const refresh_token = resultGetRefreshToken.refresh_token;
        token = resultAuthenticateToken.token;
        const resultSetTokenByRefreshToken = await setTokenByRefreshToken(refresh_token, token)
    }

    const postId = req.body.post_id;
    const data = await deletePostById(postId);
    return res.send(JSON.stringify({ message: 'true', token: token, data: data }));
})


home_router.get('/edit', (req, res) => {
    res.render('edit.ejs');
})

home_router.post('/api/edit/get_post', async (req, res) => {
    let token = req.body.token;
    const resultAuthenticateToken = await authenticateToken(token);
    if (resultAuthenticateToken.message === "Token expired" ||
        resultAuthenticateToken.message === "false") {
        return res.send({ message: resultAuthenticateToken.message });
    }
    if (resultAuthenticateToken.message === 'New token') {
        const resultGetRefreshToken = await getRefreshToken(token);
        const refresh_token = resultGetRefreshToken.refresh_token;
        token = resultAuthenticateToken.token;
        const resultSetTokenByRefreshToken = await setTokenByRefreshToken(refresh_token, token)
    }

    const postId = req.body.post_id;
    const data = await getPostById(postId);
    return res.send(JSON.stringify({ message: 'true', token: token, data: data }));
})

home_router.post('/api/edit/edit_post', async (req, res) => {
    let token = req.body.token;
    const resultAuthenticateToken = await authenticateToken(token);
    if (resultAuthenticateToken.message === "Token expired" ||
        resultAuthenticateToken.message === "false") {
        return res.send({ message: resultAuthenticateToken.message });
    }
    if (resultAuthenticateToken.message === 'New token') {
        const resultGetRefreshToken = await getRefreshToken(token);
        const refresh_token = resultGetRefreshToken.refresh_token;
        token = resultAuthenticateToken.token;
        const resultSetTokenByRefreshToken = await setTokenByRefreshToken(refresh_token, token)
    }

    const postId = req.body.post_id;
    const data = JSON.parse(req.body.data);
    const resultEditPost = await editPost(postId, data);

    return res.send(JSON.stringify({ message: 'true', token: token, result: resultEditPost }));
})