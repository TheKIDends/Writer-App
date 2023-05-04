import {checkAuthentication} from "./authentication.js";

checkAuthentication();
const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const xhr = new XMLHttpRequest();
xhr.open('POST', '/api/edit/get_post', true);
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
                    window.location.href = `/post?id=-1`;
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
    tinymce.init({
        selector: 'textarea#post_content',
        setup: function (editor) {
            editor.on('init', function () {
                tinymce.get('post_content').setContent(post.content);
            });
        },
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

    window.addEventListener('load', function() {
        postTitle.textContent = post.title;
    });

    const editForm = document.getElementById('edit_form');
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = postTitle.value.trim();
        const content = postContent.getContent();
        const data = { title: '\'' + title + '\'', content: '\'' + content + '\'' };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/edit/edit_post', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function() { // callback
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    const result = response.result;

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
                        if (result.message === 'Chỉnh sửa bài viết thành công!') {
                            window.location.href = `/post?id=${id}`;
                            alert(result.message);
                        } else {
                            alert('Có lỗi xảy ra!');
                        }
                    }

                } else {
                    console.error(xhr.status);
                }
            }
        };

        // console.log(data);
        const formData = new FormData();
        formData.append('token', token);
        formData.append('post_id', id);
        formData.append('data', JSON.stringify(data));
        xhr.send(new URLSearchParams(formData));
    });
}

const btnCancel = document.getElementById('btn-cancel');
btnCancel.addEventListener('click', (event) => {
    if (confirm("Bạn có chắc chắn muốn hủy chỉnh sửa không?")) {
        window.location.href = "/";
    } else {

    }
});


