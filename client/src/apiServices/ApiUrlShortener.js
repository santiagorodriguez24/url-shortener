export const shrinkUrl = (obj) => fetch('/shorturl',
    {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }),
        body: JSON.stringify(obj)
    }
).then(response => response.json())
    .then(responseJson => {
        if (responseJson.error) {
            return Promise.reject(responseJson.error)
        }
        return responseJson;
    });