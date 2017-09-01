const createPlaceForm = document.querySelector('form#create-place-form');

createPlaceForm.addEventListener('submit', (event) => {
    let deviceCodeText = event.target.elements['device-code'];
    let deviceCode = deviceCodeText.value;

    let nameText = event.target.elements['name'];
    let name = nameText.value;

    let descriptionText = event.target.elements['description'];
    let description = descriptionText.value;

    if (deviceCodeText && name && description) {
        if (confirm('장소를 등록하시겠습니까?')) {
            nameText.value = '';
            nameText.parentNode.style.display = 'none';
            
            descriptionText.value = '';
            descriptionText.parentNode.style.display = 'none';

            let createPlaceButton = document.querySelector('input#create-place-button');
            createPlaceButton.parentNode.style.display = 'none';

            deviceCodeText.value = '';
            deviceCodeText.parentNode.style.display = '';

            event.target.parentNode.style.display = 'none';

            let placesContainer = document.querySelector('div#places-container');
            placesContainer.style.display = '';

            let rentalsContainer = document.querySelector('div#rentals-container');
            rentalsContainer.style.display = '';

            alert('장소의 등록에 성공하였습니다.'); 
        }
    } else {
        alert('장소의 정보를 입력해주세요')
    }

    event.preventDefault();
});

const searchDeviceCodeButton = document.querySelector('input#search-device-code-button');

searchDeviceCodeButton.addEventListener('click', (event) => {
    let createPlaceForm = event.target.parentNode.parentNode;

    let deviceCodeText = createPlaceForm.elements['device-code'];
    let deviceCode = deviceCodeText.value;
    
    if (deviceCode) {
        alert(`${deviceCode} 에 대응하는 디바이스가 존재합니다`);
        deviceCodeText.parentNode.style.display = 'none';

        let nameText = createPlaceForm.elements['name'];
        nameText.parentNode.style.display = '';

        let descriptionText = createPlaceForm.elements['description']; 
        descriptionText.parentNode.style.display = '';

        let createPlaceButton = document.querySelector('input#create-place-button');
        createPlaceButton.parentNode.style.display = '';
    } else {
        alert('디바이스 코드를 입력해 주세요');
    }

    event.preventDefault();
});