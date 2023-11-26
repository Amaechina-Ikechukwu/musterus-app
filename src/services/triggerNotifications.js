import { API_URL } from "../utilities";

export function PushNotification({
    message,
    token,
    title,
    name,
    largeImg,
    id,
    type
}) {
    console.log("Large image", id)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": name,
        "title": title,
        "fcnToken": token,
        "message": message,
        "largeImg": largeImg,
        "id": id.toString(),
        "type": type
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(API_URL, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}