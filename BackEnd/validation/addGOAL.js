const Validator = require("validator");
const isEmpty = require("is-empty");
const moment = require('moment');

module.exports = function validateaddGOALInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.calorieGOAL = !isEmpty(data.calorieGOAL) ? data.calorieGOAL : "";
    data.distanceGOAL = !isEmpty(data.distanceGOAL) ? data.distanceGOAL : "";
    data.dateGOAL = !isEmpty(data.dateGOAL) ? data.dateGOAL : "";


    // dateGOAL checks
    // console.log("date saisie",data.dateGOAL);
    // var actualDate = moment();
    // console.log("date actuelle",actualDate);
    // if(data.dateGOAL >= actualDate ){
    //     errors.dateGOAL = "date should be correct";
    // }

    // DistanceGOAL checks
    if (Validator.isEmpty(data.distanceGOAL)) {
        errors.distanceGOAL = "DistanceGOAL field is required";
    }
    // CalorieGOAL checks
    if (Validator.isEmpty(data.calorieGOAL)) {
        errors.calorieGOAL = "calorieGOAL field is required";
    }
    // CalorieGOAL checks
    if (Validator.isEmpty(data.calorieGOAL)) {
        errors.calorieGOAL = "calorieGOAL field is required";
    }else if(Math.sign(data.calorieGOAL)== -1){
        errors.calorieGOAL = "calorieGOAL should be positive";
    }

    // DistanceGOAL checks
    if (Validator.isEmpty(data.distanceGOAL)) {
        errors.distanceGOAL = "distance field is required";
    }else if(Math.sign(data.distanceGOAL)== -1){
        errors.distanceGOAL = "distance should be positive";
    }







    return {
        errors,
        isValid: isEmpty(errors)
    };
};