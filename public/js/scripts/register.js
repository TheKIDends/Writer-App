const registerForm = document.getElementById('register_form');
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('register_username').value;
    const email = document.getElementById('register_email').value;
    const password = document.getElementById('register_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/register', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() { // callback
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.message === 'Đăng ký thành công hãy đăng nhập') {
                    window.location.href = "/login";
                }
                alert(response.message);
            } else {
                console.error(xhr.status);
            }
        }
    };

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);
    xhr.send(new URLSearchParams(formData));
});