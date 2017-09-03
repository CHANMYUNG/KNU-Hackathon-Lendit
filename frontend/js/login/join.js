let checkEmail = (email, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://13.124.15.202:8080/check/email/${email}`, true);

    xhr.onreadystatechange = (event) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(true);
            } else if (xhr.status === 409) {
                callback(false);
            }

            xhr = null;
        }
    };
    
    xhr.send(null);
}

let checkAgency = (agency, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://13.124.15.202:8080/check/agency/${agency}`, true);

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

let join = (email, password, agency, callback) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', `http://13.124.15.202:8080/signup/admin`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = (event) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                callback(true);
            } else if (xhr.status === 400) {
                callback(false);
            }

            xhr = null;
        }        
    };
    
    xhr.send(`email=${email}&password=${password}&agency=${agency}`);
}