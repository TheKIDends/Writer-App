import {POST_LIST} from "../constants/index.js";

const storage = window !== undefined ? localStorage : null;

if (storage.getItem(POST_LIST) === null)  {
    storage.setItem(POST_LIST, "[]");
}

export const postList = JSON.parse(storage.getItem(POST_LIST));

export function getTotalPosts() {
    return postList.length;
}

export function addPost(post) {
    storage.setItem(POST_LIST, JSON.stringify([post, ...postList]));
}

export function deletePost(idPost) {
    if (idPost < 0 || idPost >= getTotalPosts()) {
        return false;
    }
    let newPostList = postList;
    newPostList.splice(idPost, 1);
    storage.setItem(POST_LIST, JSON.stringify(newPostList));
    return true;
}

export function checkIfTitleExists(title) {
    for (let idPost = 0; idPost < postList.length; ++idPost) {
        const item = postList[idPost];
        if (item.title === title) {
            return true;
        }
    }
    return false;
}