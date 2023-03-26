import {deletePost, postList} from "../utilities/local_storage.js";

const posts = document.getElementById('post_list');

for (let idPost = 0; idPost < postList.length; ++idPost) {
    const item = postList[idPost];

    const elementList = document.createElement('div');
    elementList.classList.add('box_list');

    const title = document.createElement('div');
    title.idPost='title-' + idPost;
    title.classList.add('title');
    title.textContent = item.title;
    elementList.appendChild(title);

    // const content = document.createElement('div');
    // content.classList.add('content');
    // content.textContent = previewText(item.content, 70);
    // elementList.appendChild(content);

    const dateModified = document.createElement('div');
    dateModified.idPost='date-modified-' + idPost;
    dateModified.classList.add('date-modified');
    dateModified.textContent = 'Date modified: ' + item.date_modified;
    elementList.appendChild(dateModified);

    const buttons = document.createElement('div');

    const btnView = document.createElement('button');
    btnView.idPost='btn-view-' + idPost;
    btnView.classList.add('btn-view');
    btnView.textContent = 'View';
    buttons.appendChild(btnView);

    const btnDelete = document.createElement('button');
    btnDelete.idPost='btn-delete-' + idPost;
    btnDelete.classList.add('btn-delete');
    btnDelete.textContent = 'Delete';
    btnDelete.addEventListener('click', (event) => {
        if (deletePost(idPost) === true) {
            window.location.href = "/";
            alert('Xóa thành công bài viết ' + title.textContent);
        } else {
            alert('Xóa thất bại');
        }
    });

    buttons.appendChild(btnDelete);

    elementList.appendChild(buttons);

    posts.appendChild(elementList);
}