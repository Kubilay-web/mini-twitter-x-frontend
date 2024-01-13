import axios from "axios";
import { api } from "../../config/api";
import { API_BASE_URL } from "../../config/api";
import {  find_user_by_id_profile_failure, find_user_by_id_profile_success, follow_user_failure, follow_user_success, get_user_profile_failure, get_user_profile_success, login_user_failure, login_user_success, update_user_failure, update_user_success } from "./ActionType";


// export const loginUser = (loginData) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/profile/login`, loginData);
//     const { data } = response;


//     if (data.token) {
//       localStorage.setItem("jwt", data.token);
//       dispatch({ type: 'login_user_success', payload: data.token });
//     } else {
//       dispatch({ type: 'login_user_failure', payload: 'Invalid response format' });
//     }
//   } catch (error) {
//     console.error("Login error:", error);

//     let errorMessage = 'An error occurred during login.';
    
//     if (error.response) {
//       if (error.response.status === 401) {
//         errorMessage = 'Invalid email or password';
//         console.log(errorMessage);
//       } else if (error.response.data && error.response.data.message) {
//         errorMessage = error.response.data.message;
//       }
//     }

//     dispatch({ type: 'login_user_failure', payload: errorMessage });
//   }
// };


export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/profile/login`, loginData);

    console.log("login user", data);


    dispatch({ type: 'login_user_success', payload: data.jwt });

    localStorage.setItem('jwt', data.jwt);

  } catch (error) {
    console.log("error", error);
    dispatch({ type: 'login_user_failure', payload: error.message });
  }
};





export const registerUser = (registerData) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/profile/register`, registerData);
  
      console.log("register user", data);
  
  
      dispatch({ type: 'register_user_success', payload: data.jwt });
  
    } catch (error) {
      console.log("error", error);
      dispatch({ type: 'register_user_failure', payload: error.message });
    }
  };



export const getUserProfile =(jwt) => async(dispatch) =>{
    try{     
        const {data} = await axios.post(`${API_BASE_URL}/profile/users/getProf`,{
            headers:{
                "Authorization":`Bearer ${jwt}`
            }
        });

        dispatch({type:get_user_profile_success,payload:data})

    } catch(error) {

        console.log("error",error)
        dispatch({type:get_user_profile_failure,payload:error.message})

    }
}



export const findUserById =(userId) => async(dispatch) =>{
  try{     
      const {data} = await api.get(`/api/users/${userId}`);

      dispatch({type:find_user_by_id_profile_success,payload:data})

  } catch(error) {

      console.log("error",error)
      dispatch({type:find_user_by_id_profile_failure,payload:error.message})

  }
}



export const updateUserProfile =(reqData) => async(dispatch) =>{
  try{     
      const {data} = await api.put(`/api/users/update`,reqData)
      console.log("updated user",data)
      dispatch({type:update_user_success,payload:data})

  } catch(error) {

      console.log("error",error)
      dispatch({type:update_user_failure,payload:error.message})

  }
}


export const followUserAction =(userId) => async(dispatch) =>{
  try{     
      const {data} = await api.put(`/api/users/${userId}/follow`)
      console.log("follows user",data)
      dispatch({type:follow_user_success,payload:data})

  } catch(error) {

      console.log("error",error)
      dispatch({type:follow_user_failure,payload:error.message})

  }
}



export const logoutUser = () => (dispatch) => {
    dispatch({ type: 'LOGOUT_USER' });
    localStorage.removeItem('jwt');
  };