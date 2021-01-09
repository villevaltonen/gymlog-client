export const makeRequest = (url, method, body) => {
    const headers = {
        "Content-Type":"application/json"
    }

    switch(method) {
        case "GET":
            return httpGET(url, headers)
        case "POST":
            return httpPOST(url, headers, body);
        default:
            throw Error("Unknown method");
    }
}

const httpGET = (url, headers) => {
    const response = fetch(url, {
        method: "GET",
        headers: headers
    })
    .then((res) => {
        console.log(res);
        if(res.ok) {
            return res.json()
        } else {
            //TODO
            console.log("Error")
        }
        console.log(response);
    })
    return response;
}

const httpPOST = async (url, headers, body) => {
    try {
        const JSONBody= JSON.stringify(body);
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSONBody
        }).then((res) => {
            console.log(res);
            if(res.ok) {
                return res.json()
            } else {
                return res.json();
            }
        })
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}