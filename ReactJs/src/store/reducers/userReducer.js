import actionTypes from '../actions/actionTypes'; // Đảm bảo đúng tên thư mục
import appReducer from './appReducer';
const initialState = {
    isLoggedIn: false,
    userInfo: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log('Reducer USER_LOGIN_SUCCESS, payload:', action.payload);
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        default:
            return state;
    }
}

export default userReducer;