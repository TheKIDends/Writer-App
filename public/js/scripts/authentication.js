export function checkAuthentication() {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    // console.log(document.cookie);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() { // callback
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                if (response.message === "Token expired") {
                    window.location.href = "/login";
                    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                }
                else if (response.message === "false") {
                    window.location.href = "/login";
                    alert("Vui lòng đăng nhập.");
                }
                else {
                    // let auth = response.message;
                    // console.log(auth.email + ' ' + auth.password);
                }
            } else {
                console.error(xhr.status);
            }
        }
    };

    const formData = new FormData();
    formData.append('token', token);
    xhr.send(new URLSearchParams(formData));
}