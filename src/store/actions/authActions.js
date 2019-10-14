import axios from "axios/index";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    GET_USER_INFO
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
    console.log("register action");
    axios
        .post("/users/register", userData)
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
    console.log("looooog");
    axios
        .post("/users/login", userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
            console.log("login user");
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//update user
export const updateUser = (userData) => dispatch => {
    console.log("update action");
    axios
        .post("/users/updateUser", userData)
        .then(
           user=>{
               console.log('useeeeeeeeeeeeer',user);
               dispatch({
                   type: SET_CURRENT_USER,
                   payload: user.data
               })
           }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const updatePassword = (userData,history) => dispatch => {
    console.log("updatePassword  action");
    axios
        .post("/users/updatePassword", userData)
        .then(
            // res => history.push("admin/dashboard")
        )
        .catch(err =>
            {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })}
        );
};

export const updateStatusGoal = (userData, history) => dispatch => {
    console.log("updateStatusGoal");
    axios
        .post("/users/updateStatusGOAL")
        .then(res => console.log(res))
        .catch(
            // dispatch({
            //     type: GET_ERRORS,
            //     payload: err.response.data
            // })
        );
};

//add goal
export const addGOAL = (userData) => async dispatch => {
    console.log("addd goal");
    await axios
        .post("/users/addGOAL", userData)
        .then(res => {
           // history.push("/admin/Dashboard");
            console.log("baeeeeeeeed el history")
        })
        .catch(errr =>
            dispatch({
                type: GET_ERRORS,
                payload: errr.response.data
            })
        );
};
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Get user info
export const getUserInfo = () => dispatch => {
    axios
        .get(`http://localhost:3001/users/getUserInfo`)
        .then(res =>
            dispatch({
                type: GET_USER_INFO,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_USER_INFO,
                payload: {}
            })
        );
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};