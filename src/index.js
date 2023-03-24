import express from "express";
import session from "express-session";
import {config} from "dotenv";
import {router} from "./router/home.js";

config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(session({
    secret: 'padv',
    cookie: {maxAge: 60000000}
}));

app.use('/', router);

app.listen(PORT, function() {
    console.log('server running: http://localhost:' + PORT);
});
