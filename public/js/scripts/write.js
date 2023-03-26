import {addPost, checkIfTitleExists, getTotalPosts} from "../utilities/local_storage.js";

const writeForm = document.getElementById('write_form');

writeForm.addEventListener('submit', (event) => {
    const postTitle = document.getElementById('post_title');
    let postContent = tinymce.get('post_content').getContent();

    const title = postTitle.value.trim();

    if (title.length === 0) {
        event.preventDefault();
        alert('Title không được để trống!');
        return;
    }

    if (checkIfTitleExists(title) === true) {
        event.preventDefault();
        alert('Title đã tồn tại');
        return;
    }

    if (postContent.trim().length === 0) {
        postContent = "No Content!";
    }

    const now = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh' }; // set timezone to GMT+7
    const time = now.toLocaleString('en-US', options);

    const post = {
        id: getTotalPosts(),
        title: title,
        content: postContent,
        date_opened: time,
        date_modified: time
    }
    addPost(post);

    window.location.href = "/";
    alert('Lưu thành công!');
});


