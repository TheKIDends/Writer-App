import express from "express";
import {config} from "dotenv";
import {router} from "./routes/home.js";

config();
const app = express();
const PORT = process.env.PORT;

app.use(express.static('.'));
app.use('/tinymce', express.static('./node_modules/tinymce'));

app.use('/', router);

app.listen(PORT, function() {
    console.log('server running: http://localhost:' + PORT);
});
