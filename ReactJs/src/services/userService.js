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

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeFromApi = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctorsFromApi = () => {
    return axios.get('/api/get-all-doctors');
}
const saveDetailInforDoctorFromApi = (data) => {
    return axios.post('/api/save-infor-doctors', data);
}

const getDetailDoctorByIdFromApi = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const bulkCreateScheduleFromApi = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleByDateFromApi = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorByIdFromApi = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorByIdFromApi = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postBookAppointmentFromApi = (data) => {
    return axios.post('/api/patient-book-appointment', data);
}
export {
    handleLoginApi, getAllUsers, createNewUserToApi,
    deleteUserFromApi, editUserFromApi, getAllCodeService,
    getTopDoctorHomeFromApi, getAllDoctorsFromApi, saveDetailInforDoctorFromApi, getDetailDoctorByIdFromApi,
    bulkCreateScheduleFromApi, getScheduleByDateFromApi, getExtraInforDoctorByIdFromApi, getProfileDoctorByIdFromApi,
    postBookAppointmentFromApi
};

