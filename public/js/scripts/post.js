import {getTotalPosts, postList} from "../utilities/local_storage.js";

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const title = params.get('title');

const postTitle = document.getElementById('post_title');
const postContent = document.getElementById('post_content');

if (id >= 0 && id < getTotalPosts() && title === postList[id].title) {
    const post = postList[id];
    postTitle.textContent = post.title;
    postContent.innerHTML = post.content;
} else {
    postTitle.textContent = "Not found!!!";
}
