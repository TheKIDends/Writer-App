const loginForm = document.getElementById('login_form');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() { // callback
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);

                if (response.message === 'Đăng nhập thành công') {
                    console.log(response.token);
                    document.cookie = `token=${response.token}`;
                    window.location.href = "/";
                }
                alert(response.message);
            } else {
                console.error(xhr.status);
            }
        }
    };

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    xhr.send(new URLSearchParams(formData));
});