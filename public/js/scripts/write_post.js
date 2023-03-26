import {POST_LIST} from "../constants/index.js";

const storage = window !== undefined ? localStorage : null;

if (storage.getItem(POST_LIST) === null)  {
    storage.setItem(POST_LIST, "[]");
}

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

    const post = {
        title: postTitle.value,
        content: postContent,
        date_modified: new Date()
    }
    let postList = JSON.parse(storage.getItem(POST_LIST));
    console.log(postList);

    storage.setItem(POST_LIST, JSON.stringify([...postList, post]));

    alert('Lưu thành công!');
});


