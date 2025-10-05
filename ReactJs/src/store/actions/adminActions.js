import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';
import { createNewUserToApi, getAllUsers, deleteUserFromApi, editUserFromApi, getTopDoctorHomeFromApi } from '../../services/userService';
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