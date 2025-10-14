import actionTypes from '../actions/actionTypes'; // Đảm bảo đúng tên thư mục
import appReducer from './appReducer';
const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.data;
            //console.log('Reducer FETCH_GENDER_SUCCESS');
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            let copyState2 = { ...state };
            copyState2.isLoadingGender = false;
            //console.log('Reducer FETCH_GENDER_FAIL');
            return {
                ...copyState2,
            }
        case actionTypes.FETCH_GENDER_START:
            let copyState1 = { ...state };
            copyState1.isLoadingGender = true;
            //console.log('Reducer FETCH_GENDER_START');
            return {
                ...copyState1,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyState3 = { ...state };
            copyState3.positions = action.data;
            return {
                ...copyState3,
            }

        case actionTypes.FETCH_POSITION_FAIL:
            let copyState4 = { ...state };
            copyState4.positions = [];
            return {
                ...copyState4,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyState5 = { ...state };
            copyState5.roles = action.data;
            return {
                ...copyState5,
            }

        case actionTypes.FETCH_ROLE_FAIL:
            let copyState6 = { ...state };
            copyState6.roles = [];
            return {
                ...copyState6,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAIL:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS:
            return {
                ...state,
                topDoctors: action.data
            }
        case actionTypes.FETCH_TOP_DOCTOR_HOME_FAIL:
            return {
                ...state,
                topDoctors: []
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            return {
                ...state,
                allDoctors: action.data
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
            return {
                ...state,
                allDoctors: []
            }

        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.SAVE_DETAIL_DOCTOR_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            return {
                ...state,
                allScheduleTime: action.data
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
            return {
                ...state,
                allScheduleTime: []
            }
        default:
            return state;
    }
}

export default adminReducer;