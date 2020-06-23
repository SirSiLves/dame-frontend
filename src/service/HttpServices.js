import axios from "axios";
import {toast} from 'react-toastify';


axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status === 200;

    //error handling - printing error on console
    if (!expectedError) {

        if (error.response) {
            console.log("Request made and server responded");
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log("The request was made but no response was received");
            console.log(error.request);
        } else {
            console.log("Something happened in setting up the request that triggered an Error");
            console.log('Error', error.message);
        }

        toast.error("An error occured. Check console log");
    }

    return Promise.reject(error);
});


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
