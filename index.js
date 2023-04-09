import express from "express";
import {config} from "dotenv";
import {home_router} from "./routes/home.js";
import {auth_router} from "./routes/authentication.js";
import bodyParser from "body-parser";

config();
const app = express();
const PORT = process.env.PORT;

app.use(express.static('.'));
app.use('/tinymce', express.static('./node_modules/tinymce'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', home_router);
app.use('/', auth_router);

app.listen(PORT, function() {
    console.log('server running: http://localhost:' + PORT);
});
