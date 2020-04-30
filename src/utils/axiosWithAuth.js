import axios from 'axios'

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        // baseURL: 'https://bw1-development.herokuapp.com/api',
        baseURL: 'https://lambda-mud-test.herokuapp.com/api',
        headers: {
            Authorization: `Token ${token}`
        }
    })
}