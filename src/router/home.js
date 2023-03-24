import express from "express"
import Console from "console";

export const router = express.Router()

router.get('/', (req, res) => {
    res.render('home.ejs')
})

router.get('/write', (req, res) => {
    const text = req.query.textarea;
    Console.log(text);
    res.render('write.ejs')
})