import {previewText} from "../utilities/index.js";

const storage = window !== undefined ? localStorage : null;

if (storage.getItem("POST_LIST") === null)  {
    storage.setItem("POST_LIST", "[]");
}
const posts = JSON.parse(storage.getItem("POST_LIST"));

const postList = document.getElementById('post_list');

for (let i = 0; i < posts.length; ++i) {
    const item = posts[i];

    const elementList = document.createElement('div');
    elementList.classList.add('box_list');

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = item.title;
    elementList.appendChild(title);

    // const content = document.createElement('div');
    // content.classList.add('content');
    // content.textContent = previewText(item.content, 70);
    // elementList.appendChild(content);

    const dateModified = document.createElement('div');
    dateModified.classList.add('date-modified');
    dateModified.textContent = 'Date modified: ' + item.date_modified;
    elementList.appendChild(dateModified);

    const btnView = document.createElement('button');
    btnView.id='btn-view';
    btnView.classList.add('btn-view');
    btnView.textContent = 'View';
    elementList.appendChild(btnView);

    postList.appendChild(elementList);
}