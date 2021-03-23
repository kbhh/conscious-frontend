exports.authHeader = () => {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user && user.token) {
        return { 'userId': user.userId, 'token': user.token, 'Authorization': 'Bearer ' + user.token }
    } else {
        return {};
    }
}

exports.authFileHeader = () => {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user && user.token) {
        return { 'content-type': 'multipart/form-data', 'userId': user.userId, 'token': user.token, 'Authorization': 'Bearer ' + user.token }
    } else {
        return {};
    }
}
