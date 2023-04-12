import {getTotalPosts, postList, setPostList} from "../utilities/local_storage.js";
import {checkAuthentication} from "./authentication.js";

checkAuthentication();

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id < 0 || id >= getTotalPosts()) {
    window.location.href = `/post?id=-1&title=`;
} else {
    tinymce.init({
        selector: 'textarea#post_content',
        setup: function (editor) {
            editor.on('init', function () {
                tinymce.get('post_content').setContent(postList[id].content);
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
        postTitle.textContent = postList[id].title;
    });

    const editForm = document.getElementById('edit_form');
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let content = postContent.getContent();
        const title = postTitle.value.trim();

        postList[id].title = title;
        postList[id].content = content;
        setPostList(postList);

        window.location.href = `/post?id=${id}&title=${title}`;
        alert('Chỉnh sửa bài viết thành công!');
    });
}

const btnCancel = document.getElementById('btn-cancel');
btnCancel.addEventListener('click', (event) => {
    if (confirm("Bạn có chắc chắn muốn hủy chỉnh sửa không?")) {
        window.location.href = "/";
    } else {

    }
});


