let createHoleForm = document.querySelector('form#create-hole-form');

createHoleForm.addEventListener('submit', (event) => {
    let hardwareKeyText = event.target.elements['hardware-key'];
    let hardwareKey = hardwareKeyText.value;

    let nameText = event.target.elements['name'];
    let name = nameText.value;

    let explainText = event.target.elements['explain'];
    let explain = explainText.value;

    if (hardwareKey && name && explain) {
        if (confirm('장소를 등록하시겠습니까?')) {
            createHole(name, explain, hardwareKey, localStorage.getItem('access-token'), (result) => {
                if (result) {
                    alert('장소를 성공적으로 등록하였습니다.');

                    nameText.value = '';
                    explainText.value = '';
                    hardwareKeyText.value = '';

                    event.target.parentNode.style.display = 'none';

                    let showProfileContainer = document.querySelector('div#show-profile-container');
                    let showHolesContainer = document.querySelector('div#show-holes-container');
                    showHolesContainer.style.display = '';
                    
                    showHolesContainer.innerHTML = '';
                    readHoles((result, data) => {
                        if (result) {
                            initHoleList(data);
                        }
                    });
                } else {
                    alert('장소 등록에 실패하였습니다.');
                }
            });
        }
    } else {
        alert('장소의 정보를 입력해주세요');
    }

    event.preventDefault();
});

let cancelCreateHolebutton = document.querySelector('input#cancel-create-hole-button');

cancelCreateHolebutton.addEventListener('click', (event) => {
    if (confirm('장소 등록을 취소하시겠습니까?')) {let createHoleForm = document.querySelector('form#create-hole-form');
        createHoleForm.parentNode.style.display = 'none';

        let nameText = createHoleForm.elements['name'];
        let explainText = createHoleForm.elements['explain'];
        let hardwareKeyText = createHoleForm.elements['hardware-key'];

        nameText.value = '';
        explainText.value = '';
        hardwareKeyText.value = '';

        let holesContainer = document.querySelector('div#show-holes-container');
        holesContainer.style.display = '';
        
        let profileContainer = document.querySelector('div#show-profile-container');
        profileContainer.style.display = '';

        event.preventDefault();
    }
});