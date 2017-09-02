let loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
    let email = loginForm.elements['email'].value;
    let password = loginForm.elements['password'].value;

    if (email && password) {
        login(email, password, (result, data) => {
            if (result) {
                alert('로그인에 성공했습니다');

                localStorage.setItem('access-token', data['token']);
                location.href = './main.html';
            } else {
                alert('로그인에 실패했습니다');
            }
        });
    } else {
        alert('아이디, 또는 비밀번호를 입력해주세요');
    }

    event.preventDefault();
});

let joinLink = document.getElementById('join-link');

joinLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    let loginForm = document.getElementById('login-form');
    loginForm.style.display = 'none';

    let emailText = loginForm.elements['email'];
    let passwordText = loginForm.elements['password'];
    
    emailText.value = '';
    passwordText.value = '';

    let joinForm = document.getElementById('join-form');
    joinForm.style.display = '';
});