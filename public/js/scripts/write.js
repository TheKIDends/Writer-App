import {getDate} from "../utilities/index.js";
import {checkAuthentication} from "./authentication.js";

checkAuthentication();

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
    event.preventDefault();
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

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/write', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() { // callback
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);

                if (response.message === 'Lưu thành công!') {
                    window.location.href = "/";
                }
                alert(response.message);
            } else {
                console.error(xhr.status);
            }
        }
    };

    const time = getDate();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('date_opened', time);
    formData.append('date_modified', time);
    xhr.send(new URLSearchParams(formData));

});

const btnCancel = document.getElementById('btn-cancel');
btnCancel.addEventListener('click', (event) => {
    if (confirm("Bạn có chắc chắn muốn hủy bài viết không?")) {
        window.location.href = "/";
    } else {

    }
});