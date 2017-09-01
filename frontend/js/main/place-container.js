const placeContainers = document.querySelectorAll('div.place-container');

for (let container of placeContainers) {
    container.addEventListener('click', (event) => {
        let placeInfoBox = container.querySelector('div.place-info');
        let placeActButtonsBox = container.querySelector('div.place-act-buttons');

        if (placeActButtonsBox.style.display === 'none') {
            placeInfoBox.style.display = 'none';
            placeActButtonsBox.style.display = '';
        } else {
            placeInfoBox.style.display = '';
            placeActButtonsBox.style.display = 'none';
        }

        event.preventDefault();
    });

    let editButton = container.querySelector('input.edit-button');
    editButton.addEventListener('click', (event) => {
        if (confirm('정보를 수정하시겠습니까?')) {
            alert('정보의 수정을 완료하였습니다.');
        }

        event.preventDefault();
    });

    let deleteButton = container.querySelector('input.delete-button');
    
    deleteButton.addEventListener('click', (event) => {
        if (confirm('정보를 삭제하시겠습니까?')) {
            alert('정보의 삭제를 완료하였습니다.');
        }

        event.preventDefault();
    });
}

const moveCreatePlaceButton = document.querySelector('input#move-create-place-button');

moveCreatePlaceButton.addEventListener('click', (event) => {
    let placesContainer = document.querySelector('div#places-container');
    placesContainer.style.display = 'none';

    let rentalsContainer = document.querySelector('div#rentals-container');
    rentalsContainer.style.display = 'none';

    let createPlaceContainer = document.querySelector('div#create-place-container');
    createPlaceContainer.style.display = '';

    event.preventDefault();
});