import {
    GET_PROFILE,
    GET_ALL_DIST_TEMPS,
    GET_TOTAL_TEMPS_PARCOURUS,
    WEEK_VALUES,
    GET_TOTAL_CALORIES,
    LOADING,
    GET_DISTANCE_USER_BY_DATE,
    GET_TOTAL_DISTANCE,
    LEVEL_INFO,
    GET_TEMPS_EN_MINUTES,
    FETCH_GAME_BY_DATE,
    MONTH_CALORIE,
    MONTH_VITESSE,
    MONTH_HEART,
    MONTH_DISTANCE,
    BEST_SCORE_VITESSE,
    BEST_SCORE_DISTANCE,
    ALL_GOAL,
    GET_TOTAL_VITESSE,
    PROGRESS_GOAL,LAST_HEART_RATE,
    BEST_VALUE_ALL, BEST_SCORE_SPEED_ByIdUser, PROGRESS_ALL,
    SET_KM,SET_M
} from "./types";
import axios from 'axios/index';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/users/getGamerInfo')
        .then(res => {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            }
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};


export const getLevelInfoByUser = () => async (dispatch) => {
    dispatch(setProfileLoading());
    await  axios.get('/users/FindLevelByIdUser')
        .then(res =>{

            dispatch({
                type: LEVEL_INFO,
                payload: res.data
            }) ;
            console.log("LEVEL_INFO", res.data)}
        )
        .catch(err =>{

            dispatch({
                type: GET_PROFILE,
                payload: {}
            })}
        );
};

//get month
export const getMonthCalorieByUser = () => async (dispatch) => {
    dispatch(setProfileLoading());
  await  axios.get('/users/ChartMONTHCalorie')
        .then(res =>{

            dispatch({
                    type: MONTH_CALORIE,
                    payload: res.data
                }) ;
                console.log("month action", res.data)}
        )
        .catch(err =>{

                dispatch({
                    type: GET_PROFILE,
                    payload: {}
                })}
        );
};
export const getMonthVitesseByUser = () => async (dispatch) => {
    dispatch(setProfileLoading());

    await  axios.get('/users/ChartMONTHVitesse')
        .then(res =>{


            dispatch({
                type: MONTH_VITESSE,
                payload: res.data
            })}
        )
        .catch(err =>{
            console.log('errr');


            dispatch({
                type: GET_PROFILE,
                payload: {}
            })}
        );
};
export const getMonthDistanceByUser = () => async (dispatch) => {
    dispatch(setProfileLoading());
    await  axios.get('/users/ChartMONTHDistance')
        .then(res =>{

            dispatch({
                type: MONTH_DISTANCE,
                payload: res.data
            }) }
        )
        .catch(err =>{


            dispatch({
                type: GET_PROFILE,
                payload: {}
            })}
        );
};
export const getMonthHeartByUser = () => async (dispatch) => {
    dispatch(setProfileLoading());
    await  axios.get('/users/ChartMONTHHeart')
        .then(res =>{

            dispatch({
                type: MONTH_HEART,
                payload: res.data
            }) ;
        }
        )
        .catch(err =>{
            console.log('errr')


            dispatch({
                type: GET_PROFILE,
                payload: {}
            })}
        );
};

export const calculHeartRate = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/calculHeartRate')
        .then(res =>
            dispatch({
                type: LAST_HEART_RATE,
                payload: res.data
            }))
};

export const getDistanceUserByDate = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/fetchDistanceDate')
        .then(res =>
            dispatch({
                type: GET_DISTANCE_USER_BY_DATE,
                payload: res.data
            }))
};

export const getBestScoreSpeedByIdUser = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/BestScoreSpeedByIdUser')
        .then(res =>
            dispatch({
                type: BEST_SCORE_SPEED_ByIdUser,
                payload: res.data
            }))


};



export const setFormat = (f) => (dispatch) => {
    console.log('fff');

    if (f){
        dispatch({
            type: SET_KM,
        })
        console.log('false bel kmmmmm');

    }
    else

    {

        dispatch({
            type: SET_M,

        })
        console.log('false bel m');
    }

};
export const getGameInfo = () => (dispatch) => {
    console.log("actions");
    dispatch(setProfileLoading());
    axios
        .get("/users/fetchGameByDate")
        .then(res => {
            dispatch({
                type: FETCH_GAME_BY_DATE,
                payload: res.data
            });
            console.log("GET GAME USER BY DATE", res.data)
        })
        .catch(
            // err =>
            // dispatch({
            //   type: FETCH_GAME_BY_DATE,
            //   payload: {}
            // })
        );
};

export const getAllGoals = () => (dispatch) => {
    console.log("getAllGoals");
    dispatch(setProfileLoading());
    axios
        .get("/users/getAllGOAL")
        .then(res => {
            dispatch({
                type: ALL_GOAL,
                payload: res.data
            });
            console.log("ALL_GOAL", res.data)
        })
        .catch(
            // err =>
            // dispatch({
            //   type: FETCH_GAME_BY_DATE,
            //   payload: {}
            // })
        );
};

export const getPourcentageAllGoals = () => (dispatch) => {
    console.log("getPourcentageAllGoals");
    dispatch(setProfileLoading());
    axios
        .get("/users/getPourcentageAllGoals")
        .then(res => {
            dispatch({
                type: PROGRESS_ALL,
                payload: res.data
            });
            console.log("getPourcentageAllGoals", res.data)
        })
        .catch(
            // err =>
            // dispatch({
            //   type: FETCH_GAME_BY_DATE,
            //   payload: {}
            // })
        );
};


export const getWeekByUser = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/ChartWEEK')
        .then(res =>{
            dispatch({
                type: WEEK_VALUES,
                payload: res.data
            }) ;
            console.log("week action", res.data)}
        )
        .catch(
            err =>
                dispatch({
                    type: GET_PROFILE,
                    payload: {}
                })
        );
};

export const getTempsEnMinutes = () => dispatch => {

    dispatch(setProfileLoading());
    axios.get('/users/getAllTempsEnMinutes')
        .then(res => {
                dispatch({
                    type: GET_TEMPS_EN_MINUTES,
                    payload: res.data
                })
            }
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );

};

//get total temps parcourus
export const getTotalTempsParcourus = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/getAllTempsEnMinutes')
        .then(res =>
            dispatch({
                type: GET_TOTAL_TEMPS_PARCOURUS,
                payload: res.data
            }))

};


//get best score distance w calorie
export const SortedUserByIdUser = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/SortedUserByIdUser')
        .then(res =>
            dispatch({
                type: BEST_VALUE_ALL,
                payload: res.data
            }))

};

//progress bar goal
export const getProgressGOAL = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/getProgress')
        .then(res =>
            dispatch({
                type: PROGRESS_GOAL,
                payload: res.data
            }))

};


//get total distances parcourus
export const getTotalDistances = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/CalculTotalDistances')
        .then(res => {
                dispatch({
                    type: GET_TOTAL_DISTANCE,
                    payload: res.data
                })
                console.log(res.data);
            }
        )
};

export const getTotalVitesse = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/CalculTotalVitesse')
        .then(res => {
                dispatch({
                    type: GET_TOTAL_VITESSE,
                    payload: res.data
                })
                console.log(res.data);
            }
        )
};
//get total distances parcourus
export const getTotalCalories = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/users/CalculTotalCalories')
        .then(res => {
                dispatch({
                    type: GET_TOTAL_CALORIES,
                    payload: res.data
                })
                console.log(res.data);
            }
        )
};


//get best score vitesse ALL USER user
export const getBestScoreVitesse = () => (dispatch) => {
    console.log("BestScoreVitesse ");
    dispatch(setProfileLoading());
    axios.get('/users/BestScoreVitesse')
        .then(res => {
                dispatch({
                    type: BEST_SCORE_VITESSE,
                    payload: res.data
                });
                console.log("BEST_SCORE_VITESSE ", res.data);
            }
        )


};

//get best score vitesse ALL USER user
export const getBestScoreDistance = () => (dispatch) => {
    console.log("BestScoreDistance ");
    dispatch(setProfileLoading());
    axios.get('/users/BestScoreDistance')
        .then(res => {
                dispatch({
                    type: BEST_SCORE_DISTANCE,
                    payload: res.data
                });
                console.log("BEST_SCORE_DISTANCE ", res.data);
            }
        )


};

//get liste distance et toal temps en minutes pour la chart
export const getDistancesTemps = () => (dispatch) => {

    dispatch(setProfileLoading());
    axios
        .get("/users/getAllDistancesTemps")
        .then(res => {
            dispatch({
                type: GET_ALL_DIST_TEMPS,
                payload: res.data
            })
            console.log("ALLLL", res.data)
        })
        .catch(err =>
            dispatch({
                type: GET_ALL_DIST_TEMPS,
                payload: {}
            })
        );
};

// Profile loading
export const setProfileLoading = () => {
    return {
        type: LOADING
    };
};