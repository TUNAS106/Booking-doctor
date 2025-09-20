import axios from '../axios';
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserToApi = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserFromApi = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    });
}

const editUserFromApi = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

export { handleLoginApi, getAllUsers, createNewUserToApi, deleteUserFromApi, editUserFromApi };

