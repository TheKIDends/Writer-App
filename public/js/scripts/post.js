import {downloadHTML, downloadWord} from "../utilities/download.js";
import {getDate} from "../utilities/index.js";
import {checkAuthentication} from "./authentication.js";

checkAuthentication();
const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const postTitle = document.getElementById('post_title');
const postContent = document.getElementById('post_content');
const btnDownloadHtml = document.getElementById('btn-download-html');
const btnDownloadWord = document.getElementById('btn-download-word');

const xhr = new XMLHttpRequest();
xhr.open('POST', '/api/post', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

xhr.onreadystatechange = function() { // callback
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const data = response.data;

            if (response.message === "Token expired") {
                window.location.href = "/login";
                alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            }
            else if (response.message === "false") {
                window.location.href = "/login";
                alert("Vui lòng đăng nhập.");
            }
            else {
                document.cookie = `token=${response.token}`;
                if (data.message === 'true') {
                    let post = JSON.parse(data.post);
                    processResponse(post);
                } else {
                    btnDownloadHtml.style.display = "none";
                    btnDownloadWord.style.display = "none";
                    postTitle.textContent = "Not found!!!";
                }
            }

        } else {
            console.error(xhr.status);
        }
    }
};

const formData = new FormData();
formData.append('token', token);
formData.append('post_id', id);
xhr.send(new URLSearchParams(formData));


function processResponse(post) {
    postTitle.textContent = post.title;
    postContent.innerHTML = post.content;

    btnDownloadHtml.addEventListener('click', (event) => {
        downloadHTML(post.content, post.title);
    });

    btnDownloadWord.addEventListener('click', (event) => {
        downloadWord(post.content, post.title);
    });
}

const logOut = document.getElementById('log_out');
logOut.addEventListener('click', (event) => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        document.cookie = `token=`;
        window.location.href = "/login";
    } else {
    }
});


