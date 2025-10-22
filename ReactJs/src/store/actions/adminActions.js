import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';
import { createNewUserToApi, getAllUsers, deleteUserFromApi, editUserFromApi, getTopDoctorHomeFromApi, getAllDoctorsFromApi, saveDetailInforDoctorFromApi } from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            console.log('fetchGenderStart error', e);
        }
    };
}

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (e) {
            console.log('fetchPositionStart error', e);
        }
    };
}

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (e) {
            console.log('fetchRoleStart error', e);
        }
    };
}

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserToApi(data);
            console.log('check res create user redux', res);
            if (res && res.errCode === 0) {
                toast.success('Create a new user success!');
                dispatch(createNewUserSuccess());

            } else {
                dispatch(createNewUserFail());
            }
        } catch (e) {
            console.log('createNewUser error', e);
        }
    };
}

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createNewUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");

            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                dispatch(fetchAllUsersFail());
            }
        } catch (e) {
            console.log('fetchAllUsersStart error', e);
        }
    };
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})
export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserFromApi(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete the user success!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFail());
            }
        } catch (e) {
            toast.error('Something wrongs...');
            console.log('deleteUser error', e);
        }
    };
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserFromApi(data);
            if (res && res.errCode === 0) {
                toast.success('Update the user success!');
                dispatch(editUserSuccess());
            } else {
                dispatch(editUserFail());
            }
        } catch (e) {
            console.log('editUser error', e);
        }
    };
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,
})



export const fetchTopDoctorHomeSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS,
    data: data
})

export const fetchTopDoctorHomeFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOME_FAIL
})

export const fetchTopDoctorHome = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeFromApi(8);
            console.log('check res#', res);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorHomeSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorHomeFail());
            }
        } catch (e) {
            console.log('fetchTopDoctorHome error', e);
        }
    };
}

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data: data
})

export const fetchAllDoctorsFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
})

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsFromApi();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorsFail());
            }
        } catch (e) {
            console.log('fetchAllDoctors error', e);
        }
    };
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
})

export const saveDetailDoctorFail = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
})

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailInforDoctorFromApi(data);
            if (res && res.errCode === 0) {
                toast.success('Save infor detail doctor success!');
                dispatch(saveDetailDoctorSuccess());
            } else {
                toast.error('Save infor detail doctor error!');
                dispatch(saveDetailDoctorFail());
            }
        } catch (e) {
            console.log('saveDetailDoctor error', e);
        }
    };
}

export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    data: data
})
export const fetchAllScheduleTimeFail = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL
})

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(res.data));
            } else {
                dispatch(fetchAllScheduleTimeFail());
            }
        } catch (e) {
            console.log('fetchAllScheduleTime error', e);
        }
    };
}

export const getDoctorPriceSuccess = (data) => ({
    type: actionTypes.GET_PRICE_SUCCESS,
    data: data
})
export const getDoctorPriceFail = () => ({
    type: actionTypes.GET_PRICE_FAIL
})
export const getDoctorPriceStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PRICE");
            if (res && res.errCode === 0) {
                dispatch(getDoctorPriceSuccess(res.data));
            } else {
                dispatch(getDoctorPriceFail());
            }
        } catch (e) {
            console.log('getDoctorPriceStart error', e);
        }
    };
}

export const getDoctorPaymentSuccess = (data) => ({
    type: actionTypes.GET_PAYMENT_SUCCESS,
    data: data
})

export const getDoctorPaymentFail = () => ({
    type: actionTypes.GET_PAYMENT_FAIL
})

export const getDoctorPaymentStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PAYMENT");
            if (res && res.errCode === 0) {
                dispatch(getDoctorPaymentSuccess(res.data));
            }
            else {
                dispatch(getDoctorPaymentFail());
            }
        } catch (e) {
            console.log('getDoctorPaymentStart error', e);
        }
    };
}

export const getDoctorProvinceSuccess = (data) => ({
    type: actionTypes.GET_PROVINCE_SUCCESS,
    data: data
})

export const getDoctorProvinceFail = () => ({
    type: actionTypes.GET_PROVINCE_FAIL
})

export const getDoctorProvinceStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PROVINCE");
            if (res && res.errCode === 0) {
                dispatch(getDoctorProvinceSuccess(res.data));
            } else {
                dispatch(getDoctorProvinceFail());
            }
        } catch (e) {
            console.log('getDoctorProvinceStart error', e);
        }
    };
}
