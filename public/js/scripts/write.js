import {addPost, checkIfTitleExists, getTotalPosts} from "../utilities/local_storage.js";

tinymce.init({
    selector: 'textarea#post_content',
    height: 300,
    plugins:[
        'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'prewiew', 'anchor', 'pagebreak',
        'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
        'table', 'emoticons', 'template', 'codesample'
    ],
    toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' +
        'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
        'forecolor backcolor emoticons',
    menu: {
        favs: {title: 'menu', items: 'code visualaid | searchreplace | emoticons'}
    },
    menubar: 'favs file edit view insert format tools table',
    content_style: 'body{font-family:Helvetica,Arial,sans-serif; font-size:16px}'
});

const postTitle = document.getElementById('post_title');
const postContent = tinymce.get('post_content');

const writeForm = document.getElementById('write_form');
writeForm.addEventListener('submit', (event) => {
    let content = postContent.getContent();
    const title = postTitle.value.trim();

    if (title.length === 0) {
        event.preventDefault();
        alert('Title không được để trống!');
        return;
    }

    // if (checkIfTitleExists(title) === true) {
    //     event.preventDefault();
    //     alert('Title đã tồn tại');
    //     return;
    // }

    if (content.trim().length === 0) {
        content = "No Content!";
    }

    const now = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh' }; // set timezone to GMT+7
    const time = now.toLocaleString('en-US', options);

    const post = {
        id: getTotalPosts(),
        title: title,
        content: content,
        date_opened: time,
        date_modified: time
    }
    addPost(post);

    window.location.href = "/";
    alert('Lưu thành công!');
});


