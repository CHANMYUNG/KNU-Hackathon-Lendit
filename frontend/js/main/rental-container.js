const rentalContainers = document.querySelectorAll('div.rental-container');

for (let container of rentalContainers) {
    container.addEventListener('click', (event) => {
        let rentalReasonText = container.querySelector('p.rental-reason');
        let rentalTimeText = container.querySelector('p.rental-time');
        let rentalActButtons = container.querySelector('p.rental-act-buttons');

        if (container.querySelector('p.rental-act-buttons').style.display === 'none') {
            rentalReasonText.style.display = 'none'; 
            rentalTimeText.style.display = 'none'; 
            rentalActButtons.style.display = '';
        } else {
            rentalActButtons.style.display = 'none';
            rentalReasonText.style.display = ''; 
            rentalTimeText.style.display = '';
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

