const rentalContainers = document.querySelectorAll('div.rental-container');

for (let container of rentalContainers) {
    container.addEventListener('click', (event) => {
        let rentalInfoBox = container.querySelector('div.rental-info');
        let rentalActButtonsBox = container.querySelector('div.rental-act-buttons');

        if (rentalActButtonsBox.style.display === 'none') {
            rentalInfoBox.style.display = 'none';
            rentalActButtonsBox.style.display = '';
        } else {
            rentalInfoBox.style.display = '';
            rentalActButtonsBox.style.display = 'none';
        }

        event.preventDefault();
    });

    let acceptButton = container.querySelector('input.accept-button');
    
    acceptButton.addEventListener('click', (event) => {
        if (confirm('대여 요청을 승인하시겠습니까?')) {
            alert('대여 요청을 승인하였습니다.');
        }

        event.preventDefault();
    });

    let refuseButton = container.querySelector('input.refuse-button');    
    
    refuseButton.addEventListener('click', (event) => {
        if (confirm('대여 요청을 거절하시겠습니까?')) {
            alert('대여 요청을 거절하였습니다.');
        }

        event.preventDefault();
    });
}

