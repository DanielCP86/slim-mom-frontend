import axios from 'axios';

const instance = axios.create({
  //baseURL: 'http://localhost:3001/api/v1',
  baseURL: 'https://slim-mom-backend-46689-edf2a263aca1.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
