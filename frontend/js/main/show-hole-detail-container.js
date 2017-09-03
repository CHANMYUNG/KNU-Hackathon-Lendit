let moveShowHolesButton = document.querySelector('input#move-show-holes-button');
        
moveShowHolesButton.addEventListener('click', (event) => {
    showHoleDetailContainer = event.target.parentNode.parentNode.parentNode;
    showHoleDetailContainer.style.display = 'none';      
                
    showHolesContainer = document.querySelector('div#show-holes-container');
    showHolesContainer.style.display = '';

    let showProfileContainer = document.querySelector('div#show-profile-container');
    showProfileContainer.style.display= '';
    
    event.preventDefault();
});

