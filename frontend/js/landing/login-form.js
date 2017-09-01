const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (event) => {
    let email = loginForm.elements['email'].value;
    let password = loginForm.elements['password'].value;

    if (email && password) {
        alert('로그인에 성공하였습니다');
        location.href = './main.html';
    } else {
        alert('아이디, 또는 비밀번호를 입력해주세요');
    }

    event.preventDefault();
});

const joinLink = document.getElementById('join-link');
joinLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    let loginForm = document.getElementById('login-form');
    loginForm.style.display = 'none';

    let joinForm = document.getElementById('join-form');
    joinForm.style.display = '';
});