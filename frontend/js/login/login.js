let login = (email, password, callback) => {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', `http://13.124.15.202:8080/signin/admin`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = (event) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                callback(true, JSON.parse(xhr.responseText));
            } else {
                callback(false, null);
            }

            xhr = null;
        }
    };

    xhr.send(`email=${email}&password=${password}`)
};