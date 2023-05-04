DROP DATABASE IF EXISTS writer_app;
CREATE DATABASE IF NOT EXISTS writer_app;

USE writer_app;

CREATE TABLE posts
(
    id              bigint(20) AUTO_INCREMENT,
    author_id       bigint(20),
    title           varchar(200),
    content         text,
    date_opened     datetime,
    date_modified   datetime,
    PRIMARY KEY (id)
);

CREATE TABLE `user`
(
    id           bigint(20) AUTO_INCREMENT,
    username     varchar(50),
    email        varchar(100),
    password     varchar(100),
    is_ban        tinyint(1),
    is_admin      tinyint(1),
    PRIMARY KEY (id, email)
);


CREATE TABLE `tokens`
(
    id              bigint(20) AUTO_INCREMENT,
    refresh_token   varchar(300),
    token           varchar(300),
    PRIMARY KEY (id, refresh_token)
);


ALTER TABLE posts
    ADD CONSTRAINT posts_user_fk FOREIGN KEY IF NOT EXISTS (author_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE;