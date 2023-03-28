import {deletePost, postList} from "../utilities/local_storage.js";

const posts = document.getElementById('post_list');


for (let idPost = 0; idPost < postList.length; ++idPost) {
    const post = postList[idPost];

    const elementList = document.createElement('div');
    elementList.classList.add('box_list');

    const title = document.createElement('div');
    title.idPost='title-' + idPost;
    title.classList.add('title');
    title.textContent = post.title;
    elementList.appendChild(title);

    const dateOpened = document.createElement('div');
    dateOpened.idPost='date-opened-' + idPost;
    dateOpened.classList.add('date');
    dateOpened.textContent = 'Date opened: ' + post.date_opened;
    elementList.appendChild(dateOpened);

    const dateModified = document.createElement('div');
    dateModified.idPost='date-modified-' + idPost;
    dateModified.classList.add('date');
    dateModified.textContent = 'Date modified: ' + post.date_modified;
    elementList.appendChild(dateModified);

    const buttons = document.createElement('div');

    const btnView = document.createElement('button');
    btnView.idPost='btn-view-' + idPost;
    btnView.classList.add('btn-view');
    btnView.textContent = 'View';
    btnView.href = `/post?id=${idPost}&title=${post.title}`;
    btnView.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = btnView.href;
    });
    buttons.appendChild(btnView);

    const btnEdit = document.createElement('button');
    btnEdit.idPost='btn-edit-' + idPost;
    btnEdit.classList.add('btn-edit');
    btnEdit.textContent = 'Edit';
    btnEdit.href = `/edit?id=${idPost}`;
    btnEdit.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = btnEdit.href;
    });
    buttons.appendChild(btnEdit);

    const btnDelete = document.createElement('button');
    btnDelete.idPost='btn-delete-' + idPost;
    btnDelete.classList.add('btn-delete');
    btnDelete.textContent = 'Delete';
    btnDelete.addEventListener('click', (event) => {
        if (confirm("Bạn có chắc chắn muốn xóa bài viết không?")) {
            if (deletePost(idPost) === true) {
                window.location.href = "/";
                alert('Xóa thành công bài viết ' + title.textContent);
            } else {
                alert('Xóa thất bại');
            }
        } else {
            // Hủy thao tác xóa
        }

    });

    buttons.appendChild(btnDelete);

    elementList.appendChild(buttons);

    posts.appendChild(elementList);
}