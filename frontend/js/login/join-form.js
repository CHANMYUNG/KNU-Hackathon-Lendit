const joinForm = document.getElementById('join-form');  

joinForm.addEventListener('submit', (event) => {
    let authCodeText = event.target.elements['agency'];
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
                join(email, password, authCode, (result) => {
                    if (result) {
                        alert('회원가입이 성공적으로 완료되었습니다');
                        alert('회원님의 이메일 계정으로 가입 인증 메일이 전송되었습니다'); 

                        event.target.style.display = 'none';

                        emailText.value = '';
                        emailText.parentNode.style.display = 'none';
                        
                        isNewAccountCheckBox.checked = false;

                        passwordText.value = '';
                        passwordText.parentNode.style.display = 'none';

                        let joinButton = document.getElementById('join-button');
                        joinButton.parentNode.style.display = 'none';
                        
                        let cancelJoinButton = document.getElementById('cancel-join-button');
                        cancelJoinButton.parentNode.style.display = 'none';

                        authCodeText.value = '';
                        authCodeText.parentNode.style.display = '';

                        let cancelSearchAgencyButton = document.getElementById('cancel-search-agency-button');
                        cancelSearchAgencyButton.parentNode.style.display = '';

                        event.target.style.marginTop = '325px';
                        event.target.style.display = 'none';

                        let loginForm = document.getElementById('login-form');
                        loginForm.style.display = '';
                    } else {
                        alert('회원가입에 실패하였습니다');
                        alert('올바른 값을 입력했는지 확인하세요');
                    }    
                });                
            }
        } else {
            alert('회원 정보를 입력해주세요');
        }
    } else {
        alert('이메일 중복확인을 해주세요');
    }

    event.preventDefault();
});

let cancelSearchAgencyButton = document.getElementById('cancel-search-agency-button');

cancelSearchAgencyButton.addEventListener('click', (event) => {
    if (confirm('회원가입을 취소하시겠습니까?')) {
        let joinForm = event.target.parentNode.parentNode;
        joinForm.style.display = 'none';

        let agencyText = joinForm.elements['agency'];
        agencyText.value = '';

        let loginForm = document.getElementById('login-form');
        loginForm.style.display = '';

        alert('회원가입이 취소되었습니다.');
    } 

    event.preventDefault();
});

let searchAgencyButton = document.getElementById('search-agency-button');

searchAgencyButton.addEventListener('click', (event) => {
    let joinForm = event.target.parentNode.parentNode;
    let agencyText = joinForm.elements['agency'];
    let agency = agencyText.value;

    if (agency) {
        checkAgency(agency, (result, data) => {
            if (result) {
                if (confirm(`${data.name}의 관리자가 맞습니까?`)) {
                    event.target.parentNode.style.display = 'none';

                    let cancelSearchAgencyButton = document.getElementById('cancel-search-agency-button');
                    cancelSearchAgencyButton.parentNode.style.display = 'none';

                    joinForm.style.marginTop = '300px';

                    let emailText = joinForm.elements['email'];
                    emailText.parentNode.style.display = '';

                    let passwordText = joinForm.elements['password'];
                    passwordText.parentNode.style.display = '';

                    let joinButton = document.getElementById('join-button');
                    joinButton.parentNode.style.display = '';

                    let cancelJoinButton = document.querySelector('input#cancel-join-button');
                    cancelJoinButton.parentNode.style.display = '';
                    
                    event.preventDefault();
                }
            } else {
                alert('유효하지 않은 인증 코드입니다');
            }
        });
    } else {
        alert('인증 코드를 입력하세요');
    }

    event.preventDefault();
});

let searchDuplicateEmailButton = document.querySelector('input#search-duplicate-email-button');

searchDuplicateEmailButton.addEventListener('click', (event) => {
    let joinForm = event.target.parentNode.parentNode;
    let email = joinForm.elements['email'].value;
    let isNewAccountCheckBox = joinForm.elements['is-new-account'];

    if (email) {
        checkEmail(email, (result) => {
            if (result) {
                alert('중복되는 이메일이 존재하지 않습니다');
                isNewAccountCheckBox.checked = true;            
            } else {
                alert('중복되는 이메일이 이미 존재합니다');
                isNewAccountCheckBox.checked = false;
            }
        });
    } else {
        alert('이메일 주소를 입력해주세요')
    }

    event.preventDefault();
});

let cancelJoinButton = document.querySelector('input#cancel-join-button');

cancelJoinButton.addEventListener('click', (event) => {
    event.target.parentNode.style.display = 'none';
    let joinForm = event.target.parentNode.parentNode;

    let emailText = joinForm.elements['email'];
    let passwordText = joinForm.elements['password'];

    let isNewAccountCheckBox = joinForm.elements['is-new-account'];

    passwordText.value = '';
    passwordText.parentNode.style.display = 'none';

    emailText.value = '';
    emailText.parentNode.style.display = 'none';

    let joinButton = document.querySelector('input#join-button');

    let agencyText = joinForm.elements['agency'];
    let cancelSearchAgencyButton = document.querySelector('input#cancel-search-agency-button');

    joinButton.parentNode.style.display = 'none';

    agencyText.parentNode.style.display = '';
    cancelSearchAgencyButton.parentNode.style.display = '';
    
    event.preventDefault();
});