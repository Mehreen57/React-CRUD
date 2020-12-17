// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
// where we make our configurations
    baseURL: 'https://swapi.dev/api/'
});

export default instance;