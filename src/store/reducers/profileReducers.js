import {
    GET_TOTAL_CALORIES,
    GET_PROFILE,
    LEVEL_INFO,
    MONTH_CALORIE,
    MONTH_DISTANCE,
    MONTH_HEART,
    MONTH_VITESSE,
    WEEK_VALUES,
    GET_DISTANCE_USER_BY_DATE,
    GET_TOTAL_TEMPS_PARCOURUS,
    GET_ALL_DIST_TEMPS,
    GET_TEMPS_USER_BY_DATE,
    LOADING,
    FETCH_GAME_BY_DATE,
    GET_ALL_DISTANCES,
    GET_TOTAL_DISTANCE,
    GET_TEMPS_EN_MINUTES,
    BEST_SCORE_DISTANCE,
    BEST_SCORE_VITESSE,
    ALL_GOAL, LAST_HEART_RATE,
    GET_TOTAL_VITESSE,
    PROGRESS_GOAL,
    BEST_VALUE_ALL, BEST_SCORE_SPEED_ByIdUser, PROGRESS_ALL, SET_KM,SET_M
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    distances: [],
    temps: [],unit_format:true,
    distTem: [],
    tempsByDate: [],
    distances_temps: [],
    distancesByDate: [],
    loading: false,
    dist_temps: [],
    tempsMinutes: [],
    best_score: [],
    monthVitesse: [],
    monthCalorie: [],
    monthHeart: [],
    monthDistance: [],all_goals: [],progressALL:[],
    week_users: [],last_heartRate:[],
    totalCalories:[],totalVitesse:[],
    totalDistances:[],levelInfo:[],
    best_score_distance:[],best_score_vitesse:[],progressGOAL:[],bestAll:[],best_speed_by_iduser:[]

};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PROFILE:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };
        case LEVEL_INFO:
            return {
                ...state,
                levelInfo: action.payload,
                loading: false
            };
        case BEST_VALUE_ALL:
            return {
                ...state,
                bestAll: action.payload,
                loading: false
            };
        case BEST_SCORE_SPEED_ByIdUser:
            return {
                ...state,
                best_speed_by_iduser: action.payload,
                loading: false
            };
        case GET_TOTAL_CALORIES:
            return {
                ...state,
                totalCalories: action.payload,
                loading: false
            };
        case GET_TOTAL_VITESSE:
            return {
                ...state,
                totalVitesse: action.payload,
                loading: false
            };
        case LAST_HEART_RATE:
            return {
                ...state,
                last_heartRate: action.payload,
                loading: false
            };
        case PROGRESS_GOAL:
            return {
                ...state,
                progressGOAL: action.payload,
                loading: false
            };
        case PROGRESS_ALL:
            return {
                ...state,
                progressALL: action.payload,
                loading: false
            };
        case GET_ALL_DIST_TEMPS:
            return {
                ...state,
                distances_temps: action.payload,
                loading: false
            };
        case BEST_SCORE_DISTANCE:
            return {
                ...state,
                best_score_distance: action.payload,
                loading: false
            };
        case BEST_SCORE_VITESSE:
            return {
                ...state,
                best_score_vitesse: action.payload,
                loading: false
            };
        case GET_TEMPS_EN_MINUTES:
            return {
                ...state,
                tempsMinutes: action.payload,
                loading: false
            };
        case ALL_GOAL:
            return {
                ...state,
                all_goals: action.payload,
                loading: false
            };
        case GET_DISTANCE_USER_BY_DATE:
            console.log(action.payload);
            return {
                ...state,
                distances: action.payload,
                loading: false
            };
        case FETCH_GAME_BY_DATE:
            console.log("GET GAME USER BY DATE", action.payload);
            return {
                ...state,
                dist_temps: action.payload,
                loading: false
            };
        case GET_TOTAL_DISTANCE:
            console.log(action.payload);
            return {
                ...state,
                totalDistances: action.payload,
                loading: false
            };
        case GET_ALL_DISTANCES:
            return {
                ...state,
                distancesByDate: action.payload,
                loading: false
            };
        case GET_TEMPS_USER_BY_DATE:
            console.log(action.payload);
            return {
                ...state,
                tempsByDate: action.payload,
                loading: false
            };
        case GET_TOTAL_TEMPS_PARCOURUS:
            return {
                ...state,
                temps: action.payload,
                loading: false
            };
        case MONTH_CALORIE:
            return {
                ...state,
                monthCalorie: action.payload,
                loading: false
            };
        case MONTH_VITESSE:
            return {
                ...state,
                monthVitesse: action.payload,
                loading: false
            };
        case MONTH_HEART:
            return {
                ...state,
                monthHeart: action.payload,
                loading: false
            };
        case MONTH_DISTANCE:
            return {
                ...state,
                monthDistance: action.payload,
                loading: false
            };
        case WEEK_VALUES:
            console.log("west el week reducer", action.payload);
            return {
                ...state,
                weekUsers: action.payload,
                loading: false
            };
        case SET_KM:
            console.log("kmmmmmmmmmmmmmmmmmmmmmm");
            return {
                ...state,
                unit_format: true,
            };
        case SET_M:
            console.log("mmmmmmmmmmmmmmmmmmmmmm");

            return {
                ...state,
                unit_format: false,
            };
        case LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}