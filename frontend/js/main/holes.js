let readHoles = (accessToken, callback) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', `http://13.124.15.202:8080/hole`);
    xhr.setRequestHeader('x-access-token', accessToken);

    xhr.onreadystatechange = (event) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(true, JSON.parse(xhr.responseText));
            } else {
                callback(false, null);
            }

            xhr = null;
        }
    };

    xhr.send(null);
}

let createHole = (name, explain, hardwareKey, accessToken, callback) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', `http://13.124.15.202:8080/hole`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('x-access-token', accessToken);

    xhr.onreadystatechange = (event) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                callback(true);
            } else {
                callback(false);
            }

            xhr = null;
        }
    };

    xhr.send(`name=${name}&explain=${explain}&hwKey=${hardwareKey}`);
};

let openNewTimeline = (holeId, openAt, closeAt, accessToken, callback) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', `http://13.124.15.202:8080/hole/open`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('x-access-token', accessToken);

    xhr.onreadystatechange = (event) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(true);
            } else {
                callback(false);
            }

            xhr = null;
        }
    };

    xhr.send(`hole=${holeId}&openAt=${openAt}&closeAt=${closeAt}`);
}

let deleteHole = (holeId, accessToken, callback) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open('DELETE', `http://13.124.15.202:8080/hole`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('x-access-token', accessToken);

    xhr.onreadystatechange = (event) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(true);
            } else {
                callback(false);
            }

            xhr = null;
        }
    };

    xhr.send(`hole=${holeId}`);
};