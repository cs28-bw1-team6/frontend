import axios from 'axios'

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
      baseURL: "https://team6-castle-production.herokuapp.com/api",
      crossDomain: true,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
}