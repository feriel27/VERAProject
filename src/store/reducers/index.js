import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import profileReducer from "./profileReducers";


export default combineReducers({
    auth: authReducer,
    userInfo:authReducer,
    totalDistances: profileReducer,
    distances_temps: profileReducer,
    distances: profileReducer,
    tempsByDate: profileReducer,
    tempsMinutes: profileReducer,
    temps: profileReducer,
    dist_temps: profileReducer,
    errors: errorReducer,last_heartRate:profileReducer,unit_format:profileReducer,
    best_score: profileReducer,
    totalCalories:profileReducer,
    totalVitesse:profileReducer,progressGOAL:profileReducer,bestAll:profileReducer,progressALL:profileReducer,
    levelInfo:profileReducer,
    monthCalorie: profileReducer,monthDistance:profileReducer,monthHeart:profileReducer,monthVitesse:profileReducer,
    weekUsers : profileReducer,all_goals:profileReducer,
    best_score_distance:profileReducer,best_score_vitesse:profileReducer,best_speed_by_iduser:profileReducer
});