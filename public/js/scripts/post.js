import {getTotalPosts, postList} from "../utilities/local_storage.js";
import {downloadHTML, downloadWord} from "../utilities/download.js";

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const title = params.get('title');

const postTitle = document.getElementById('post_title');
const postContent = document.getElementById('post_content');

if (id >= 0 && id < getTotalPosts() && title === postList[id].title) {
    const post = postList[id];
    postTitle.textContent = post.title;
    postContent.innerHTML = post.content;

    const btnDownloadHtml = document.getElementById('btn-download-html');
    btnDownloadHtml.addEventListener('click', (event) => {
        downloadHTML(post.content, post.title);
    });

    const btnDownloadWord = document.getElementById('btn-download-word');
    btnDownloadWord.addEventListener('click', (event) => {
        downloadWord(post.content, post.title);
    });

} else {
    postTitle.textContent = "Not found!!!";
}


