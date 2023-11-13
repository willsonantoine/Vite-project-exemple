import axios from 'axios';

// const default_url = 'http://localhost:3010/api/v1'
const default_url = 'https://api.mlinzitech.store/api/v1'
const token = (localStorage.getItem('auth_token') != null && localStorage.getItem('auth_token') != undefined) ? 'Bearer ' + localStorage.getItem('auth_token') : '';
const run = async (route: string, methode: string, data = {}) => {
    const config = {
        method: methode,
        maxBodyLength: Infinity,
        url: default_url + route,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        data: data
    };

    return await axios.request(config)

}

export default run
