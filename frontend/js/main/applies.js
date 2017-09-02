let readApplies = (holeId, accessToken, callback) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', `http://13.124.15.202:8080/apply/${holeId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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


let acceptApplies = () => {

};

let refuseApplies = () => {

};