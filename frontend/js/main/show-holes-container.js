let initHoleList = (holes) => {
    let showHolesContainer = document.querySelector('div#show-holes-container');

    for (hole of holes) {
        let holeContainer = document.createElement('div');
        holeContainer.setAttribute('class', 'hole-container');

        let holeInfoContainer = document.createElement('div');
        holeInfoContainer.setAttribute('class', 'hole-info-container');

        let holeNameParagraph = document.createElement('p');
        holeNameParagraph.setAttribute('class', 'hole-name');

        let holeNameText = document.createTextNode(hole.name);

        let holeCreatedAtText = document.createTextNode(hole.createdAt);

        holeNameParagraph.appendChild(holeNameText);
        holeInfoContainer.appendChild(holeNameParagraph);

        holeContainer.appendChild(holeInfoContainer);
        showHolesContainer.appendChild(holeContainer);

        holeContainer.addEventListener('click', (function(hole) {
            return function(event) {
                showHolesContainer.style.display = 'none';

                let showProfileContainer = document.querySelector('div#show-profile-container');
                showProfileContainer.style.display = 'none';

                let showHoleDetailContainer = document.querySelector('div#show-hole-detail-container');
                showHoleDetailContainer.style.display = '';

                let holeDetailNameParagraph = showHoleDetailContainer.querySelector('p#hole-detail-name');
                holeDetailNameParagraph.innerHTML = hole.name;

                let holeDetailExpainParagraph = showHoleDetailContainer.querySelector('p#hole-detail-explain');
                holeDetailExpainParagraph.innerHTML = hole.explain;

                let deleteHoleButton = showHoleDetailContainer.querySelector('input#delete-hole-button');
                deleteHoleButton.onclick = (event) => {
                    if (confirm('장소를 삭제하시겠습니까?')) {
                        deleteHole(hole._id, localStorage.getItem('access-token'), (result) => {
                            if (result) {
                                alert('장소를 성공적으로 삭제했습니다.');

                                showHoleDetailContainer.style.display = 'none';
                                showHolesContainer.style.display = '';

                                showHolesContainer.innerHTML = '';
                                readHoles(localStorage.getItem('access-token'), (result, data) => {
                                    initHoleList(data);
                                });
                            } else {
                                alert('장소 삭제에 실패하였습니다');
                            }
                        });
                    }
                    
                    event.preventDefault();
                };

                let openNewTimelineForm = document.querySelector('form#open-new-timeline-form');

                openNewTimelineForm.onsubmit = function(event) {
                    let openAtText = event.target.elements['openAt'];
                    let openAt = openAtText.value;

                    let closeAtText = event.target.elements['closeAt'];
                    let closeAt = closeAtText.value;

                    if (openAt && closeAt) {
                        if (confirm('새 시간대를 개방할 것입니까?')) {
                            openNewTimeline(hole._id, openAt, closeAt, localStorage.getItem('access-token'), (result) => {
                                if (result) {
                                    alert('새로운 시간대를 성공적으로 개방하였습니다');

                                    let showHoleDetailContainer = document.querySelector('div#hole-detail-container');
                                    showHoleDetailContainer.style.display = 'none';
                                    
                                    let showHolesContainer = document.querySelector('div#show-holes-container');

                                    showHolesContainer.style.display = '';
                                    showHolesContainer.innerHTML = '';
                                    
                                    readHoles(localStorage.getItem('access-token'), (result, data) => {
                                        initHoleList(data);
                                    });
                                } else {
                                    alert('새로운 시간대를 개방하는 데 실패하였습니다');
                                }
                            });
                        }
                    } else {
                        alert('시작 시간 또는 종료 시간이 입력되지 않았습니다')
                    }
                    
                    event.preventDefault();
                };
                
                let showAppliesContainer = document.querySelector('div#show-applies-container');
                showAppliesContainer.innerHTML = '';

                readApplies(hole._id, localStorage.getItem('access-token'), (result, data) => {
                    for (apply of data) {    
                        let applyContainer = document.createElement('div');
                        applyContainer.setAttribute('class', 'apply-container');

                        let applyInfoContainer = document.createElement('div');
                        applyInfoContainer.setAttribute('class', 'apply-info-container');

                        let applyActButtonsContainer = document.createElement('div');
                        applyActButtonsContainer.setAttribute('class', 'apply-act-buttons-container');

                        let applyTimeParagraph = document.createElement('p');
                        applyTimeParagraph.setAttribute('class', display-actvie);
                        
                        let applyPurposeParagraph = document.createElement('p');
                        applyPurposeParagraph.innerText = apply.purpose;
                        applyPurposeParagraph.setAttribute('class', 'apply-purpose');

                        let applyStartAtParagraph = document.createElement('p');
                        applyStartAtParagraph.innerText = apply.startAt;
                        applyStartAtParagraph.setAttribute('class', 'apply-start-at');

                        let applyEndAtParagraph = document.createElement('p');
                        applyEndAtParagraph.innerText = apply.endAt;
                        applyEndAtParagraph.setAttribute('class', 'apply-end-at');

                        let applyUserNameParagraph = document.createElement('p');
                        applyUserNameParagraph.innerText = apply._user.name;
                        applyUserNameParagraph.setAttribute('class', 'apply-user-name');

                        let acceptApplyButton = document.createElement('input');
                        acceptApplyButton.setAttribute('type', 'button');
                        acceptApplyButton.setAttribute('class', 'accept-apply-button');

                        acceptApplyButton.value = '승인';

                        let refuseApplyButton = document.createElement('input');
                        refuseApplyButton.setAttribute('type', 'button');
                        refuseApplyButton.setAttribute('class', 'refuse-apply-button');

                        refuseApplyButton.value = '거절';

                        applyInfoContainer.appendChild(applyPurposeParagraph);
                        
                        applyTimeParagraph.appendChild(applyStartAtParagraph);
                        applyTimeParagraph.appendChild(applyEndAtParagraph);

                        applyInfoContainer.appendChild(applyTimeParagraph);
                        applyInfoContainer.appendChild(applyUserNameParagraph);

                        applyActButtonsContainer.appendChild(acceptApplyButton);
                        applyActButtonsContainer.appendChild(refuseApplyButton);

                        applyContainer.appendChild(applyInfoContainer)
                        applyContainer.appendChild(applyActButtonsContainer);
                        showAppliesContainer.appendChild(applyContainer);
                    }
                });
            }
        }(hole)));        
    }
}

readHoles(localStorage.getItem('access-token'), (result, data) => {
    let slice = Array.prototype.slice;
    initHoleList(data);
});

let moveCreateHoleButton = document.querySelector('input#move-create-hole-button');

moveCreateHoleButton.addEventListener('click', (event) => {
    let holesContainer = document.querySelector('div#show-holes-container');
    holesContainer.style.display = 'none';

    let showProfileContainer = document.querySelector('div#show-profile-container');
    showProfileContainer.style.display = 'none';

    let createHoleContainer = document.querySelector('div#create-hole-container');
    createHoleContainer.style.display = '';

    event.preventDefault();
});
