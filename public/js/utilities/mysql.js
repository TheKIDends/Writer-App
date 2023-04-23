import {db} from "../../../database/mysql.js";
import jwt from "jsonwebtoken";
import {token} from "./tokens.js";

export async function addPost(post) {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const email = decodedToken.email;

    return new Promise((resolve, reject)=>{
        db.query(
            `
                SELECT *
                FROM user
                WHERE email = '${email}';
            `
            , async (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    return resolve('Có lỗi xảy ra! Vui lòng thử lại');
                }

                const author_id = result[0].id;

                return resolve( new Promise((resolve, reject)=>{
                    db.query(
                        `
                        INSERT INTO posts (author_id, title, content, date_opened, date_modified)
                        VALUES (${author_id}, '${post.title}', '${post.content}',
                                DATE_FORMAT(STR_TO_DATE('${post.date_opened}', '%Y-%m-%d %H:%i:%s'), '%Y-%m-%d %H:%i:%s'),
                                DATE_FORMAT(STR_TO_DATE('${post.date_modified}', '%Y-%m-%d %H:%i:%s'),
                                            '%Y-%m-%d %H:%i:%s'));
                    `
                        , async (err, result) => {
                            if (err) {
                                return resolve('Có lỗi xảy ra! Vui lòng thử lại');
                            }
                            return resolve('Lưu thành công!');
                        }
                    );
                }));

            }
        );
    });
}

export async function getPost() {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const email = decodedToken.email;

    return new Promise((resolve, reject)=>{
        db.query(
            `
                SELECT *
                FROM user
                WHERE email = '${email}';
            `
            , async (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    return resolve('False');
                }

                const author_id = result[0].id;

                return resolve( new Promise((resolve, reject)=>{
                    db.query(
                        `
                            SELECT *
                            FROM posts
                            WHERE author_id = '${author_id}';
                        `
                        , async (err, result) => {
                            if (err) {
                                return resolve('False');
                            }

                            const posts = JSON.stringify(result);
                            return resolve(posts);
                        }
                    );
                }));

            }
        );
    });
}