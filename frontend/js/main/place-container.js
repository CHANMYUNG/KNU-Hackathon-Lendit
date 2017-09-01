const placeContainers = document.querySelectorAll('div.place-container');

for (let container of placeContainers) {
    container.addEventListener('click', (event) => {
        let placeNameText = container.querySelector('p.place-name');
        let placeAvailableDateText = container.querySelector('p.place-available-date');
        let placeActButtons = container.querySelector('p.place-act-buttons');

        if (container.querySelector('p.place-act-buttons').style.display === 'none') {
            placeNameText.style.display = 'none'; 
            placeAvailableDateText.style.display = 'none'; 
            placeActButtons.style.display = '';
        } else {
            placeActButtons.style.display = 'none';
            placeNameText.style.display = ''; 
            placeAvailableDateText.style.display = '';
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
