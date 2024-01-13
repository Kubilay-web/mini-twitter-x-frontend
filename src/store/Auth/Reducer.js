import { find_user_by_id_profile_failure, find_user_by_id_profile_success, follow_user_success, get_user_profile_failure, get_user_profile_request, get_user_profile_success, login_user_failure, login_user_request, login_user_success, logout, register_user_failure, register_user_request, register_user_success, update_user_success } from "./ActionType";

const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case login_user_request:
        case register_user_request:
        case get_user_profile_request:
            return { ...state, loading: true, error: null }

        case login_user_success:
        case register_user_success:
            return { ...state, loading: false, error: null, jwt: action.payload }


        case logout:
            return initialState


        case get_user_profile_success:
            return { ...state, loading: false, error: null, user: action.payload }

            
        case update_user_success:
            return { ...state, loading: false, error: null, user: action.payload,updateUser:true }

        case find_user_by_id_profile_success:
            return { ...state, loading: false, error: null, findUser: action.payload }

        case follow_user_success:
            return { ...state, loading: false, error: null, findUser: action.payload }

        case login_user_failure:
        case register_user_failure:
        case get_user_profile_failure:

            return { ...state, loading: false, error: action.payload }

        default:
            return state;
    }

}