const joinForm = document.getElementById('join-form');
joinForm.addEventListener('submit', (event) => {
    let authCodeText = event.target.elements['auth-code'];
    let authCode = authCodeText.value;

    let emailText = event.target.elements['email'];
    let email = emailText.value;

    let passwordText = event.target.elements['password'];
    let password = passwordText.value;
    
    let isNewAccountCheckBox = event.target.elements['is-new-account'];
    let isNewAccount = isNewAccountCheckBox.checked;

    if (isNewAccount) {
        if (authCode && email && password) {
            if (confirm('이대로 회원가입을 진행하시겠습니까?')) {
                event.target.style.display = 'none';

                emailText.value = '';
                emailText.parentNode.style.display = 'none';
                
                isNewAccountCheckBox.checked = false;

                passwordText.value = '';
                passwordText.parentNode.style.display = 'none';

                let joinButton = document.getElementById('join-button');
                joinButton.parentNode.style.display = 'none';
                
                authCodeText.value = '';
                authCodeText.parentNode.style.display = '';

                let moveLoginButton = document.getElementById('move-login-button');
                moveLoginButton.parentNode.style.display = '';

                event.target.style.marginTop = '325px';
                event.target.style.display = 'none';

                let loginForm = document.getElementById('login-form');
                loginForm.style.display = '';

                alert('회원가입이 성공적으로 완료되었습니다');
            }
        } else {
            alert('회원 정보를 입력해주세요');
        }
    } else {
        alert('이메일 중복확인을 해주세요');
    }

    event.preventDefault();
});

const moveLoginButton = document.getElementById('move-login-button');
moveLoginButton.addEventListener('click', (event) => {
    if (confirm('회원가입을 취소하시겠습니까?')) {
        let joinForm = event.target.parentNode.parentNode;
        joinForm.style.display = 'none';

        let authCodeText = joinForm.elements['auth-code'];
        authCodeText.value = '';

        let loginForm = document.getElementById('login-form');
        loginForm.style.display = '';

        alert('회원가입이 취소되었습니다.');
    } 

    event.preventDefault();
});

const searchAuthCodeButton = document.getElementById('search-auth-code-button');
searchAuthCodeButton.addEventListener('click', (event) => {
    let joinForm = event.target.parentNode.parentNode;
    let authCodeText = joinForm.elements['auth-code'];
    let authCode = authCodeText.value;

    if (authCode) {
        if (confirm(`${authCodeText.value}의 관리자가 맞습니까?`)) {
            event.target.parentNode.style.display = 'none';

            let moveLoginButton = document.getElementById('move-login-button');
            moveLoginButton.parentNode.style.display = 'none';

            joinForm.style.marginTop = '300px';

            let emailText = joinForm.elements['email'];
            emailText.parentNode.style.display = '';

            let passwordText = joinForm.elements['password'];
            passwordText.parentNode.style.display = '';

            let joinButton = document.getElementById('join-button');
            joinButton.parentNode.style.display = '';

            let moveAuthCodeCheckButton = document.getElementById('move-auth-code-check-button');
            moveAuthCodeCheckButton.parentNode.style.display = '';
            
            event.preventDefault();
        }
    } else {
        alert('인증 코드를 입력하세요');
    }

    event.preventDefault();
});

const searchDuplicateEmailButton = document.querySelector('input#search-duplicate-email-button');
searchDuplicateEmailButton.addEventListener('click', (event) => {
    let joinForm = event.target.parentNode.parentNode;
    let email = joinForm.elements['email'].value;

    if (email) {
        alert('중복되는 사용자가 없습니다');
        
        let isNewAccountCheckBox = joinForm.elements['is-new-account'];
        isNewAccountCheckBox.checked = true;
    } else {
        alert('이메일 주소를 입력해주세요')
    }

    event.preventDefault();
});

const moveAuthCodeCheckButton = document.getElementById('move-auth-code-check-button');

moveAuthCodeCheckButton.addEventListener('click', (event) => {
    event.target.parentNode.style.display = 'none';
    let joinForm = event.target.parentNode.parentNode;

    let emailText = joinForm.elements['email'];
    let passwordText = joinForm.elements['password'];

    let isNewAccountCheckBox = joinForm.elements['is-new-account'];

    passwordText.value = '';
    passwordText.parentNode.style.display = 'none';

    emailText.value = '';
    emailText.parentNode.style.display = 'none';

    let joinButton = document.getElementById('join-button');

    let authCodeText = joinForm.elements['auth-code'];
    let moveLoginButton = document.getElementById('move-login-button');

    joinButton.parentNode.style.display = 'none';

    authCodeText.parentNode.style.display = '';
    moveLoginButton.parentNode.style.display = '';
    
    event.preventDefault();
});