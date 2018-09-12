export default () => {
    // return authorization header with jwt token
    let token = localStorage.getItem('token');

    if (token) {
        return { params: {token: token} };
    } else {
        return {};
    }
};
