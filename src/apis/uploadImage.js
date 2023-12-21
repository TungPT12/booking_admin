import axios from 'axios';
const URL = "https://booking-server-gafr.onrender.com/api/upload"
// const URL = "http://localhost:5000/api/upload"
const uploadImageApi = async (formData) => {
    try {
        const response = axios.post(URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        return response;
    } catch (error) {
        return error.response
    }
}

export default uploadImageApi;