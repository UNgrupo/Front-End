const authHeader = function() {
    // return authorization header with jwt token
    let user = JSON.parse(window.localStorage.getItem('user'));
 
    if (user && user.jwt) {
        return { 'Authorization': 'Bearer ' + user.jwt };
    } else {
        return {};
    }
}

export default authHeader;