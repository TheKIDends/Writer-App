import {db} from "../../../database/mysql.js";
import jwt from "jsonwebtoken";
import {authenticateToken, token} from "./tokens.js";

export async function addPost(post) {
    if (authenticateToken(token) !== "true") {
        return { message: 'false'};
    }
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
                    return resolve({ message: 'Có lỗi xảy ra! Vui lòng thử lại'});
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
                                return resolve({ message: 'Có lỗi xảy ra! Vui lòng thử lại'});
                            }
                            return resolve({ message: 'Lưu thành công!'});
                        }
                    );
                }));

            }
        );
    });
}

export async function getPosts() {
    if (authenticateToken(token) !== "true") {
        return { message: 'false', posts: {} };
    }
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
                    return resolve({ message: 'false', posts: {} });
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
                                return resolve({ message: 'false', posts: {} });
                            }

                            const posts = JSON.stringify(result);
                            return resolve({ message: 'true', posts: posts });
                        }
                    );
                }));

            }
        );
    });
}

export async function getPostById(postId) {
    if (authenticateToken(token) !== "true") {
        return { message: 'false', post: {} };
    }

    return new Promise((resolve, reject)=>{
        return resolve( new Promise((resolve, reject)=>{
            db.query(
                `
                    SELECT *
                    FROM posts
                    WHERE id = ${postId};
                `
                , async (err, result) => {
                    if (err) {
                        return resolve({ message: 'false', post: {} });
                    }
                    if (result.length === 0) {
                        return resolve({ message: 'false', post: {} });
                    }

                    const post = JSON.stringify(result[0]);
                    return resolve({ message: 'true', post: post });
                }
            );
        }));
    });
}

export async function editPost(postId, data) {
    if (authenticateToken(token) !== "true") {
        return { message: 'false' };
    }

    let sqlData = "";
    for (let key in data) {
        sqlData += key +  ' = ' + data[key] + ','
    }
    sqlData = sqlData.slice(0, -1);

    return new Promise((resolve, reject)=>{
        return resolve( new Promise((resolve, reject)=>{
            db.query(
                `
                    UPDATE posts
                    SET ${sqlData}
                    WHERE id = ${postId};
                `
                , async (err, result) => {
                    if (err) {
                        return resolve({ message: 'false' });
                    }
                    return resolve({ message: 'Chỉnh sửa bài viết thành công!' });
                }
            );
        }));
    });
}