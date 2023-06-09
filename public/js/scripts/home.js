import {checkAuthentication} from "./authentication.js";

checkAuthentication();
const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

const postList = document.getElementById('post_list');

const xhr = new XMLHttpRequest();
xhr.open('POST', '/api/home', true);
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
                    setPosts(data);
                }
            }

        } else {
            console.error(xhr.status);
        }
    }
};

const formData = new FormData();
formData.append('token', token);
xhr.send(new URLSearchParams(formData));

function setPosts(data) {
    const posts = JSON.parse(data.posts);
    for (let idPost = 0; idPost < posts.length; ++idPost) {
        const post = posts[idPost];

        const elementList = document.createElement('div');
        elementList.classList.add('box_list');

        const title = document.createElement('div');
        title.idPost='title-' + post.id;
        title.classList.add('title');
        title.textContent = post.title;
        elementList.appendChild(title);

        const dateOpened = document.createElement('div');
        dateOpened.idPost='date-opened-' + post.id;
        dateOpened.classList.add('date');
        dateOpened.textContent = 'Date opened: ' + post.date_opened;
        elementList.appendChild(dateOpened);

        const dateModified = document.createElement('div');
        dateModified.idPost='date-modified-' + post.id;
        dateModified.classList.add('date');
        dateModified.textContent = 'Date modified: ' + post.date_modified;
        elementList.appendChild(dateModified);

        const buttons = document.createElement('div');

        const btnView = document.createElement('button');
        btnView.idPost='btn-view-' + post.id;
        btnView.classList.add('btn-view');
        btnView.textContent = 'View';
        btnView.href = `/post?id=${post.id}`;
        btnView.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = btnView.href;
        });
        buttons.appendChild(btnView);

        const btnEdit = document.createElement('button');
        btnEdit.idPost='btn-edit-' + post.id;
        btnEdit.classList.add('btn-edit');
        btnEdit.textContent = 'Edit';
        btnEdit.href = `/edit?id=${post.id}`;
        btnEdit.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = btnEdit.href;
        });
        buttons.appendChild(btnEdit);

        const btnDelete = document.createElement('button');
        btnDelete.idPost='btn-delete-' + post.id;
        btnDelete.classList.add('btn-delete');
        btnDelete.textContent = 'Delete';
        btnDelete.addEventListener('click', (event) => {
            if (confirm("Bạn có chắc chắn muốn xóa bài viết không?")) {
                deletePost(post.id, title);
            } else {
                // Hủy thao tác xóa
            }

        });

        buttons.appendChild(btnDelete);

        elementList.appendChild(buttons);

        postList.appendChild(elementList);
    }
}

function deletePost(postId, title) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/delete_post', true);
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
                        window.location.href = "/";
                        alert('Xóa thành công bài viết ' + title.textContent);
                    } else {
                        alert('Xóa thất bại');
                    }
                }

            } else {
                console.error(xhr.status);
            }
        }
    };

    const formData = new FormData();
    formData.append('token', token);
    formData.append('post_id', postId);
    xhr.send(new URLSearchParams(formData));
}

const logOut = document.getElementById('log_out');
logOut.addEventListener('click', (event) => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        document.cookie = `token=`;
        window.location.href = "/login";
    } else {
    }
});