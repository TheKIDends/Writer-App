import {addPost, getTotalPosts} from "../utilities/local_storage.js";

const writeForm = document.getElementById('write_form');

writeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const postTitle = document.getElementById('post_title');
    let postContent = tinymce.get('post_content').getContent();

    if (postTitle.value.trim().length === 0) {
        alert('Title không được để trống!');
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
        title: postTitle.value,
        content: postContent,
        date_modified: time
    }
    addPost(post);

    alert('Lưu thành công!');
});


